# Sajhi Shiksha — Performance Audit & Improvement Plan

**Date:** 2026-05-21
**Auditor:** Senior Frontend Performance Engineer
**Baseline Source:** Lighthouse (localhost:5173 dev server)
**Skills Applied:** performance-engineer, performance-optimizer, fixing-motion-performance, frontend-dev-guidelines

---

## Executive Summary

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| FCP | 17.4 s | < 1.8 s | CRITICAL |
| LCP | 58.1 s | < 2.5 s | CRITICAL |
| TBT | 5,790 ms | < 200 ms | CRITICAL |
| CLS | 0.59 | < 0.1 | CRITICAL |
| Speed Index | 17.4 s | < 3.4 s | CRITICAL |
| Total Payload | 10,455 KiB | < 1,500 KiB | CRITICAL |
| Main-thread Work | 11.9 s | < 3.0 s | CRITICAL |

> **IMPORTANT:** This audit was run against the Vite dev server (`localhost:5173`). Dev mode inflates every metric by 5-10x because:
> - React runs in development mode (802 KiB vs 42 KiB production)
> - No minification, no tree-shaking, no compression
> - Each module is a separate network request (200+ requests)
> - Hot Module Replacement overhead
>
> **The production build will be dramatically better.** However, the architectural issues identified below are real and must be fixed regardless of build mode.

---

## P0 — CRITICAL (Fix Immediately)

### P0-1: Replace @mui/icons-material with Selective Imports

**Impact:** Saves ~5,500 KiB transfer, eliminates 40+ network requests, reduces main-thread work by ~3s

**Problem:** `@mui/icons-material.js` = 5,955 KiB. Every icon used across the app is loaded as a separate chunk on initial page load. The network waterfall shows 40+ icon requests each taking 1.5-1.6s.

**Root Cause:** Icons are imported at the module level in every component that uses them. Vite dev mode loads each as a separate request.

**Fix:**
```tsx
// BAD — current pattern (in every component)
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// GOOD — create a shared icon registry
// src/components/Icons/index.ts
export { default as HomeIcon } from '@mui/icons-material/Home';
export { default as SchoolIcon } from '@mui/icons-material/School';
// ... only the icons actually used

// Or use SVG icons directly (best for production)
// Replace MUI icons with inline SVGs for the 10 most-used icons
```

**Expected Impact:**
- Transfer: 5,955 KiB → ~200 KiB (icons actually used)
- Network requests: 40+ → 1
- Main-thread: -3,000ms

---

### P0-2: Enable Production Build for Performance Testing

**Impact:** All metrics improve 5-10x automatically

**Problem:** Lighthouse was run against dev server. Dev mode React is 19x larger than production.

**Fix:**
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run Lighthouse against http://localhost:4173
```

**Expected Impact:**
- react-dom: 802 KiB → 42 KiB
- Total bundle: ~10 MB → ~800 KiB (with tree-shaking)
- FCP: 17.4s → ~2-3s (before other optimizations)

---

### P0-3: Code-Split the HomePage and Heavy Components

**Impact:** Reduces initial JS by ~150 KiB, improves FCP by 1-2s

**Problem:** `HomePage.tsx` (38 KiB), `HeroSection.tsx` (38 KiB), `ClassSpotlight.tsx` (26 KiB), `SecondaryClassSpotlight.tsx` (25 KiB), `QuickLinks.tsx` (21 KiB), `ContributeCTA.tsx` (14 KiB) — all loaded synchronously on first paint.

**Fix:**
```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { SuspenseLoader } from '@/components/SuspenseLoader/SuspenseLoader';
import React from 'react';

const HomePage = React.lazy(() => import('@/features/home/HomePage'));

export const Route = createFileRoute('/')({
    component: () => (
        <SuspenseLoader>
            <HomePage onNavigate={(route) => router.navigate({ to: route as any })} />
        </SuspenseLoader>
    ),
});
```

**Expected Impact:**
- Initial JS: -162 KiB
- FCP: -1,000ms
- TBT: -500ms

---

### P0-4: Fix Footer CLS (0.59 Score)

**Impact:** CLS: 0.59 → < 0.1

**Problem:** The footer (`footer.MuiBox-root`) is the single largest layout shift culprit (0.590 score). This is caused by:
1. Web fonts loading after content paints (4 woff2 files, 90 KiB total)
2. Footer rendering before fonts are ready, then reflowing when fonts swap

**Fix:**
```html
<!-- index.html — add font-display and preload -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

<!-- Remove Fredoka if unused (saves 9 KiB) -->
```

```css
/* index.css — reserve font space */
body {
    font-display: swap;
    /* Add fallback metrics to prevent reflow */
}
```

**Expected Impact:**
- CLS: 0.59 → < 0.05
- LCP render delay: -500ms

---

## P1 — HIGH (Fix This Sprint)

### P1-1: Lazy-Load Framer Motion

**Impact:** Saves 490 KiB initial load, 854ms main-thread

**Problem:** `framer-motion.js` (490 KiB) is loaded on every page, but animations are only visible when scrolled into view. 265 KiB of this is unused.

**Fix:**
```tsx
// Lazy-load motion components
const MotionBox = lazy(() => import('framer-motion').then(m => ({ default: m.motion.div })));

// Or use CSS transitions for simple animations (no framer-motion needed)
// Replace 60% of motion.div with CSS transitions
```

**Expected Impact:**
- Initial JS: -490 KiB (deferred)
- Main-thread: -854ms

---

### P1-2: Defer resources.json Loading

**Impact:** Saves 126 KiB initial load on non-search pages

**Problem:** `resources.json` (125.8 KiB) is imported in `SearchPage.tsx`, `ResourceListPage.tsx`, `SecondaryClassSpotlight.tsx`, `ResourceViewPage.tsx`, and `view.$id.tsx`. It loads on EVERY page, even the home page where only a subset is needed.

**Fix:**
```tsx
// Instead of: import resources from '@/data/resources.json';
// Use dynamic import:
const resources = await import('@/data/resources.json');

// Or split into per-category JSON files
// resources/primary.json, resources/secondary.json, etc.
```

**Expected Impact:**
- Initial JS: -126 KiB (on home page)
- Network: -1 request on non-resource pages

---

### P1-3: Memoize HeroSection (5,331ms CPU Time)

**Impact:** Reduces main-thread work by ~5s

**Problem:** `HeroSection.tsx` is the single largest CPU consumer (5,331ms, 4,968ms script evaluation). This component is doing far too much work on mount.

**Investigation Needed:**
- How many `motion.div` elements does it render?
- Are there expensive computations in the render path?
- Is it re-rendering unnecessarily?

**Likely Fixes:**
```tsx
// 1. Wrap in React.memo
export default React.memo(HeroSection);

// 2. Memoize expensive computations
const floatingElements = useMemo(() => generateFloatingElements(), []);

// 3. Reduce motion complexity
// Replace 10+ motion.div with 2-3 key ones
// Use CSS animations for decorative elements

// 4. Defer non-critical rendering
const [showDecorations, setShowDecorations] = useState(false);
useEffect(() => {
    const id = requestAnimationFrame(() => setShowDecorations(true));
    return () => cancelAnimationFrame(id);
}, []);
```

**Expected Impact:**
- Main-thread: -3,000ms to -4,000ms
- TBT: -2,000ms

---

### P1-4: Split MUI Material Bundle

**Impact:** Saves 564 KiB unused JS

**Problem:** `@mui_material.js` (1,233 KiB) includes components that are never used: `useAutocomplete` (27 KiB), `Slider` (37 KiB), `Select/SelectInput` (16 KiB), `Tooltip` (16 KiB), `createThemeWithVars` (21 KiB).

**Fix:**
```ts
// vite.config.ts — enable proper tree-shaking
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    mui: ['@mui/material'],
                    muiIcons: ['@mui/icons-material'],
                },
            },
        },
    },
});
```

**Expected Impact:**
- Unused JS: -564 KiB
- Parse time: -200ms

---

### P1-5: Remove TanStack Router Devtools from Production

**Impact:** Saves 9.6 KiB + eliminates dev-only code paths

**Problem:** Already conditionally rendered (`{isDev && <TanStackRouterDevtools />}`), but the import is still in the bundle.

**Fix:**
```tsx
// __root.tsx — use dynamic import for devtools
function RootComponent(): React.ReactElement {
    useAnalytics();
    const isDev = import.meta.env.DEV;
    const Devtools = isDev
        ? React.lazy(() => import('@tanstack/router-devtools').then(m => ({ default: m.TanStackRouterDevtools })))
        : null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* ... */}
            {isDev && Devtools && (
                <Suspense fallback={null}>
                    <Devtools />
                </Suspense>
            )}
        </Box>
    );
}
```

**Expected Impact:**
- Production bundle: -9.6 KiB

---

## P2 — MEDIUM (Fix This Quarter)

### P2-1: Replace MUI with Lighter Alternative for Mobile

**Impact:** Saves 1,233 KiB MUI + 275 KiB Emotion

**Problem:** MUI Material (1,233 KiB) + Emotion styled (275 KiB) = 1,508 KiB for a component library. For a content-heavy educational site, this is excessive.

**Options:**
1. **Keep MUI but optimize:** Use `@mui/material` imports selectively, enable tree-shaking
2. **Hybrid approach:** Keep MUI for complex components (Select, Tabs), use native CSS for simple ones (Box, Typography, Button)
3. **Full migration:** Replace with Radix UI + Tailwind (long-term)

**Recommendation:** Option 1 for now, Option 3 as a 6-month goal.

---

### P2-2: Implement Service Worker for Caching

**Impact:** Repeat visits load in < 1s

**Problem:** No caching strategy. Every visit re-downloads all assets.

**Fix:**
```ts
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        // ...existing plugins
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,woff2,svg,png}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: { cacheName: 'google-fonts', expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 } }
                    },
                    {
                        urlPattern: /\/api\//i,
                        handler: 'NetworkFirst',
                        options: { cacheName: 'api-cache', expiration: { maxAgeSeconds: 60 * 5 } }
                    },
                ],
            },
        }),
    ],
});
```

**Expected Impact:**
- Repeat visit FCP: < 500ms
- Repeat visit LCP: < 1s

---

### P2-3: Optimize Font Loading Strategy

**Impact:** LCP render delay: -1,000ms

**Problem:** 4 font families loaded sequentially. The critical path shows fonts blocking render for 2,936ms.

**Fix:**
```html
<!-- index.html -->
<!-- Preload only the critical font (Space Grotesk for headings) -->
<link rel="preload" href="/fonts/space-grotesk-latin-700.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/inter-latin-400.woff2" as="font" type="font/woff2" crossorigin />

<!-- Self-host fonts instead of Google Fonts CDN -->
<!-- Use https://google-webfonts-helper.herokuapp.com/ to generate -->
```

**Expected Impact:**
- LCP render delay: -1,000ms
- FCP: -300ms

---

### P2-4: Fix Animation Performance (Framer Motion)

**Impact:** Reduces jank, improves INP

**Problem:** Multiple `motion.div` with `whileInView`, `whileHover`, `whileTap` on the home page. Per `fixing-motion-performance` skill:
- `whileHover` with `boxShadow` triggers repaint (not compositor-only)
- Multiple `motion.div` with `y` transforms are fine (compositor-only)
- But `boxShadow` transitions are paint-heavy

**Fix:**
```tsx
// BAD — paint-heavy hover
<motion.div
    whileHover={{ boxShadow: '5px 5px 0px var(--color-shadow)' }}
    transition={{ duration: 0.15 }}
/>

// GOOD — compositor-only hover
<motion.div
    whileHover={{ y: -2 }}
    style={{ boxShadow: '3px 3px 0px var(--color-shadow)' }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
/>
// Use CSS for the shadow change
```

**Expected Impact:**
- INP: -200ms
- Paint time: -300ms

---

### P2-5: Add Performance Budgets to CI

**Impact:** Prevents future regressions

**Fix:**
```json
// package.json
{
    "performance-budget": {
        "total-js": "500KB",
        "total-css": "50KB",
        "largest-chunk": "200KB",
        "initial-js": "200KB",
        "total-images": "500KB"
    }
}
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { esbuildPlugin } from '@nabla/vite-plugin-eslint';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 200, // kB
    },
});
```

---

## P3 — LOW (Nice to Have)

### P3-1: Remove Fredoka Font (Unused)

**Impact:** Saves 9 KiB

The `Fredoka` font family is loaded but never used in the CSS. Remove from `index.html`.

---

### P3-2: Add `content-visibility: auto` to Below-Fold Sections

**Impact:** Reduces initial render cost

```tsx
<Box sx={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
    <SecondaryClassSpotlight />
</Box>
```

---

### P3-3: Virtualize Long Lists

If any resource list exceeds 50 items, use `@tanstack/react-virtual` to render only visible items.

---

### P3-4: Add `fetchpriority="high"` to LCP Element

```html
<!-- If the hero heading is the LCP element -->
<meta fetchpriority="high" />
```

---

## Accessibility Issues (From Lighthouse A11y Score: 81)

### A11-1: Add Accessible Names to Icon Buttons

**Failing:** `button.MuiButtonBase-root.MuiIconButton-root`

**Fix:**
```tsx
<IconButton aria-label="Open menu">
    <MenuIcon />
</IconButton>
```

---

### A11-2: Fix Color Contrast

**Failing Elements:**
- "Class 1" text on colored backgrounds
- "Hindi Class 1", "EVS Class 1", "General Class 1"
- Secondary class buttons (Class 9-10, Class 11-12)

**Fix:** Ensure contrast ratio >= 4.5:1 for normal text, 3:1 for large text.

---

### A11-3: Fix List Structure

**Failing:** `<ul>` contains `<div role="button">` instead of `<li>` elements

**Fix:**
```tsx
// BAD
<ul>
    <div role="button">Morning Assembly Formats</div>
</ul>

// GOOD
<ul>
    <li><button>Morning Assembly Formats</button></li>
</ul>
```

---

### A11-4: Fix Touch Target Size

**Failing:** Bottom navigation buttons too small

**Fix:** Ensure minimum 48x48px touch targets per WCAG 2.5.5.

---

## Implementation Priority Order

| Phase | Items | Estimated Effort | Expected Impact |
|-------|-------|-----------------|-----------------|
| **Week 1** | P0-2 (prod build), P0-4 (font CLS) | 2 hours | CLS: 0.59 → 0.05 |
| **Week 1** | P0-1 (icon optimization) | 4 hours | -5,500 KiB, -3s main-thread |
| **Week 2** | P0-3 (code splitting) | 3 hours | -162 KiB initial, -1s FCP |
| **Week 2** | P1-3 (HeroSection memoization) | 4 hours | -4s main-thread |
| **Week 3** | P1-1 (framer-motion lazy) | 2 hours | -490 KiB initial |
| **Week 3** | P1-2 (defer resources.json) | 3 hours | -126 KiB on home |
| **Week 4** | P1-4 (MUI tree-shaking) | 2 hours | -564 KiB unused |
| **Week 4** | A11-1 to A11-4 (accessibility) | 4 hours | A11y: 81 → 95+ |
| **Month 2** | P2-2 (service worker) | 6 hours | Repeat visits < 1s |
| **Month 2** | P2-3 (self-host fonts) | 2 hours | -1s LCP render delay |
| **Month 2** | P2-4 (animation perf) | 4 hours | INP: -200ms |
| **Month 3** | P2-5 (perf budgets) | 2 hours | Prevents regressions |

---

## Expected Results After All Fixes

| Metric | Before | After Production Build | After All Fixes |
|--------|--------|----------------------|-----------------|
| FCP | 17.4 s | ~2.5 s | < 1.5 s |
| LCP | 58.1 s | ~4.0 s | < 2.0 s |
| TBT | 5,790 ms | ~800 ms | < 100 ms |
| CLS | 0.59 | ~0.3 | < 0.05 |
| Speed Index | 17.4 s | ~3.5 s | < 2.5 s |
| Total JS | 10,455 KiB | ~800 KiB | < 400 KiB |
| Performance Score | ~15 | ~65 | > 90 |

---

## Notes on Dev vs Production

The current Lighthouse report is **not representative of production performance**. The dev server:
- Sends unminified code (10x larger)
- Makes 200+ individual module requests
- Runs React in development mode (19x larger)
- Has no compression, no caching, no tree-shaking

**Run this command to get real production metrics:**
```bash
npm run build && npm run preview
# Then run Lighthouse against http://localhost:4173
```

The production build from our earlier run shows:
- `index-Bqg2dynh.js`: 633 KiB (197 KiB gzipped)
- Total JS: ~800 KiB (vs 10,455 KiB in dev)
- Build time: 2.02s

This is still too large for a great Lighthouse score, but it's in the right ballpark. The optimizations above will bring it down to ~400 KiB total.
