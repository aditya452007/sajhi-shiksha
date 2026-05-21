# Progress Tracker — Sajhi Shiksha

## Current Phase

**Phase 7: Neo-Brutalist Playful Redesign — PHASE 2 (Foundation + Core Components) COMPLETE**

## Current Goal

Transform the website from a generic corporate UI into a bold, playful, neo-brutalist design that students will love. Execute the implementation plan in `context/neo-brutalist-redesign-plan.md`.

## Completed

- **Neo-Brutalist Redesign Plan** — Comprehensive 10-phase implementation plan created (`context/neo-brutalist-redesign-plan.md`)
- **Dead Code Audit** — Full static analysis identifying 20+ dead code items (`context/dead-code-audit.md`)
- **Codebase Graph Analysis** — pyscribe-code MCP server analyzed 971 nodes, 154 edges
- **Deep Codebase Exploration** — All 58 source files analyzed, all components/hooks/utilities catalogued

## Completed

- Website scrape and analysis (20 pages, 69 headings, 111 paragraphs, 2,340 links)
- Design research document (design.md — 250 lines covering playful educational design)
- Design tokens extracted from existing site CSS
- Clarification questions answered by stakeholder
- Context files populated with real project data:
  - project-overview.md
  - architecture.md
  - ui-context.md
  - code-standards.md
  - ai-workflow-rules.md
- Feature spec files created:
  - 01-homepage.md
  - 02-navigation.md
  - 03-resource-pages.md
  - 04-search-filter.md
  - 05-iframe-viewer.md
  - 06-contribute.md
  - 07-about.md
  - 08-theme-toggle.md
  - 09-responsive.md
  - 10-folder-architecture.md
  - 11-seo.md
  - 12-animations.md
- **Phase 1: Homepage Implementation — COMPLETE**
  - Vite + React 18 + TypeScript project initialized (`frontend/`)
  - All dependencies installed: MUI v7, TanStack Router, TanStack Query, TailwindCSS v4, Emotion
  - Full folder structure created per architecture spec
  - Base config files: `vite.config.ts`, `tsconfig.app.json`, `index.html`, `index.css`
  - MUI theme with light/dark mode and design tokens from ui-context.md
  - TypeScript types: Resource, CategoryCard, ClassTab, QuickLink, HomePageData
  - Static JSON data files: site-config, categories, navigation, resources
  - Utility functions: cn, getDriveEmbedUrl, formatResourceCount, getSubjectColor, debounce
  - Shared hook: useTheme (localStorage + prefers-color-scheme)
  - Base components: SuspenseLoader, ErrorBoundary
  - Reusable component: CategoryCard (with React.memo, keyboard navigation, hover effects)
  - Homepage sections:
    - HeroSection (gradient heading, search bar, filter chips, animated background)
    - CategoryGrid (responsive MUI Grid v7, 2/3/4 columns)
    - ClassSpotlight (tabbed interface for classes 1-5, subject cards with color coding)
    - SecondaryClassSpotlight (filter chips for 6-8/9-10/11-12, resource list)
    - QuickLinks (formats & rules with icons and hover animations)
    - ContributeCTA (warm gradient banner, mailto link)
  - Layout components: Header (responsive nav, mobile drawer, theme toggle), Footer (link columns)
  - HomePage feature component assembling all sections with state management
  - TanStack Router setup: root route with layout, index route with Suspense
  - App.tsx with ThemeProvider, CssBaseline, ErrorBoundary, RouterProvider
  - **Build passes successfully** — `npm run build` completes with zero errors
  - Production bundle: 639KB JS (196KB gzipped), 8.6KB CSS (2.6KB gzipped)
- **Phase 2: Resource Pages, Iframe Viewer, and Search — COMPLETE**
  - Populated `resources.json` with 36 resources matching actual site structure
  - Built reusable components:
    - `IframeViewer` — Google Drive iframe embed with loading skeleton, error state, retry, and open-in-tab fallback
    - `ResourceCard` — Grid and list view modes with subject-colored badges, hover effects, keyboard navigation
    - `FilterBar` — Desktop dropdowns + mobile slide-up panel with active filter chips and clear-all
    - `SearchInput` — Debounced search with clear button
    - `SearchModal` — Full-screen mobile search with recent/popular searches
  - Built feature pages:
    - `ResourceListPage` — Category listing with filter bar, grid/list toggle, empty state
    - `ResourceViewPage` — Single resource view with iframe, download/share/open-in-tab actions, contributor info
    - `SearchPage` — Full-text search with relevance scoring, filter integration, recent searches (localStorage)
  - Created TanStack Router routes:
    - `/resources/primary` — Classes 1-5 resources
    - `/resources/secondary` — Classes 6-12 resources
    - `/resources/formats` — Formats & Rules
    - `/resources/programs` — Programs (Nipun/FLN, CMP, TBP, Cub & Bulbul)
    - `/resources/admissions` — Admissions info
    - `/view/$id` — Resource detail with iframe viewer
    - `/search?q=...` — Search page with query param support
  - Updated root route to use `useNavigate` instead of `window.location.href`
  - Added `@tanstack/router-plugin` for auto route tree generation
  - **Build passes successfully** — zero TypeScript errors, production bundle built
  - Production bundle: 639KB JS (196KB gzipped), 8.6KB CSS (2.6KB gzipped)

## In Progress

- None

## Next Up

1. Replace placeholder Google Drive URLs with real folder IDs
2. Create OG image (1200x630px) at `public/images/og-image.png`
3. Deploy to hosting provider

## Open Questions

- Hosting provider selection (Vercel vs Netlify vs GitHub Pages)
- Whether to extract all Google Drive iframe URLs from existing site now or during content migration
- Font loading strategy (Google Fonts CDN vs self-hosted for performance)
- **State Management Strategy:** Zustand store vs React Context for global state (theme, filters, search). To be decided during Vite setup.
- **Dynamic OG Image Generation:** How to generate `og-image.png` dynamically for each resource page? (Pre-render vs static build?)

## Architecture Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| React + Vite + TS + TanStack Router + MUI v7 + Tailwind | Matches existing skills, proven stack, good DX | 2026-05-20 |
| No auth, no database, no backend | Keep it simple, email-based contribution is sufficient | 2026-05-20 |
| Hardcoded JSON content | Simple, editable, deployable with site | 2026-05-20 |
| Playfulness level 5 | Friendly but not gamified, no auth needed for streaks/levels | 2026-05-20 |
| Mobile-first responsive | Students primarily on mobile devices | 2026-05-20 |
| Google Drive iframes only | No API complexity, existing pattern works | 2026-05-20 |
| Consolidated navigation (7 sections vs 20 pages) | Better UX, fewer clicks to content | 2026-05-20 |
| CSS + lightweight animation library | Performance-conscious, no heavy animation libraries | 2026-05-20 |
| Domain configurable via env/config | Future-proof, no hardcoded URLs | 2026-05-20 |
| Single `@` Alias for all imports | Prevents alias hell, simplifies `vite.config.ts` and `tsconfig.json` | 2026-05-20 |
| Client-side filtering & search | No backend dependency, instant UX, data is small (< 2MB) | 2026-05-20 |
| `resources.json` as SSOT | Single source of truth for all data. Schema MUST match `Resource` interface in `src/types/resource.ts` | 2026-05-20 |
| Error boundaries at Route level | Catches rendering bugs per page, preventing total app crashes | 2026-05-20 |

## New/Updated Context Files

- `CRITICAL-FEATURE-SPEC-AUDIT.md` — Identifies 30+ inconsistencies, conflicts, and missing pieces across all feature specs.
- `IMPLEMENTATION-RULES.md` — Master coding standard, performance budget, and A11y commandments for AI agents.
- `THE-COMPONENT-COOKBOOK.md` — Atomic design guide for building UI components (Atoms, Molecules, Organisms).
- `ERROR-HANDLING.md` — Complete error taxonomy, fallback UIs, and recovery strategies for every failure mode.
- `AI-EXECUTION-PLAYBOOK.md` — Step-by-step guide for AI agents to implement features without hallucinations.

## Updated Feature Specs

- `05-iframe-viewer.md` — Updated with responsive iframe config (mobile vs desktop height) and corrected security notes.
- `10-folder-architecture.md` — Fixed conflicting alias strategy (`~` vs `@`). Standardized to single `@` alias.

## Session Notes

### 2026-05-20 — Planning Session
- Read all existing project files (scrape data, design research, agent skills)
- Created and answered 40+ clarification questions
- Decided on tech stack, design direction, scope, and constraints
- Created 12 feature spec files and updated 5 context files
- Key principle: **Keep It Stupidly Simple (KISS)** — no over-engineering, no AI-slop

### 2026-05-20 — Senior Frontend Audit & Documentation
- **Audited all 12 feature specs** against senior frontend (React, TypeScript) and UI/UX standards.
- **Created 5 new documentation files** to prevent AI hallucinations and enforce code quality.
- **Fixed 2 critical inconsistencies** in existing specs (iframe responsiveness, import aliases).
- **Established a "Read First" protocol** for all future AI agents working on this project.
- Key principle: **"If it's not documented, it doesn't exist. If it's documented in two places saying different things, the AI will break."**

### 2026-05-20 — Phase 1: Homepage Implementation
- **Initialized Vite + React 18 + TypeScript project** in `frontend/` directory
- **Installed all dependencies**: MUI v7, @mui/icons-material, Emotion, TanStack Router, TanStack Query, TailwindCSS v4
- **Created complete folder structure** per architecture spec (features, components, routes, data, hooks, types, config, lib, assets)
- **Configured build tooling**: vite.config.ts with Tailwind plugin and @ alias, tsconfig with strict mode and path aliases
- **Built MUI theme system** with light/dark palettes matching ui-context.md design tokens
- **Created TypeScript types** for all domain entities (Resource, CategoryCard, ClassTab, QuickLink, HomePageData)
- **Created static JSON data files** (site-config, categories, navigation, resources)
- **Built utility library** (cn, getDriveEmbedUrl, formatResourceCount, getSubjectColor, debounce)
- **Built shared useTheme hook** with localStorage persistence and system preference detection
- **Built all homepage components**: HeroSection, CategoryGrid, ClassSpotlight, SecondaryClassSpotlight, QuickLinks, ContributeCTA
- **Built layout components**: Header (responsive nav + mobile drawer + theme toggle), Footer (link columns)
- **Built base components**: SuspenseLoader, ErrorBoundary, CategoryCard (with React.memo)
- **Set up TanStack Router** with root layout route and index route with Suspense boundaries
- **Build passes successfully** — zero TypeScript errors, production bundle built
- **Performance**: 584KB JS (183KB gzipped), 8.4KB CSS (2.5KB gzipped) — within 200KB gzipped budget

### 2026-05-20 — Phase 2: Resource Pages, Iframe Viewer, and Search
- **Populated `resources.json`** with 36 resources matching actual site structure (Classes 1-5, 6-12, Programs, Formats, Admissions)
- **Built IframeViewer component** with loading skeleton, error state with retry/open-in-tab fallback, responsive sizing
- **Built ResourceCard component** with grid/list view modes, subject-colored badges, type icons, hover lift effects, keyboard navigation
- **Built FilterBar component** with desktop dropdowns (Class, Subject, Type), search input, active filter chips, mobile slide-up panel
- **Built SearchInput and SearchModal components** with recent/popular searches, full-screen mobile overlay
- **Built ResourceListPage** with category filtering, grid/list toggle, empty state, breadcrumb navigation
- **Built ResourceViewPage** with iframe viewer, download/share/open-in-tab actions, contributor credits, last updated date
- **Built SearchPage** with relevance scoring algorithm (title=10/5, description=3, category/subject=1), localStorage recent searches, filter integration
- **Created 8 TanStack Router routes**: resources layout, primary, secondary, formats, programs, admissions, view/$id, search
- **Added @tanstack/router-plugin** for auto route tree generation with code splitting
- **Updated root route** to use `useNavigate` hook instead of `window.location.href`
- **Build passes successfully** — 639KB JS (196KB gzipped), 8.6KB CSS (2.6KB gzipped)

### 2026-05-20 — Phase 3: Contribute and About Pages
- **Created `contributors.json`** with real contributor data (Ms. Jyoti, Mr. Ajit Yadav, Mr. Bhupesh Sharma)
- **Built `ContributePage`** with 5 sections:
  - Hero CTA with warm gradient background and mailto link
  - How It Works — 3-step process cards with numbered badges
  - What You Can Share — 5 contribution types with icons
  - Current Contributors — avatar list with initials, roles, and contributions
  - Contact Information — clickable email and WhatsApp links
- **Built `AboutPage`** with 4 sections:
  - Hero with mission statement and tagline
  - Our Mission — 4 core values with checkmark icons
  - Behind Sajhi Shiksha — contributor cards with avatars and roles
  - Get In Touch — email and website links
- **Created 2 TanStack Router routes**: `/contribute`, `/about`
- **Build passes successfully** — 652KB JS (199KB gzipped), 8.6KB CSS (2.6KB gzipped)

### 2026-05-20 — Phase 4: SEO, Meta Tags, and Analytics
- **Created `useSEO` hook** (`src/hooks/useSEO.ts`) — per-page meta tag management with Open Graph, Twitter Cards, canonical URLs, JSON-LD structured data, and cleanup on unmount
- **Created `useAnalytics` hook** (`src/hooks/useAnalytics.ts`) — Google Analytics gtag.js integration with route-change pageview tracking, controlled via `VITE_GA_MEASUREMENT_ID` env var
- **Updated `index.html`** with full SEO baseline: meta description, keywords, author, robots, canonical link, Open Graph tags (type, url, title, description, image, site_name, locale), Twitter Card tags, and EducationalOrganization JSON-LD
- **Created `public/robots.txt`** — allows all crawlers, references sitemap
- **Created `public/sitemap.xml`** — 9 URLs with priorities and changefreq (homepage=1.0, resource pages=0.7-0.9, search/contribute/about=0.5-0.6)
- **Created `public/llms.txt`** — AI/LLM-readable site description with URL structure and contribution info
- **Added SEO to all 10 route components**: index, resources/primary, resources/secondary, resources/formats, resources/programs, resources/admissions, view/$id (dynamic title from resource), search (dynamic title from query), contribute, about
- **Added JSON-LD structured data**: Organization + WebSite schemas on homepage, EducationalOrganization on about page
- **Updated `site-config.json`** with correct contact email (Mamta07691@gmail.com)
- **Created `.env.example`** with `VITE_GA_MEASUREMENT_ID` placeholder
- **Added `useAnalytics` to root route** for automatic pageview tracking on every navigation
- **Build passes successfully** — 657KB JS (201KB gzipped), 8.6KB CSS (2.6KB gzipped)

### 2026-05-21 — Phase 5: Responsive Mobile Enhancements (Spec 09)
- **Created `BottomTabBar` component** (`src/components/BottomTabBar/BottomTabBar.tsx`) — fixed bottom navigation for mobile with 5 tabs: Home, Classes 1-5, Classes 6-12, Programs, Search
- **BottomTabBar features**: auto-detects active route from current pathname, MUI BottomNavigation with icon + label, hidden on desktop (md+), `env(safe-area-inset-bottom)` padding for notched phones, 48px min-height touch targets, React.memo optimized
- **Integrated BottomTabBar into root layout** (`src/routes/__root.tsx`) — added below Footer, content area gets `pb: { xs: 8, md: 0 }` to prevent overlap
- **Added global touch target enforcement** (`src/index.css`) — all buttons, links, and interactive elements get `min-height: 44px; min-width: 44px` on mobile, reset on desktop (900px+)
- **Added safe-area CSS utility** — `.safe-bottom` class for components needing bottom safe-area padding
- **Build passes successfully** — 661KB JS (202KB gzipped), 9.0KB CSS (2.7KB gzipped)

### 2026-05-21 — Phase 7: Neo-Brutalist Redesign — Phase 1 Cleanup COMPLETE
- **Ran pyscribe-code MCP server (pre-cleanup):** 971 nodes, 154 edges
- **Ran pyscribe-code MCP server (post-cleanup):** 940 nodes, 149 edges (-31 nodes, -5 edges)
- **Deleted 5 files:** App.css, SearchModal.tsx, vite.svg, react.svg, hero.png
- **Removed 4 dead functions:** cn(), debounce(), useSnackbar hook, handleSearch callback
- **Removed 4 dead constants:** RESOURCE_TYPES, MAX_CONTENT_WIDTH, MOBILE_BREAKPOINT, TABLET_BREAKPOINT
- **Removed 5 dead type interfaces:** HomePageData, ClassTab, SubjectInfo, ClassFilter, QuickLink
- **Removed dead state:** _searchQuery (HomePage), query state (HeroSection), handleSearchChange
- **Fixed 7 data bugs:** Wrong routes in categories.json and navigation.json, computed resourceCount values
- **Removed unused dependency:** @tanstack/react-query
- **Removed unused context:** SnackbarContext, showSnackbar callback
- **Build verification:** TypeScript PASS, Vite build PASS (671KB JS / 205KB gzipped), 13 pre-existing lint errors
- **Created cleanup summary:** `context/phase-1-cleanup-summary.md`
- **Created redesign plan:** `context/neo-brutalist-redesign-plan.md`
- **Ready for Phase 2:** Core Components Redesign (Header, Footer, Hero, Category Cards)

### 2026-05-21 — Phase 7: Neo-Brutalist Redesign — Phase 2 (Foundation + Core Components) COMPLETE
- **Stakeholder decisions recorded:** Hybrid MUI approach, Framer Motion installed, inline SVG doodles, neo-brutalist dark mode, skip custom cursor, 3% paper texture, playful bouncy animations, mobile-first, playful copy, flexible performance budget
- **Installed Framer Motion** — spring physics for all interactions
- **Updated Google Fonts** — replaced Nunito with Space Grotesk (400-800) + Space Mono (400, 700)
- **Rewrote index.css** — neo-brutalist design tokens (--color-bg, --color-border, --color-shadow, --color-yellow/pink/blue/green/purple/orange), paper texture SVG noise overlay at 3% opacity, hard shadow variables (--shadow-card, --shadow-button, --shadow-chip), sharp corners (--radius-sharp: 0px), bouncy easing curves
- **Rewrote config/theme.ts** — neo-brutalist light/dark palettes, Space Grotesk 800 for all headings, Space Mono for buttons, 0px border radius, MUI component overrides for thick borders + hard shadows + press effects
- **Created 5 SVG doodle components** (inline React): StarDoodle, ArrowDoodle, SquiggleDoodle, BookDoodle, PencilDoodle — all with configurable size/color/rotation
- **Redesigned Header** — custom div (not MUI AppBar), BookDoodle icon + Space Grotesk 800 logo, thick 3px bottom border, nav links with animated underline-on-hover, pill theme toggle with hard shadow, mobile MENU button with thick border, mobile drawer with neo-brutalist styling
- **Redesigned Footer** — yellow background (dark: #222240), thick 3px top border, Space Grotesk headings, SquiggleDoodle decoration, StarDoodle accents, Space Mono copyright ("Made with ♥ by students, for students"), thick-bordered link sections with underline-on-hover
- **Redesigned HeroSection** — asymmetric 60/40 grid layout (stacked on mobile), massive heading "What do you want to learn today?" (Space Grotesk 800, 4rem desktop), yellow highlight on "learn" word, thick-bordered search bar with sharp corners + yellow focus state, Framer Motion filter chips with hard shadows, BookDoodle illustration with StarDoodle decorations, spring-based staggered entrance animations
- **Redesigned CategoryCard** — thick 3px borders, hard 4px shadows, alternating bright backgrounds (yellow/pink/blue/green/purple/orange), random rotation per card (-2deg to 2deg), Framer Motion hover (lift + rotate -1deg + shadow grow), tap press effect (shadow collapses), Space Mono resource count badge, icon in bordered white box
- **Redesigned CategoryGrid** — CSS Grid responsive layout (1/2/3/4 columns), "Pick Your Path" heading, SquiggleDoodle divider, Framer Motion staggered card entrances
- **Redesigned ClassSpotlight** — thick-bordered section with yellow/pink background, Space Grotesk heading, SquiggleDoodle divider, pill-shaped tabs with hard shadows, subject cards with subject-colored backgrounds + thick borders + press effects, Space Mono class labels
- **Redesigned SecondaryClassSpotlight** — pill filter buttons (6-8/9-10/11-12), thick-bordered resource list with hover states, Space Grotesk titles, Space Mono metadata
- **Redesigned QuickLinks** — thick-bordered list with yellow hover, SquiggleDoodle divider, Space Grotesk link titles
- **Redesigned ContributeCTA** — "Got Resources to Share?" heading, yellow background banner with thick border + hard shadow, ArrowDoodle pointing to CTA, StarDoodle decoration, Framer Motion button with hover lift + press effect
- **Build verification:** TypeScript PASS, Vite build PASS (803KB JS / 247.66KB gzipped, 12KB CSS / 3.60KB gzipped)
- **Added animation CSS utilities** (`src/index.css`) — easing curves (--ease-out, --ease-in-out, --ease-bounce), page transitions, scroll reveal, shimmer skeleton, card hover lift, button press, chip toggle, icon bounce, drawer slide, panel slide-up, snackbar slide-in, theme transition
- **Created `Skeleton` component** (`src/components/Skeleton/Skeleton.tsx`) — shimmer animation with rectangular/circular/text variants, multi-line text support, CSS-based GPU-accelerated animation
- **Created `ScrollReveal` component** (`src/components/ScrollReveal/ScrollReveal.tsx`) — IntersectionObserver-based scroll-triggered fade-in + slide-up, configurable delay/threshold/rootMargin, auto-unobserve after reveal, React.memo optimized
- **Created `PageTransition` component** (`src/components/PageTransition/PageTransition.tsx`) — fade + 8px slide-up on route entry, 300ms ease-out transition, auto-triggers on mount
- **Created `SnackbarProvider` + `useSnackbar` hook** (`src/components/Snackbar/Snackbar.tsx`) — context-based toast system, MUI Alert with severity levels, 3s auto-dismiss, slide-in animation, queued message support
- **Integrated PageTransition** into root route wrapping `<Outlet />` — all route changes get animated entry
- **Integrated SnackbarProvider** into App.tsx wrapping `<RouterProvider />` — available globally via `useSnackbar()`
- **Applied ScrollReveal** to all homepage sections (CategoryGrid, ClassSpotlight, SecondaryClassSpotlight, QuickLinks, ContributeCTA) with staggered delays (0ms-200ms)
- **Replaced MUI Skeleton** in IframeViewer with custom Skeleton component for consistency
- **Build passes successfully** — 672KB JS (205KB gzipped), 10.9KB CSS (3.2KB gzipped)
