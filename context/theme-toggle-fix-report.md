# Theme Toggle Bug — Root Cause Analysis & Fix Report

> **Date:** 2026-05-21
> **Severity:** Critical — core UX broken
> **Status:** FIXED

---

## Problem Statement

1. Theme toggle (light ↔ dark) did not persist across page navigation
2. Text rendered incorrectly after theme switch (wrong colors, unreadable)
3. Only some sections changed theme — others stayed in original mode
4. Theme changes were not consistent across components

---

## Root Cause Analysis

### The Architecture Problem

`useTheme()` was implemented as a **standalone hook** using `useState`:

```typescript
// OLD: hooks/useTheme.ts
export function useTheme(): [boolean, () => void] {
    const [isDark, setIsDark] = useState<boolean>(() => { ... });
    // ...
    return [isDark, toggle];
}
```

**Every component that called `useTheme()` got its own independent state instance.**

### The Call Chain

```
App.tsx
  └── useTheme() → [isDark_A, toggle_A]  ← only isDark used, toggle discarded
      └── ThemeProvider(theme=createAppTheme(isDark_A))
          └── RouterProvider
              └── Header.tsx
                  └── useTheme() → [isDark_B, toggle_B]  ← DIFFERENT state!
                      └── toggleTheme() → updates isDark_B only
```

When the user clicked the theme toggle in `Header.tsx`:
1. `Header` called `toggleTheme()` → updated `isDark_B` (Header's local state)
2. `Header` re-rendered with new theme
3. `App.tsx` **never re-rendered** — its `isDark_A` was unchanged
4. MUI `ThemeProvider` kept the old theme — all MUI components stayed in original mode
5. Components using CSS variables (`var(--color-bg)`) updated via `data-theme` attribute
6. Components using MUI theme colors (`theme.palette.background.paper`) did NOT update

### The Naming Collision

`FilterBar.tsx` imported `useTheme` from **@mui/material**, not our hook:
```typescript
import { useTheme } from '@mui/material';  // MUI's useTheme, returns Theme object
```

This worked for `useMediaQuery(theme.breakpoints.down('md'))` but created confusion about which `useTheme` was which.

---

## The Fix

### 1. Created Centralized `ThemeContext`

```typescript
// context/ThemeContext.tsx
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(getInitialTheme);
    const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);
    const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}
```

### 2. Updated `App.tsx` to Use Context

```typescript
const AppContent: React.FC = () => {
    const { isDark } = useTheme();  // Now from context — shared state
    const theme = createAppTheme(isDark ? 'dark' : 'light');
    return <MuiThemeProvider theme={theme}>...</MuiThemeProvider>;
};

const App: React.FC = () => (
    <ThemeProvider>  {/* Single source of truth */}
        <AppContent />
    </ThemeProvider>
);
```

### 3. Fixed Naming Collision in `FilterBar.tsx`

```typescript
import { useTheme as useMuiTheme } from '@mui/material';
const theme = useMuiTheme();  // MUI theme object for breakpoints
```

### 4. Updated `BottomTabBar.tsx`

Now consumes `useTheme()` from context and uses CSS variables for consistent theming.

---

## Why This Fix is Permanent

| Principle | Implementation |
|---|---|
| **Single Source of Truth** | `ThemeContext` is the only place `isDark` state lives |
| **Context Propagation** | All components read from the same context — one toggle updates everything |
| **Guard Clause** | `useTheme()` throws if used outside `ThemeProvider` — catches misuse at runtime |
| **Memoized Value** | `useMemo` prevents unnecessary re-renders when theme hasn't changed |
| **Dual Sync** | Both `data-theme` attribute (CSS variables) AND MUI theme update on every toggle |
| **Import Safety** | MUI's `useTheme` is aliased as `useMuiTheme` to prevent future collisions |

---

## Components Affected

| Component | Before | After |
|---|---|---|
| `App.tsx` | Discarded toggle, isolated state | Wraps ThemeProvider, reacts to context |
| `Header.tsx` | Isolated state, toggle only affected itself | Shared context, toggle updates all |
| `Footer.tsx` | `useTheme()[0]` — isolated | Shared context |
| `HeroSection.tsx` | Isolated state | Shared context |
| `CategoryCard.tsx` | Isolated state | Shared context |
| `ClassSpotlight.tsx` | Isolated state | Shared context |
| `SecondaryClassSpotlight.tsx` | Isolated state | Shared context |
| `QuickLinks.tsx` | Isolated state | Shared context |
| `ContributeCTA.tsx` | Isolated state | Shared context |
| `FilterBar.tsx` | MUI useTheme (naming collision) | Aliased to useMuiTheme |
| `BottomTabBar.tsx` | No theme awareness | Consumes context, neo-brutalist styling |

---

## Build Verification

| Check | Status |
|---|---|
| TypeScript | PASS |
| Vite Build | PASS |
| Bundle Size | 804KB JS (247.85KB gzipped) |

---

## Lessons for Future AI Agents

1. **Never create standalone state hooks for global values** — use React Context
2. **Always alias conflicting imports** — `import { useTheme as useMuiTheme }` 
3. **Test theme toggle as part of every component change** — it's the most common regression
4. **CSS variables + MUI theme must both update** — some components use one, some use the other
5. **The `ThemeProvider` must be above everything that needs theme access** — including the router
