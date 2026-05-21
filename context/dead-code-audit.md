# Dead Code Audit — Sajhi Shiksha

> **Generated:** 2026-05-21
> **Method:** Static analysis + import graph traversal + pyscribe-code call graph

---

## SAFE TO DELETE (No Importers Found)

### Files

| File | Lines | Reason |
|---|---|---|
| `src/App.css` | 184 | Vite template default styles, never imported by any file |
| `src/components/SearchBar/SearchModal.tsx` | 140 | Full-screen search modal, never imported (SearchInput is used instead) |
| `src/assets/vite.svg` | — | Vite logo, never imported |
| `src/assets/react.svg` | — | React logo, never imported |
| `src/assets/hero.png` | — | Hero image, never imported |

### Functions & Utilities

| Symbol | File | Lines | Reason |
|---|---|---|---|
| `cn()` | `lib/utils.ts:1` | ~8 | Class name joiner, never imported |
| `debounce()` | `lib/utils.ts:35` | ~12 | Generic debounce, never imported |
| `useSnackbar` (hook) | `components/Snackbar/Snackbar.tsx:68` | ~10 | Context hook exported but never called anywhere |

### Constants

| Symbol | File | Reason |
|---|---|---|
| `RESOURCE_TYPES` | `lib/constants.ts:18` | Array of resource type strings, never imported |
| `MAX_CONTENT_WIDTH` | `lib/constants.ts:20` | `'1200px'` constant, hardcoded as strings everywhere |
| `MOBILE_BREAKPOINT` | `lib/constants.ts:22` | `768` constant, never imported |
| `TABLET_BREAKPOINT` | `lib/constants.ts:23` | `1024` constant, never imported |

### Type Interfaces

| Symbol | File | Reason |
|---|---|---|
| `HomePageData` | `types/index.ts:47` | Never imported or used |
| `ClassTab` | `types/index.ts:24` | Never imported or used |
| `SubjectInfo` | `types/index.ts:29` | Never imported or used |
| `ClassFilter` | `types/index.ts:35` | Never imported or used |
| `QuickLink` | `types/index.ts:40` | Never imported (QuickLinks component defines its own `QuickLinkItem`) |

### Dependencies

| Package | Version | Reason |
|---|---|---|
| `@tanstack/react-query` | ^5.100.11 | Installed but never imported anywhere in the codebase |

---

## DEAD STATE (Set But Never Read)

| Symbol | File | Line | Details |
|---|---|---|---|
| `_searchQuery` | `features/home/HomePage.tsx:18` | State variable set but never read. Only `setSearchQuery` is used (passed to `handleSearch`). The `_` prefix acknowledges it is unused. |
| `activeFilter` | `features/home/HomePage.tsx:19` | State is set but filtering logic uses a local variable. Filter is never changed by any UI in HomePage itself (HeroSection manages its own filter state). |
| `handleSearch` | `features/home/HomePage.tsx:21-23` | Callback passed to HeroSection but the state it updates is never used to affect page behavior. |
| `handleFilter` | `features/home/HomePage.tsx:25-27` | Callback passed to HeroSection but the state it updates is never used to affect page behavior. |

---

## DATA BUGS (Incorrect Values)

| Issue | File | Current Value | Expected Value |
|---|---|---|---|
| Wrong route: programs | `data/categories.json:24` | `/programs` | `/resources/programs` |
| Wrong route: formats | `data/categories.json:36` | `/formats` | `/resources/formats` |
| Wrong route: admissions | `data/categories.json:48` | `/admissions` | `/resources/admissions` |
| Wrong route: programs | `data/navigation.json` | `/programs` | `/resources/programs` |
| Wrong route: formats | `data/navigation.json` | `/formats` | `/resources/formats` |
| Wrong route: admissions | `data/navigation.json` | `/admissions` | `/resources/admissions` |
| All resourceCount = 0 | `data/categories.json` | All values are `0` | Should be computed from `resources.json` |

---

## CLEANUP COMMANDS

### Delete files
```bash
rm frontend/src/App.css
rm frontend/src/components/SearchBar/SearchModal.tsx
rm frontend/src/assets/vite.svg
rm frontend/src/assets/react.svg
rm frontend/src/assets/hero.png
```

### Remove from package.json
```bash
cd frontend
npm uninstall @tanstack/react-query
```

### After cleanup, verify
```bash
cd frontend
npm run build
npm run lint
```
