# Code Standards — Sajhi Shiksha

## General Principles

1. **Suspense-first** — all route components are lazy-loaded with `<SuspenseLoader>` boundaries
2. **Feature-based organization** — domain logic in `features/`, reusable primitives in `components/`
3. **TypeScript strict** — no `any`, explicit return types, `import type` always
4. **Mobile-first** — all styles start with mobile breakpoint, scale up
5. **Performance-conscious** — memoize expensive operations, lazy-load heavy components
6. **No early returns for loading** — rely on Suspense boundaries only
7. **Keep it simple** — no over-engineering, no unnecessary abstractions

## TypeScript Rules

| Rule | Enforcement |
|------|-------------|
| Strict mode | Enabled in tsconfig |
| No implicit `any` | Error |
| Explicit return types | Required on all functions |
| `import type` | Always for type-only imports |
| Props interfaces | `React.FC<Props>` pattern with JSDoc |
| Utility types | Use `Partial`, `Pick`, `Omit`, `Record` as needed |
| Type assertions | Avoid; use type guards instead |
| Null handling | Optional chaining `?.`, nullish coalescing `??` |

## Framework Conventions

### React
- `React.FC<Props>` for all components
- Destructure props in function parameters
- Default export at bottom of file
- Named export + default export pattern

### Component Structure Order
1. Imports (React → third-party → aliases → relative → types)
2. Props interface (with JSDoc)
3. Styles (if inline, <100 lines)
4. Component definition
5. Hooks (context → data → state → memo → effects)
6. Handlers (useCallback)
7. Render
8. Default export

### TanStack Router
- File-based routing under `routes/`
- Lazy load all route components
- Breadcrumb metadata via `loader`
- Search params via `validateSearch`

```typescript
export const Route = createFileRoute('/my-route/')({
    component: MyPage,
    loader: () => ({ crumb: 'My Route' }),
});
```

## Styling Rules

### MUI sx Prop (Primary)
- Inline styles for <100 lines
- Separate `.styles.ts` file for >100 lines
- Type-safe with `SxProps<Theme>`
- Theme access: `(theme) => theme.palette.primary.main`

### TailwindCSS (Layout)
- Use for page-level layouts, spacing, responsive utilities
- Do NOT mix Tailwind with MUI sx on the same element
- Prefer MUI sx for component-level styling

### Grid (MUI v7)
```tsx
<Grid size={{ xs: 12, md: 6 }} /> // ✅
<Grid xs={12} md={6} />          // ❌
```

### Responsive Breakpoints
```
xs: 0px      (mobile)
sm: 600px    (large mobile)
md: 900px    (tablet)
lg: 1200px   (desktop)
xl: 1536px   (large desktop)
```

### Code Style
- Indentation: 4 spaces
- Quotes: single quotes
- Trailing commas: always
- Semicolons: always

## API Routes

**No API routes.** This is a static frontend application.

- All data comes from JSON files in `src/data/`
- Google Drive iframes are external embeds
- No `/api/` prefix needed

## Data and Storage

### Content Data
- JSON files in `src/data/`
- Typed with TypeScript interfaces
- Loaded at build time (no runtime fetch)

### State Management
- **Server state:** TanStack Query (for any future API integration)
- **UI state:** `useState`, `useReducer`
- **Global UI state:** `useState` + Context (theme, mobile menu open/close)
- **No Zustand** — too heavy for this use case

### LocalStorage
- Theme preference (light/dark)
- Last visited category (optional, for UX)

## File Organization

### Directory Structure
```
src/
├── features/              # Domain-specific features
│   ├── home/
│   ├── resources/
│   ├── search/
│   ├── viewer/
│   ├── contribute/
│   └── about/
├── components/            # Reusable components
│   ├── SuspenseLoader/
│   ├── ResourceCard/
│   ├── CategoryCard/
│   ├── SearchBar/
│   ├── IframeViewer/
│   ├── ThemeToggle/
│   ├── Header/
│   ├── Footer/
│   ├── BottomNav/
│   └── MegaMenu/
├── routes/                # TanStack Router routes
│   ├── __root.tsx
│   ├── index.tsx
│   ├── resources/
│   ├── viewer/
│   ├── contribute/
│   └── about/
├── data/                  # Static JSON content
│   ├── resources.json
│   ├── categories.json
│   ├── navigation.json
│   ├── contributors.json
│   └── site-config.json
├── hooks/                 # Shared hooks
│   ├── useTheme.ts
│   ├── useMediaQuery.ts
│   └── useDebounce.ts
├── lib/                   # Shared utilities
│   ├── utils.ts
│   └── constants.ts
├── types/                 # Shared TypeScript types
│   ├── resource.ts
│   ├── category.ts
│   └── navigation.ts
├── config/                # Configuration
│   └── theme.ts
├── assets/                # Static assets
│   ├── images/
│   └── icons/
└── App.tsx
```

### Import Aliases
| Alias | Path |
|-------|------|
| `@/` | `src/` |
| `~types` | `src/types` |
| `~components` | `src/components` |
| `~features` | `src/features` |

### File Naming
- Components: `PascalCase.tsx` (e.g., `ResourceCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useTheme.ts`)
- API/Services: `camelCase.ts` (e.g., `resourceApi.ts`)
- Helpers: `camelCase.ts` (e.g., `resourceHelpers.ts`)
- Types: `index.ts` or descriptive name in `types/`

## Anti-Patterns (Forbidden)

- Early loading returns (use Suspense)
- Feature logic in `components/`
- Inline API calls in components
- Untyped responses
- Multiple responsibilities in one component
- Prop drilling 3+ levels (use Context)
- `any` type usage
- `makeStyles` or `styled()` (use `sx` prop)
- Hardcoded URLs (use config)
- Feature logic coupled across features
