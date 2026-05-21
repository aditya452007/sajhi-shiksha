# IMPLEMENTATION-RULES.md

> **Purpose:** The master rulebook every AI agent must follow when generating, editing, or reviewing code in this project.
> **Philosophy:** This project is for students and teachers in rural/urban India. It must be **fast**, **accessible**, and **bulletproof** on low-end Android devices (3G network, 2GB RAM). No libraries that bloat the bundle. No patterns that confuse the compiler or the user.

---

## 1. The Dev Loop (The Senior Engineer's Way)

### 1.1. Read Before Write
**Rule:** You MUST read the relevant `Feature Spec` AND `CRITICAL-FEATURE-SPEC-AUDIT.md` before writing a single line of code for a feature.
**Why:** Prevents hallucinations and conflicting implementations.
**Process:**
1. Identify the task (e.g., "Implement homepage").
2. Read `context/Feature-spec/01-homepage.md`.
3. Read `context/CRITICAL-FEATURE-SPEC-AUDIT.md` for any flagged issues related to the homepage.
4. Read `context/ui-context.md` for color and typography standards.
5. Read `context/code-standards.md` for specific coding conventions.
6. Then, and only then, write code.

### 1.2. One Feature at a Time
**Rule:** Do not touch multiple features in the same PR or task execution.
**Why:** Isolates bugs, makes rollbacks simple, and keeps code reviews focused.
**Exception:** If two features share a new global component (e.g., a `Button` component), the shared component must be built as a separate, atomic task first.

### 1.3. Self-Review Checklist
Before marking a task as done or moving to the next, the AI must mentally (or explicitly) verify:
* [ ] Does this code match the `Feature Spec` exactly?
* [ ] Did I address any `CRITICAL` or `HIGH` items from the `Audit`?
* [ ] Is the code responsive? (Check `09-responsive.md`)
* [ ] Is the code accessible? (Check `A11Y` standards)
* [ ] Did I introduce any new dependencies? (If yes, ask for permission or justify)
* [ ] Did I create any duplicate logic? (DRY principle)

---

## 2. Coding Doctrine (Non-Negotiables)

### 2.1. Component Architecture
**Pattern:** Functional Components ONLY. No Class Components.
**Why:** Simpler, hooks-friendly, and smaller bundle size.
**MANDATORY STRUCTURE for every component file:**
```typescript
// 1. Imports (React, Libraries, Types)
import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react'; // Or define props inline

// 2. Types / Interfaces
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 3. The Component
const MyComponent: FC<MyComponentProps> = ({ title, onAction }) => {
  // 4. State Hooks
  const [isActive, setIsActive] = useState(false);

  // 5. Derived State / Memoization
  const displayTitle = useMemo(() => title.toUpperCase(), [title]);

  // 6. Event Handlers (Must be stable if passed to children)
  const handleClick = useCallback(() => {
    setIsActive((prev) => !prev);
    onAction();
  }, [onAction]);

  // 7. Side Effects
  useEffect(() => {
    // ... setup logic
    return () => {
      // ... cleanup logic (CRITICAL!)
    };
  }, []);

  // 8. Render
  return (
    <div onClick={handleClick}>
      {displayTitle}
    </div>
  );
};

// 9. Default Export
export default MyComponent;
```

### 2.2. The `useCallback` / `useMemo` Rule
**Rule:** Wrap EVERY function passed as a prop to a child component in `useCallback`. Wrap EVERY expensive computation in `useMemo`.
**Why:** Prevents unnecessary re-renders of child components, which is critical on low-end devices.
**Exception:** Functions defined inside `useEffect` that are not passed to children do NOT need `useCallback`.

### 2.3. The `console.log` Ban
**Rule:** `console.log`, `console.warn`, and `console.error` are FORBIDDEN in production code.
**Why:** Degrades performance on low-end devices and leaks data.
**Enforcement:** Use a dedicated logger utility.
```typescript
// src/utils/logger.ts
const isDev = process.env.NODE_ENV === 'development';
export const logger = {
  log: (...args: any[]) => { if (isDev) console.log(...args); },
  warn: (...args: any[]) => { if (isDev) console.warn(...args); },
  error: (...args: any[]) => { if (isDev) console.error(...args); },
};
// Usage: logger.log("Something happened");
```

### 2.4. Style Rules
**Pattern:** Use `Styled Components` (if specified in architecture) or `Tailwind CSS` (if specified).
**Why:** Consistency. The architecture must choose one and stick to it.
**Rule:** No inline styles (`style={{ color: 'red' }}`) unless absolutely necessary for dynamic values. Even then, prefer `className` with dynamic logic.
**Rule:** All colors MUST come from the theme object (`theme.colors.primary`) or `tailwind.config.js`. NO hardcoded hex colors in components.

### 2.5. Path Aliases (Mandatory)
**Rule:** Use ONLY the defined aliases. NO relative imports (`../../components/Button`) beyond one level.
**Standard Aliases:**
```typescript
import { Button } from '@components/Button'; // src/components/Button
import { useTheme } from '@hooks/useTheme'; // src/hooks/useTheme
import { Resource } from '@types/resource'; // src/types/resource
```
**Enforcement:** Configure `tsconfig.json` or `vite.config.ts` to support these aliases strictly.

---

## 3. File & Folder Standards

### 3.1. File Naming
*   **Components:** `PascalCase.tsx` (e.g., `CategoryCard.tsx`, `HomePage.tsx`)
*   **Hooks:** `camelCase.ts` (e.g., `useTheme.ts`, `useMediaQuery.ts`)
*   **Utilities:** `camelCase.ts` (e.g., `searchAlgorithm.ts`)
*   **Types:** `PascalCase.ts` (e.g., `Resource.ts`, `types.ts`) or `index.ts` in a types folder.
*   **Tests:** `ComponentName.test.tsx` (co-located with the component).

### 3.2. Folder Structure (Enforced)
```
src/
├── features/          # Domain-specific logic & UI
│   ├── home/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts   # Barrel export
│   ├── resources/
│   └── ...
├── components/        # Reusable, pure UI components (NO logic)
│   ├── ui/           # Truly generic (Button, Input, Modal)
│   └── layout/       # Layout pieces (Header, Footer, Sidebar)
├── hooks/             # Global hooks
├── types/             # Global TypeScript types/interfaces
├── utils/             # Helper functions
├── constants/         # App-wide constants (config, colors if static)
├── data/              # Static JSON data (resources.json, contributors.json)
├── config/            # Theme, Router, etc.
└── App.tsx            # Root
```
**Golden Rule:** If a component is used in 3+ features, it MUST go in `src/components/`. If it has domain logic (e.g., "how to format a resource card"), it MUST stay in `src/features/`.

---

## 4. Data & State Rules

### 4.1. The Data Source
**Rule:** `resources.json` is the single source of truth. All filtering, searching, and sorting happens client-side against this JSON.
**Why:** No backend means no API latency, but it means the client bears the data processing cost. We must optimize that processing.

### 4.2. State Management
**Rule:** Use `Zustand` (or React Context + useReducer) for global state. Use `useState` for local UI state ONLY.
**Global State Includes:**
*   Theme (light/dark)
*   Search Query
*   Active Filters
*   User Preferences (if any)
**Local State Includes:**
*   Open/Close state of a dropdown
*   Current tab in a tabbed interface
*   Form input values (if not using a library like Formik/React Hook Form)

### 4.3. The `resources.json` Contract
**Rule:** Treat `resources.json` as an API response. Create a TypeScript interface that matches it *exactly*.
```typescript
// src/types/resource.ts
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  class: number | null; // null for non-class items like rules
  subject: string | null; // null for general items
  type: 'pdf' | 'document' | 'link' | 'format';
  driveUrl: string;
  contributors: string[];
  lastUpdated: string; // ISO 8601 format: YYYY-MM-DD
}
```
**Enforcement:** The JSON file in `src/data/resources.json` MUST be validated against this interface at build time or via a pre-commit hook.

---

## 5. Performance Budget

**Hard Limits:**
*   **Initial JS Bundle:** < 150KB (gzipped).
*   **Image Size:** No images > 200KB. Use SVGs for icons.
*   **Re-renders:** Profile with React DevTools. Fix any component re-rendering more than 3 times for the same state change without reason.
*   **Animation Frame Rate:** Target 60fps. NO JavaScript-based animations that run on the main thread (use CSS transforms or `requestAnimationFrame` correctly).

---

## 6. Accessibility (A11Y) Commandments

*   **A. Keyboard Nav:** Every interactive element must be reachable via Tab, Enter, and Escape.
*   **B. Focus Management:** When a modal/drawer opens, focus TRAPS inside it. When it closes, focus RETURNS to the triggering element.
*   **C. ARIA Roles:** Use semantic HTML (`<button>`, `<nav>`) first. Only use `role` attributes if semantic HTML is impossible.
*   **D. Color Contrast:** All text must have a contrast ratio of at least 4.5:1 against its background. Use a tool to verify.
*   **E. Screen Reader Text:** Use `sr-only` class for text meant only for screen readers (e.g., "Skip to main content").
*   **F. Motion:** Respect `prefers-reduced-motion`. If a user has this enabled, disable ALL animations and transitions instantly.

---

## 7. Error Handling Doctrine
(See `ERROR-HANDLING.md` for full details)
**Summary:**
*   **Render Errors:** Use Error Boundaries (`componentDidCatch`) at the route level.
*   **Data Errors:** If `resources.json` fails to load or is malformed, show a user-friendly "Oops, something went wrong" fallback UI. Do NOT show a blank screen or a stack trace.
*   **Iframe Errors:** If a Google Drive link is broken, show a retry button and a "Download directly" link.
*   **UI Errors:** If a component crashes, the error boundary should catch it and log it (via the `logger` utility), but the rest of the page must remain functional.

---

**Last Updated:** 2026-05-20
**Next Review:** On every major feature addition.
