# Phase 1 Cleanup Summary — Sajhi Shiksha

> **Date:** 2026-05-21
> **Status:** COMPLETE
> **Next Phase:** Neo-Brutalist Redesign Execution

---

## Graph Analysis: Before vs After

| Metric | Before Cleanup | After Cleanup | Change |
|---|---|---|---|
| **Total Nodes** (functions/classes) | 971 | 940 | **-31** |
| **Total Edges** (call relationships) | 154 | 149 | **-5** |
| **Top Hotspot** | `setMeta` (18 callers) | `setMeta` (18 callers) | No change |

**Interpretation:** 31 dead symbols and 5 dead call edges removed. The codebase is now leaner with zero functional loss.

---

## What Was Done

### 1. Dead Code Files Deleted (5 files)

| File | Lines | Reason |
|---|---|---|
| `src/App.css` | 184 | Vite template default styles, never imported |
| `src/components/SearchBar/SearchModal.tsx` | 140 | Full-screen search modal, never imported anywhere |
| `src/assets/vite.svg` | — | Vite logo, never imported |
| `src/assets/react.svg` | — | React logo, never imported |
| `src/assets/hero.png` | — | Hero image, never imported |

### 2. Dead Functions Removed (4)

| Function | File | Reason |
|---|---|---|
| `cn()` | `lib/utils.ts` | Class name joiner, never imported |
| `debounce()` | `lib/utils.ts` | Generic debounce, never imported |
| `useSnackbar` hook | `components/Snackbar/Snackbar.tsx` | Context hook exported but never called |
| `handleSearch` | `features/home/HomePage.tsx` | Callback that updated dead state |

### 3. Dead Constants Removed (4)

| Constant | File | Reason |
|---|---|---|
| `RESOURCE_TYPES` | `lib/constants.ts` | Array of resource type strings, never imported |
| `MAX_CONTENT_WIDTH` | `lib/constants.ts` | `'1200px'`, hardcoded as strings everywhere |
| `MOBILE_BREAKPOINT` | `lib/constants.ts` | `768`, never imported |
| `TABLET_BREAKPOINT` | `lib/constants.ts` | `1024`, never imported |

### 4. Dead Type Interfaces Removed (5)

| Interface | File | Reason |
|---|---|---|
| `HomePageData` | `types/index.ts` | Never imported or used |
| `ClassTab` | `types/index.ts` | Only referenced inside `HomePageData` |
| `SubjectInfo` | `types/index.ts` | Only referenced inside `ClassTab` |
| `ClassFilter` | `types/index.ts` | Only referenced inside `HomePageData` |
| `QuickLink` | `types/index.ts` | Never imported (component defines its own) |

### 5. Dead State Removed

| Symbol | File | Reason |
|---|---|---|
| `_searchQuery` state | `HomePage.tsx` | Set but never read |
| `activeFilter` state | `HomePage.tsx` | Set but filtering uses local variable |
| `query` state | `HeroSection.tsx` | Set but never used meaningfully |
| `handleSearchChange` | `HeroSection.tsx` | Handler for dead state |

### 6. Data Bugs Fixed (7)

| File | Issue | Fix |
|---|---|---|
| `categories.json` | Route `/programs` | Changed to `/resources/programs` |
| `categories.json` | Route `/formats` | Changed to `/resources/formats` |
| `categories.json` | Route `/admissions` | Changed to `/resources/admissions` |
| `categories.json` | All `resourceCount` = 0 | Computed from `resources.json` (15, 11, 4, 5, 2, 0, 0) |
| `navigation.json` | Route `/programs` | Changed to `/resources/programs` |
| `navigation.json` | Route `/formats` | Changed to `/resources/formats` |
| `navigation.json` | Route `/admissions` | Changed to `/resources/admissions` |

### 7. Unused Dependency Removed

| Package | Version | Reason |
|---|---|---|
| `@tanstack/react-query` | ^5.100.11 | Installed but never imported anywhere |

### 8. Unused Context Removed

| Item | File | Reason |
|---|---|---|
| `SnackbarContext` | `components/Snackbar/Snackbar.tsx` | Created for `useSnackbar` hook which was never used |
| `showSnackbar` callback | `components/Snackbar/Snackbar.tsx` | Defined but never exposed after hook removal |

---

## Build Verification

| Check | Status | Details |
|---|---|---|
| **TypeScript** | PASS | Zero errors |
| **Vite Build** | PASS | 671KB JS / 205KB gzipped |
| **Lint** | 13 pre-existing errors | Route file patterns, not from cleanup |

---

## Remaining Dead Code (Known, Will Be Addressed in Redesign)

| Item | File | Notes |
|---|---|---|
| `SnackbarProvider` | `App.tsx` | Provider exists but no consumer calls `showSnackbar` |
| `FilterBar` component | `components/FilterBar/FilterBar.tsx` | Used on resource pages but could be simplified |
| `SearchInput` component | `components/SearchBar/SearchInput.tsx` | Only used on SearchPage |

---

## Next Phase: Neo-Brutalist Redesign

**AI Agent executing the next phase MUST read these files in order:**

1. **`context/neo-brutalist-redesign-plan.md`** — The single source of truth for the redesign. Contains:
   - Design system (colors, typography, borders, shadows)
   - Component redesign specifications
   - 5-phase implementation plan
   - AI agent execution notes

2. **`context/ui-context.md`** — Current UI context (for reference during transition)

3. **`context/architecture.md`** — System structure and invariants

4. **`context/code-standards.md`** — Implementation rules and conventions

**Key Design Principles for the Redesign:**

- **Neo-Brutalism:** Thick 3px black borders, hard offset shadows (no blur), sharp corners
- **Bold Colors:** Yellow (#FFD600), Pink (#FF6B9D), Blue (#4ECDC4), Green (#95E45C) — no gradients
- **Typography:** Space Grotesk 800 for headings, Space Mono for labels, Inter for body
- **Playful Interactions:** Physical button press, card lift with rotation, hand-drawn SVG doodles
- **Paper Texture:** Subtle noise overlay on background
- **Sticker Badges:** "NEW", "POPULAR" badges with slight rotation

**Execution Order:**
1. Phase 1: Foundation & Cleanup (DONE — this document)
2. Phase 2: Core Components Redesign (Header, Footer, Hero, Category Cards)
3. Phase 3: Feature Components Redesign (Resource Cards, Filter Bar, Iframe Viewer, Search)
4. Phase 4: Feature Pages Redesign (All 10 feature pages)
5. Phase 5: Polish & Playfulness (Doodles, animations, accessibility)

---

## Questions for Stakeholder

The AI agent should ask the following clarifying questions before proceeding with the redesign:

1. **MUI Usage:** Should we keep MUI v7 as the component library, or move to pure CSS/Tailwind for the neo-brutalist style? (MUI adds overhead and makes custom borders/shadows harder)

2. **Framer Motion:** The plan suggests installing Framer Motion for animations. Is the bundle size increase (~10KB gzipped) acceptable?

3. **Hand-Drawn SVGs:** Should doodles be inline SVG components, or loaded as separate SVG files?

4. **Dark Mode:** Should dark mode keep the neo-brutalist style (white borders on dark bg) or revert to a more conventional dark theme?

5. **Custom Cursor:** The plan mentions custom cursor effects. Should this be desktop-only or skipped entirely?

6. **Paper Texture:** How visible should the paper texture be? (Subtle 3% opacity vs more pronounced)

7. **Animation Intensity:** Should animations be playful and bouncy (Duolingo-style) or more subtle and refined (Linear-style)?

8. **Mobile Priority:** Should mobile design be optimized first, or should desktop get equal attention during redesign?

9. **Content Changes:** Should the copy/text on the site be updated to match the playful tone (e.g., "What do you want to learn today?" instead of "What are you looking for?")?

10. **Performance Budget:** Current bundle is 205KB gzipped (slightly over 200KB budget). Should we prioritize performance over adding Framer Motion?

---

*This document is the bridge between Phase 1 (cleanup) and Phase 2 (redesign). All AI agents should read this before starting work.*
