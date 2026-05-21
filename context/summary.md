
SAJHI SHIKSHA — CODEBASE SUMMARY (2026-05-21)
Project Overview
Sajhi Shiksha is a free educational resource platform for KVS students (Classes 1-12). Built with React 18 + TypeScript + Vite, MUI v7, TanStack Router, TailwindCSS v4, and Framer Motion. No backend, no auth, no database — all content is static JSON files.

Tech Stack
Framework: React 18, TypeScript (strict mode)
Build: Vite 8.0.13
Routing: TanStack Router (file-based routes)
UI Library: MUI v7 (Emotion) + TailwindCSS v4 (minimal usage)
Animations: Framer Motion (spring physics)
Styling: CSS variables + MUI sx prop + index.css design tokens
Fonts: Space Grotesk (headings 400-800), Space Mono (labels 400/700), Inter (body 400-600), Fredoka (accent)
Architecture
frontend/src/
├── App.tsx                    — Entry: wraps ThemeProvider + MUI ThemeProvider + CssBaseline + ErrorBoundary + SnackbarProvider + RouterProvider
├── router.ts                  — TanStack Router factory with defaultPreload: 'intent'
├── routeTree.gen.ts           — Auto-generated route tree
├── context/
│   └── ThemeContext.tsx       — SINGLE SOURCE OF TRUTH for theme. Returns [isDark, toggleTheme] tuple. Sets data-theme on <html> + localStorage. All components MUST import from here.
├── config/
│   └── theme.ts               — MUI theme factory. Light: yellow/pink/blue/green palette. Dark: inverted with white borders. All components: 0px border-radius, thick borders, hard shadows, press effects.
├── routes/
│   ├── __root.tsx             — Root layout: Header + Outlet + Footer + BottomTabBar + Devtools
│   ├── index.tsx              — Home route → HomePage
│   ├── resources.tsx          — Layout route for all resource pages
│   ├── resources.primary.tsx  — /resources/primary → ResourceListPage (category='primary')
│   ├── resources.secondary.tsx— /resources/secondary → ResourceListPage (category='secondary')
│   ├── resources.formats.tsx  — /resources/formats → ResourceListPage (category='formats')
│   ├── resources.programs.tsx — /resources/programs → ResourceListPage (category='programs')
│   ├── resources.admissions.tsx— /resources/admissions → ResourceListPage (category='admissions')
│   ├── view.$id.tsx           — /view/:id → ResourceViewPage
│   ├── search.tsx             — /search?q=... → SearchPage
│   ├── contribute.tsx         — /contribute → ContributePage
│   └── about.tsx              — /about → AboutPage
├── features/
│   ├── home/
│   │   ├── HomePage.tsx       — Assembles: HeroSection → CategoryGrid → ClassSpotlight → SecondaryClassSpotlight → QuickLinks → ContributeCTA. All wrapped in ScrollReveal.
│   │   └── components/
│   │       ├── HeroSection.tsx        — Asymmetric grid layout. Massive heading. Thick search bar (navigates to /search). Filter chips. BookDoodle illustration. Framer Motion staggered entrances.
│   │       ├── CategoryGrid.tsx       — "Pick Your Path" heading. CSS Grid 1/2/3/4 cols. SquiggleDoodle divider.
│   │       ├── ClassSpotlight.tsx     — Tabbed class selector (1-5). Subject cards with onClick → /resources/primary?class=N&subject=X. Neo-brutalist press effects.
│   │       ├── SecondaryClassSpotlight.tsx — Filter chips (6-8/9-10/11-12). Real resources from resources.json. onClick → /view/$id.
│   │       ├── QuickLinks.tsx         — 5 items with route mappings (all → /resources/formats). onClick handlers.
│   │       └── ContributeCTA.tsx      — Yellow banner with thick border. ArrowDoodle pointing to CTA button.
│   ├── resources/components/
│   │   └── ResourceListPage.tsx — FilterBar + ResourceCard grid/list. Client-side filtering. Neo-brutalist toggle buttons.
│   ├── search/components/
│   │   └── SearchPage.tsx     — SearchInput + FilterBar + relevance scoring. Recent searches (localStorage). Neo-brutalist empty states.
│   ├── viewer/components/
│   │   └── ResourceViewPage.tsx — IframeViewer + metadata + download/share/open buttons. Neo-brutalist chips.
│   ├── contribute/components/
│   │   └── ContributePage.tsx — 5 sections: Hero CTA (yellow banner), How It Works (3 steps), What You Can Share (5 types), Contributors (avatars), Contact info. All CSS variables.
│   └── about/components/
│       └── AboutPage.tsx      — 4 sections: Hero (blue banner), Mission (checkmarks), Team (avatar cards), Contact. All CSS variables.
├── components/
│   ├── Header/Header.tsx      — Sticky header. BookDoodle + Space Grotesk logo. Nav links with animated underline. Pill theme toggle. Mobile MENU button + Drawer.
│   ├── Footer/Footer.tsx      — Yellow bg (dark: #222240). Thick top border. Star/Squiggle doodles. Space Mono copyright.
│   ├── CategoryCard/CategoryCard.tsx — Thick borders, hard shadows, random rotation (-2° to 2°), alternating bright bg colors. Framer Motion hover/tap. Space Mono count badge.
│   ├── ResourceCard/ResourceCard.tsx — Neo-brutalist Box (not MUI Card). Type/subject chips with CSS variable colors. View/Download buttons with press effects. Grid + list modes.
│   ├── FilterBar/FilterBar.tsx — Desktop: inline selects + search. Mobile: bottom drawer. CSS variable themed controls. Active filter chips with ✕ dismiss.
│   ├── IframeViewer/IframeViewer.tsx — Google Drive iframe embed. Loading skeleton. Error state with retry/open-in-tab. Neo-brutalist frame.
│   ├── SearchBar/SearchInput.tsx — Debounced search input with clear button.
│   ├── BottomTabBar/BottomTabBar.tsx — Fixed bottom nav (mobile only). 5 tabs. Yellow active state with thick border. Safe-area padding.
│   ├── Skeleton/Skeleton.tsx  — Shimmer animation (CSS-based). Rectangular/circular/text variants.
│   ├── ScrollReveal/ScrollReveal.tsx — IntersectionObserver fade-in + slide-up. Auto-unobserve.
│   ├── PageTransition/PageTransition.tsx — Route entry animation (fade + 8px slide-up).
│   ├── Snackbar/Snackbar.tsx  — Toast system with MUI Alert. 3s auto-dismiss.
│   ├── ErrorBoundary/ErrorBoundary.tsx — Route-level error catching.
│   ├── SuspenseLoader/SuspenseLoader.tsx — Loading spinner.
│   └── Doodles/               — Inline SVG components: StarDoodle, ArrowDoodle, SquiggleDoodle, BookDoodle, PencilDoodle. Configurable size/color/rotation.
├── hooks/
│   └── useAnalytics.ts        — Google Analytics gtag.js pageview tracking.
├── lib/
│   ├── utils.ts               — getDriveEmbedUrl(), formatResourceCount(), getSubjectColor() (returns CSS var names now).
│   └── constants.ts           — SUBJECTS_PRIMARY, CLASS_RANGES, FILTER_CHIPS.
├── types/
│   └── index.ts               — Resource, CategoryCard interfaces.
├── data/
│   ├── site-config.json       — Site name, tagline, contact email, social links.
│   ├── categories.json        — 7 categories with routes, icons, computed resourceCount.
│   ├── navigation.json        — Nav items + footer links with routes.
│   ├── resources.json         — 36 resources with id, title, description, category, class, subject, type, driveUrl, contributors, lastUpdated.
│   └── contributors.json      — Email, WhatsApp, contributor list (name, initials, role, contribution).
└── index.css                  — Design tokens: CSS variables for light/dark (bg, border, shadow, yellow/pink/blue/green/purple/orange/red/teal). Paper texture SVG noise (3% opacity). Neo-brutalist utility classes (card-hover, btn-press, scroll-reveal, skeleton-shimmer). Easing curves (--ease-bounce, --ease-out, --ease-in-out).
Design System (Neo-Brutalist)
Light mode: bg=#FFFDF7 (warm paper), border=#1A1A1A, shadow=#1A1A1A, accents: yellow=#FFD600, pink=#FF6B9D, blue=#4ECDC4, green=#95E45C, purple=#C084FC, orange=#FF8C42
Dark mode: bg=#1A1A2E (deep navy), border=#FFFFFF, shadow=#000000, accents lightened
Borders: 3px solid everywhere (sharp corners, radius=0 except pills=9999px)
Shadows: Hard offset (4px 4px 0px), NO blur
Hover: translate(-2px, -2px) + shadow grows to 6px 6px
Active/press: translate(2px, 2px) + shadow collapses to 1px 1px
Typography: Space Grotesk 800 for headings, Space Mono for labels/chips, Inter for body (18px min)
Paper texture: SVG feTurbulence noise at 3% opacity on body background
Theme System (CRITICAL)
Single source: context/ThemeContext.tsx — React Context with ThemeProvider wrapper
Hook: useTheme() returns [boolean, () => void] tuple — [isDark, toggleTheme]
How it works: toggleTheme() updates context → all consumers re-render → MUI theme recreated → CSS data-theme attribute updated → CSS variables switch
ALWAYS import from: @/context/ThemeContext — NEVER from @/hooks/useTheme (deleted)
MUI's useTheme: Aliased as useMuiTheme when needed for breakpoints (e.g., FilterBar)
Navigation Pattern
All routes use TanStack Router navigate({ to: '/path' }) — NO window.location.href
Root route passes onNavigate down to Header, Footer, and all page components
Pages receive onNavigate: (route: string) => void prop for client-side routing
Resource viewer uses navigate({ to: '/view/$id', params: { id } })
Data Flow
JSON files in data/ are imported directly (no API calls)
resources.json is SSOT (36 resources) — all filtering/search is client-side
categories.json has computed resourceCount from resources.json
localStorage used for: theme preference, recent searches, analytics anon ID
Build Status
TypeScript: PASS (zero errors)
Vite Build: PASS
Bundle: 810KB JS / 247.37KB gzipped, 12KB CSS / 3.60KB gzipped
Performance budget: Flexible (over 200KB due to Framer Motion + MUI)
Key Conventions for AI Agents
Theme: Always use useTheme() from @/context/ThemeContext. Use CSS variables (var(--color-*)) for all colors. Never hardcode hex values.
Navigation: Use navigate({ to: '/path' }) from TanStack Router. Never window.location.href.
Styling: MUI sx prop with CSS variables. Neo-brutalist: 3px borders, hard shadows, sharp corners, Space Grotesk headings, Space Mono labels.
Animations: Framer Motion for spring physics. initial/animate/whileInView pattern with viewport={{ once: true }}.
Components: Pass onNavigate prop for routing. Use React.memo for pure presentational components.
Data: Import JSON directly. Client-side filtering. No API layer.
Fonts: Space Grotesk (headings), Space Mono (labels/chips), Inter (body). Never Nunito.
Dark mode: Every component must respond to data-theme via CSS variables. Test both modes.
