# Feature Spec — Dark/Light Mode Toggle

## Overview

Dual theme support with a toggle in the header. Light mode is default. Theme preference persists in localStorage and respects system preference on first visit.

## Theme Tokens

### Light Mode (Default)

```css
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --bg-tertiary: #F0F4F8;
  --text-primary: #1A1A2E;
  --text-secondary: #4A4A68;
  --text-muted: #6B7280;
  --accent-primary: #4F46E5;
  --accent-secondary: #7C3AED;
  --accent-warm: #F59E0B;
  --border: #E5E7EB;
  --shadow: rgba(0, 0, 0, 0.1);
}
```

### Dark Mode

```css
[data-theme="dark"] {
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-tertiary: #334155;
  --text-primary: #F1F5F9;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --accent-primary: #818CF8;
  --accent-secondary: #A78BFA;
  --accent-warm: #FBBF24;
  --border: #334155;
  --shadow: rgba(0, 0, 0, 0.3);
}
```

## Toggle Component

### Design

```
Light mode:  ☀️ [====●]  (sun icon, toggle off)
Dark mode:   [●====]  🌙  (moon icon, toggle on)
```

**Toggle Design:**
- Pill-shaped switch (48px x 24px)
- Sun icon (left) + Moon icon (right)
- Toggle knob slides between positions
- Smooth CSS transition (300ms)
- Accessible: keyboard focusable, aria-checked

### Location

- Desktop: Right side of header, next to search icon
- Mobile: Right side of header, next to search icon
- Always visible, never hidden in menus

## Theme Detection Logic

```typescript
function getInitialTheme(): 'light' | 'dark' {
  // 1. Check localStorage first
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }

  // 2. Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  // 3. Default to light
  return 'light';
}
```

## Theme Hook

```typescript
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return { theme, toggleTheme };
}
```

## MUI Theme Configuration

```typescript
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4F46E5' },
    secondary: { main: '#7C3AED' },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#4A4A68',
    },
  },
  typography: {
    fontFamily: 'Nunito, Inter, system-ui, sans-serif',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#818CF8' },
    secondary: { main: '#A78BFA' },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
    },
  },
  typography: {
    fontFamily: 'Nunito, Inter, system-ui, sans-serif',
  },
});
```

## Transition Behavior

- Theme change is instant (no page reload)
- CSS transitions on background-color and color (300ms)
- No layout shift during theme change
- iframe content is NOT themed (Google Drive controls its own theme)

## Accessibility

- Toggle has aria-label="Switch to dark mode" / "Switch to light mode"
- aria-checked reflects current state
- Keyboard accessible (Tab to focus, Enter/Space to toggle)
- Respects `prefers-reduced-motion` (disable transition animation)
- Color contrast meets WCAG AA in both themes

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| `ThemeToggle` | Reusable | `components/ThemeToggle/ThemeToggle.tsx` |
| `useTheme` | Hook | `hooks/useTheme.ts` |
| `theme.ts` | Config | `config/theme.ts` |

## Performance

- Theme is applied via CSS custom properties (no JS re-render)
- localStorage read happens once on mount
- No flash of wrong theme (inline script in HTML head sets theme before React loads)
- CSS transitions are GPU-accelerated

## Anti-Flash Script

Add to `index.html` `<head>` before React loads:

```html
<script>
  (function() {
    var theme = localStorage.getItem('theme');
    if (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  })();
</script>
```
