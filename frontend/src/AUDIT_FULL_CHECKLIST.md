# Frontend UI/UX Professional Standards Audit - Sajhi Shiksha

> **Audit Date:** 2026-05-21
> **Scope:** `frontend/src/` codebase
> **Standards Reference:** `frontend-dev-guidelines` SKILL & UI/UX Pro Max
> **Criticality Legend:** 🔴 Critical | 🟡 High | 🟢 Medium | 🔵 Low

---

## PART 1: CRITICAL FAILURES (Immediate Action Required)

### 1.1 🔴 Error Handling & App Stability

| # | Issue | File | Line | Description | Risk |
|---|-------|------|------|-------------|------|
| 1 | **No Error Boundary at Root** | `main.tsx` | 9-13 | `App` is rendered without any `<ErrorBoundary>` wrapper. A single runtime error crashes the entire application. | **CRASH** |
| 2 | **No Global Error Boundary** | All routes | -- | Route-level errors are not caught. `Suspense` catches async errors but not React rendering errors. | **CRASH** |
| 3 | **Incomplete SEO Cleanup** | `useSEO.ts` | 73-76 | Only `jsonLdEl` is cleaned up on unmount. Title, meta tags, canonical link, and OpenGraph tags are NOT reset, leaking between pages. | **SEO Leak** |
| 4 | **Analytics Script Injection** | `useAnalytics.ts` | 13-27 | Multiple `useEffect` hooks append `<script>` tags without cleanup, deduplication, or error handling. Duplicate scripts on re-renders. | **Perf/Mem** |
| 5 | **Missing Dependency Array** | `useAnalytics.ts` | 29-35 | Second `useEffect` runs on EVERY render (no dependency array), causing excessive GA `config` calls. | **Perf** |
| 6 | **No Input Validation** | `lib/utils.ts` | 1-10 | `getDriveEmbedUrl()` accepts empty/null strings without validation. Returns invalid URLs silently. | **Bug** |

### 1.2 🔴 Anti-Patterns & Broken Patterns

| # | Issue | File | Line | Description | Standard Violation |
|---|-------|------|------|-------------|-------------------|
| 7 | **`as never` Type Bypass** | `SecondaryClassSpotlight.tsx` | ~37 | Uses `r.class as never` to suppress TypeScript errors. Completely defeats type safety. | TS Strict |
| 8 | **Hardcoded JSON-LD in Routes** | `routes/index.tsx` | 13-16 | `websiteSchema`, `organizationSchema` hardcoded inline. Should be in config. | Maintainability |
| 9 | **Prop Drilling** | `__root.tsx` | 18-20 | `handleNavigate` passed to Header, Footer -- should use context or router directly. | Architecture |
| 10 | **No Lazy Loading** | `routes/index.tsx` | 4 | `HomePage` imported directly instead of `React.lazy()`. Violates "Lazy Load Anything Heavy". | Performance |

### 1.3 🔴 Accessibility Failures (WCAG Violations)

| # | Issue | File | Line | Severity | WCAG |
|---|-------|------|------|----------|------|
| 11 | **Non-Semantic Buttons** | `Footer.tsx` | 38 | Links rendered as `<Typography component="button">` without `aria-label` or `role="button"`. Screen readers cannot identify them as interactive. | **WCAG 2.1** |
| 12 | **Missing `aria-label`** | `SearchInput.tsx` | 40-75 | Search input relies on `placeholder` only. `aria-label` or `aria-labelledby` is absent. | **WCAG 2.1** |
| 13 | **Missing `aria-label`** | `FilterBar.tsx` | ~307 | `IconButton` for clearing filter lacks `aria-label`. | **WCAG 2.1** |
| 14 | **`ListItem` as Clickable** | `QuickLinks.tsx` | 80+ | `ListItem` with `onClick` is not interactive. Missing `role="button"`, `tabIndex`, keyboard handler. | **WCAG 2.1** |
| 15 | **Decorative Icon Not Hidden** | `QuickLinks.tsx` | ~116 | `ChevronRightIcon` lacks `aria-hidden="true"` | **WCAG 2.1** |
| 16 | **Missing Landmark Labels** | `HomePage.tsx` | 42 | `<Box component="main">` lacks `aria-label` for `<main>` landmark. | **WCAG 2.1** |
| 17 | **Mobile Link List** | `BottomTabBar.tsx` | -- | No `aria-current="page"` or active page announcement for screen readers. | **WCAG 2.1** |
| 18 | **Devtools Not Hidden** | `__root.tsx` | 37 | `<TanStackRouterDevtools />` missing `aria-hidden="true"` and should be excluded from production builds. | **WCAG 2.1** |

---

## PART 2: HIGH-PRIORITY ISSUES

### 2.1 🟡 Performance Issues

| # | Issue | File(s) | Description | Impact |
|---|-------|---------|-------------|--------|
| 19 | **Missing `React.memo`** | `HomePage.tsx`, `HeroSection.tsx`, `QuickLinks.tsx`, `SecondaryClassSpotlight.tsx`, `CategoryGrid.tsx`, `ContributeCTA.tsx`, `BottomTabBar.tsx` | Components not memoized -- re-render on every parent update even if props unchanged. | Re-renders |
| 20 | **Missing `useCallback`** | `HeroSection.tsx`, `ClassSpotlight.tsx`, `SecondaryClassSpotlight.tsx`, `ResourceCard.tsx`, `FilterBar.tsx`, `SearchInput.tsx` | Event handlers recreated on every render. Breaks `React.memo` optimization and causes child re-renders. | Re-renders |
| 21 | **Missing `useMemo`** | `HeroSection.tsx` (chipColors), `ClassSpotlight.tsx` (subjectColors), `HomePage.tsx` (filteredCategories) | Static arrays/objects recreated on every render. | Re-renders |
| 22 | **Inline JSX in Render** | `FilterBar.tsx` (lines 74-222), `Footer.tsx` (lines 17-76) | `filterContent` is inline JSX expression instead of separate component. Re-renders unnecessarily. | Re-renders |
| 23 | **No Scroll Restoration** | `router.ts` | Missing `scrollRestoration` configuration. User scroll position lost on route navigation. | UX |
| 24 | **No Preloading Strategy** | `router.ts` | `defaultPreload: 'intent'` is good, but no `defaultPreloadStaleTime` or granular preload per route. | UX/Perf |
| 25 | **Eager Loading of Doodles** | All pages | `BookDoodle`, `SquiggleDoodle`, etc. are imported eagerly. They are SVG graphics that should be lazy-loaded. | Bundle Size |

### 2.2 🟡 Hardcoded Values (Maintainability Debt)

| # | Value | File(s) | Line | Should Be |
|---|-------|---------|------|------------|
| 26 | `'#1A1A1A'` | `theme.ts`, `QuickLinks.tsx`, `CategoryCard.tsx`, `ResourceCard.tsx` | Multiple | `theme.palette.text.primary` or CSS variable |
| 27 | `"Space Grotesk, sans-serif"` | `Footer.tsx`, `Header.tsx`, `CategoryCard.tsx`, `FilterBar.tsx` | Multiple | `theme.typography.fontFamily` via MUI |
| 28 | `"Space Mono, monospace"` | `Footer.tsx`, `Header.tsx`, `FilterBar.tsx` | Multiple | `theme.typography.fontFamily` |
| 29 | `maxWidth: '1200px'` | `Header.tsx`, `Footer.tsx`, `FilterBar.tsx` | Multiple | `theme.breakpoints.values.lg` or constant |
| 30 | `borderRadius: '9999px'` | `theme.ts`, `HeroSection.tsx`, `ClassSpotlight.tsx` | Multiple | `theme.shape.borderRadius` (or custom theme constant) |
| 31 | `fontSize: { xs: '1.25rem', md: '1.5rem' }` | `Header.tsx` | 162 | `theme.typography.h1.fontSize` pattern |
| 32 | `py: { xs: 4, md: 6 }` | `Footer.tsx`, `QuickLinks.tsx` | Multiple | Should use theme spacing: `theme.spacing(4)` |
| 33 | `fontSize: 36` (icon) | `CategoryCard.tsx` | 112 | `theme.typography.fontSize` or CSS relative unit |
| 34 | `padding: '10px 24px'` | `theme.ts` | 56 | `theme.spacing(1.25, 3)` |
| 35 | `content: '""'` pseudo | `Footer.tsx` | 55 | Should reference a constant or theme |
| 36 | Marketing Copy | `HeroSection.tsx` | ~143 | Hardcoded string: "Free study materials, question papers, and resources for KVS students. No login needed." | config |
| 37 | NGO Tagline | `Footer.tsx` | 198 | Hardcoded: "Made with hearts by students, for students" | `siteConfig.tagline` |
| 38 | OG Image Dimensions | `useSEO.ts` | 51-52 | Hardcoded `1200` x `630` | Constant |
| 39 | Breakpoint Magic Strings | Multiple | -- | `'sm'`, `'md'`, `'lg'` scattered throughout | Use `theme.breakpoints` object |

### 2.3 🟡 Data Management & API Layer

| # | Issue | File | Line | Description |
|---|-------|------|------|-------------|
| 40 | **No Suspense Query** | All features | -- | Data fetching uses direct imports (e.g., `import categories from '@/data/categories.json'`). No `useSuspenseQuery` used anywhere. | **Critical** |
| 41 | **No API Layer Isolation** | Global | -- | Per the guidelines: "API layer isolated in `api/`". No `features/*/api/` directories exist. | Architecture |
| 42 | **JSON Data Eager Import** | Multiple | -- | `.json` files imported directly instead of fetched or loaded lazily. Blocks initial render. | Performance |
| 43 | **No Data Fetching Library** | Global | -- | `react-query` or `@tanstack/react-query` is imported but not used. All data is static JSON imports. | Architecture |
| 44 | **No Type Guards on JSON** | `HomePage.tsx` | 11 | `categories.json` parsed without validation (e.g., Zod). Runtime errors possible if JSON changes. | Safety |

### 2.4 🟡 Component Architecture Issues

| # | Issue | File | Description |
|---|-------|------|-------------|
| 45 | **Single File Too Large** | `ResourceCard.tsx` (331 lines) | List and Grid views in one file. Violates Single Responsibility. Should be `ResourceCardList` and `ResourceCardGrid` |
| 46 | **Code Duplication** | `ResourceCard.tsx` | Tag rendering logic (lines 104-139 vs 227-246) is duplicated with minor style differences. Should be `<ResourceTags />`. |
| 47 | **Code Duplication** | `FilterBar.tsx` | Active chips rendering duplicated between mobile/desktop. Should be single `<FilterChips />`. |
| 48 | **Missing Component Separation** | `Footer.tsx` | `linkSection` is a function that returns JSX. Should be a proper sub-component with its own file. |
| 49 | **Missing Component Separation** | `FilterBar.tsx` | `filterContent` is inline. Should be `<FilterBarContent />` in its own file. |

---

## PART 3: UI/UX & FEATURE GAPS

### 3.1 🔴 Missing Features (Professional Standard)

| # | Missing Feature | Impact | Where to Add |
|---|-----------------|--------|-------------|
| 50 | **404 Not Found Page** | 🔴 | `routes/404.tsx` or `routes/$.tsx`. Currently broken links show empty screen. |
| 51 | **Loading Skeletons** | 🟡 | `components/Skeleton/`. Only `SuspenseLoader` exists (spinner). Skeleton cards needed for lists/grids. |
| 52 | **Empty States** | 🟡 | All list pages. When no resources match, show empty state illustration + CTA. |
| 53 | **Pagination / Virtualization** | 🟡 | Resource lists. Currently all items render at once (performance risk at scale). |
| 54 | **Breadcrumb Navigation** | 🟢 | All pages. Increases navigability and SEO. |
| 55 | **Page Titles** | 🟡 | Routes. Only `index` route has `useSEO`. Other routes use default/unset titles. |
| 56 | **Robots.txt / Sitemap** | 🟢 | Static files for SEO crawlers. |
| 57 | **Service Worker / PWA** | 🟢 | `main.tsx`. No `navigator.serviceWorker.register()`. |
| 58 | **`noscript` Fallback** | 🟢 | `index.html`. No fallback for users with JS disabled. |
| 59 | **Right-to-Left (RTL) Support** | 🔵 | MUI `rtl` plugin not configured for Hindi/Arabic languages. |
| 60 | **Keyboard Navigation** | 🟡 | Focus trapping in mobile drawer, skip links. Missing. |
| 61 | **Focus Visible Styles** | 🟡 | No custom `focus-visible` outline styles for keyboard users. |
| 62 | **Reduced Motion** | 🟡 | `prefers-reduced-motion` not respected in `framer-motion` animations (`PageTransition`, `ScrollReveal`). |
| 63 | **Print Styles** | 🔵 | `@media print` not implemented. Users can't print resources. |
| 64 | **Cookie Consent Banner** | 🟡 | Required for GDPR compliance with Google Analytics. |
| 65 | **No Analytics Events** | 🟡 | `useAnalytics` only tracks page views. No event tracking (click, download, share). |
| 66 | **No Offline Fallback** | 🟡 | No offline detection or "You're offline" indicator. |

### 3.2 🔵 Good-to-Have Features

| # | Feature | Benefit | Priority |
|---|---------|---------|----------|
| 67 | **Image Lazy Loading** | Improves initial load time. Currently all images render immediately. | Medium |
| 68 | **Font Preloading** | Prevents FOUT (Flash of Unstyled Text) for `Space Grotesk` and `Space Mono`. | Low |
| 69 | **Scroll Progress Indicator** | UX enhancement for long resource pages. | Low |
| 70 | **Back to Top Button** | Improves navigation on long lists. | Low |
| 71 | **Search History / Suggestions** | Better UX for returning users. | Medium |
| 72 | **Resource Bookmarking** | User engagement feature. | Low |
| 73 | **Dark/Light Toggle Persistence** | Already exists (`ThemeContext`), but no SSR consideration. | -- |

### 3.3 🔵 Missing ARIA & Screen Reader Support

| # | Issue | File(s) | Description |
|---|-------|---------|-------------|
| 74 | **No Skip Link** | `__root.tsx` | Screen reader users cannot skip navigation to main content. |
| 75 | **No Live Region** | Global | `aria-live="polite"` not used for dynamic updates (filter results, search). |
| 76 | **MUI Theme Access** | Multiple | `sx` prop uses magic color strings instead of `theme => theme.palette.primary.main` callback. |

---

## PART 4: CODE ORGANIZATION & ARCHITECTURE

### 4.1 🟡 Feature-Based Structure Violations

Per the guidelines: `features/{feature}/` should have `api/`, `components/`, `hooks/`, `helpers/`, `types/`, `index.ts`.

| Feature | Has `api/`? | Has `hooks/`? | Has `helpers/`? | Has `types/`? | Has `index.ts`? |
|---------|------------|---------------|-----------------|---------------|-----------------|
| `features/home` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `features/resources` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `features/viewer` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `features/search` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `features/about` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `features/contribute` | ❌ | ❌ | ❌ | ❌ | ❌ |

### 4.2 🟡 Import Aliases Inconsistency

| # | Issue | Description |
|---|-------|-------------|
| 77 | **Missing `~types` alias** | Types imported via `@/types` instead of `~types` |
| 78 | **Missing `~components` alias** | Components imported via `@/components` instead of `~components` |
| 79 | **Missing `~features` alias** | Features imported via `@/features` instead of `~features` |

### 4.3 🟡 Type Safety Issues

| # | Issue | File | Description |
|---|-------|------|-------------|
| 80 | **No `readonly` on constants** | `constants.ts` | `CLASS_RANGES`, `SUBJECTS_PRIMARY` should be `as const` (partially done, but tuples should be typed) |
| 81 | **`unknown[]` for data layer** | `useAnalytics.ts` | `window.dataLayer` should be typed as a custom event array, not `unknown[]` |
| 82 | **Loose type for resource** | `types/index.ts` | `Resource.type` is a string union but `Resource.class` is `number | null` (should be more restrictive) |

---

## PART 5: PERFORMANCE CHECKLIST

| # | Standard | Status | Notes |
|---|----------|--------|-------|
| 83 | `useSuspenseQuery` for data fetching | ❌ FAIL | No usage found. Static JSON imports used instead. |
| 84 | `React.lazy()` for routes | ❌ FAIL | Only `Suspense` wrapper, no `lazy()` usage. |
| 85 | `React.lazy()` for heavy components | ❌ FAIL | Doodles, data grids not lazy loaded. |
| 86 | No `isLoading` conditionals | ❌ FAIL | Not relevant due to no data fetching, but when added, must follow this. |
| 87 | No early-return spinners | ✅ PASS | `SuspenseLoader` is used via `fallback`. |
| 88 | `useMemo` for expensive derivations | ⚠️ PARTIAL | Some usage (`filteredCategories`), but inconsistent. |
| 89 | `useCallback` for all handlers | ❌ FAIL | Many handlers are inline arrows in JSX. |
| 90 | `React.memo` for heavy/pure components | ❌ FAIL | Not used on any component. |
| 91 | Debounce search (300-500ms) | ❌ FAIL | Search input uses immediate `onChange`. |
| 92 | Cleanup effects to avoid leaks | ❌ FAIL | `useAnalytics` does not remove scripts on unmount. |
| 93 | No inline API calls | ✅ PASS | No inline `fetch` or `axios` calls. |
| 94 | Cache-first data fetching | ❌ FAIL | No data fetching library configuration. |
| 95 | Preconnect hints (dns-prefetch) | ❌ FAIL | No `<link rel="preconnect">` for fonts, Google APIs. |

---

## PART 6: SECURITY & BEST PRACTICES

| # | Issue | File | Severity | Description |
|---|-------|------|----------|-------------|
| 96 | **HTML Injection via Search** | `SearchPage.tsx` | 🟡 | Search term rendered without sanitization if passed to URL or displayed. |
| 97 | **Missing `rel="noopener noreferrer"`** | `Footer.tsx` | 🟢 | External links should have `rel` attributes. |
| 98 | **Missing `Content-Security-Policy`** | Global | 🟢 | No CSP meta tag or header. |
| 99 | **No HTTPS Enforcement** | `useSEO.ts` | 🟢 | No `upgrade-insecure-requests` or HSTS headers. |
| 100 | **Environment Variable Validation** | `useAnalytics.ts` | 🟡 | `GA_ID` is checked but no validation that it looks like a GA tracking ID (`G-XXXXXXXXXX`). |

---

## PART 7: SUMMARY STATISTICS

| Category | 🔴 Critical | 🟡 High | 🟢 Medium | 🔵 Low | Total |
|----------|------------|--------|----------|-------|-------|
| **Errors / Bugs** | 6 | 3 | -- | -- | **9** |
| **Accessibility** | 4 | 3 | 2 | 2 | **11** |
| **Performance** | -- | 4 | 3 | 2 | **9** |
| **Type Safety** | 1 | 2 | 1 | -- | **4** |
| **Maintainability** | -- | 5 | 3 | 4 | **12** |
| **Missing Features** | 0 | 5 | 4 | 3 | **12** |
| **Architectural** | 2 | 2 | 2 | 2 | **6** |
| **TOTAL** | **13** | **24** | **18** | **13** | **68** |

---

## PART 8: RECOMMENDED PRIORITY ORDER

### Week 1: Fix Critical Issues
1. Add root-level `<ErrorBoundary>` in `main.tsx`
2. Fix `useAnalytics.ts` (cleanup, deduplication, dependency array)
3. Fix `useSEO.ts` (complete cleanup, reset title/meta on unmount)
4. Fix `SecondaryClassSpotlight.tsx` -- remove `as never` type hack
5. Add `aria-label` and `role` to all interactive elements in `Footer` and `QuickLinks`
6. Add `aria-label` to `SearchInput` and `FilterBar` buttons

### Week 2: Performance Optimization
7. Add `React.lazy()` for routes and heavy components (Doodles)
8. Add `React.memo`, `useMemo`, `useCallback` to all components
9. Extract large inline JSX into sub-components
10. Implement debounced search (300ms)

### Week 3: Architecture Hardening
11. Move SEO schemas to constants/config
12. Remove hardcoded values to `theme` or `constants.ts`
13. Implement `api/` layer with `useSuspenseQuery`
14. Structure all features per standard (`api/`, `hooks/`, `types/`)
15. Add type guards (e.g., Zod) for JSON data

### Week 4: UX & Accessibility Polish
16. Add 404 page, empty states, loading skeletons
17. Add skip links, live regions, focus visible styles
18. Add `prefers-reduced-motion` support
19. Implement cookie consent banner for GDPR
20. Add breadcrumb navigation and pagination