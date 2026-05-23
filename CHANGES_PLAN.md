# Codebase Cleanup & Refactoring Plan

## A. DEAD CODE — Remove (Zero Impact)

| # | File | What | Reason |
|---|------|------|--------|
| 1 | `lib/utils.ts:22-38` | `getSubjectColor()` function | Defined but never imported/used anywhere |
| 2 | `hooks/useDebounce.ts:39-52` | `useDebounceValue()` hook | Defined but never imported/used anywhere |
| 3 | `lib/filterUtils.ts:37-46` | `isValidClass()`, `isValidSubject()`, `isValidType()` | Defined but never imported/used anywhere |
| 4 | `lib/constants.ts:23-24` | `COLOR_TEXT_DARK`, `COLOR_SHADOW_DARK` | Defined but never imported/used anywhere |
| 5 | `lib/constants.ts:7-12` | `FILTER_CHIPS` constant | Never imported — `filters.json` used instead |
| 6 | `config/theme.ts:143-149` | `warm` palette module augmentation | Declared but never assigned a value; `accent` exists and is used |

## B. UNUSED DATA FILES — Delete

| # | File | Reason |
|---|------|--------|
| 7 | `data/navigation.json` | Zero imports across codebase — navigation lives in `site-content.json` |
| 8 | `data/categories.json` | Zero imports — categories passed as props, never loaded from this file |

## C. REDUNDANT / DUPLICATE DECLARATIONS

| # | File | What | Fix |
|---|------|------|-----|
| 9 | `components/Icons/index.ts:41` | `MenuBook` (alias of `MenuBookIcon`) | Remove duplicate — `MenuBookIcon` used in routes, `MenuBook` in CategoryCard only. Keep one. |
| 10 | `components/Icons/index.ts:42` | `School` (alias of `SchoolIcon`) | Remove duplicate — `SchoolIcon` used elsewhere. |
| 11 | `index.css` | Two identical `@media (prefers-reduced-motion: reduce)` blocks | Remove second duplicate block |
| 12 | `data/site-config.json` | Overlaps with `site-content.json` (name, tagline, email, whatsapp) | Migrate unique keys into `site-content.json`, delete `site-config.json` |

## D. MASSIVE CODE DUPLICATION — Extract Shared Components

| # | Files | Issue | Strategy |
|---|-------|-------|----------|
| 13 | `routes/for-teachers.tgt-pgt.tsx` (234 lines) | ~80% identical code between both teacher pages | Extract shared: `TeacherBreadcrumbs`, `TeacherCardGrid`, `TeacherLeafView`, `BackButton` components. Both pages share: Breadcrumbs, Back button, folder/card navigation, iframe viewer + button pair, empty states, hover/active animation patterns, grid layouts. |
| 14 | `routes/for-teachers.circular-formats.tsx` (315 lines) | Same as above, but deeper (3-level vs 2-level) | Same extraction — depth variant handled via props |
| 15 | `routes/resources.secondary.tsx` (56 lines) | All 4 resource pages are 95% identical | Reduce to 1 generic `ResourcePage` route with `category` param, or extract shared wrapper. |
| 16 | `routes/resources.programs.tsx` (56 lines) | Same | |
| 17 | `routes/resources.admissions.tsx` (56 lines) | Same | |
| 18 | `routes/resources.formats.tsx` (56 lines) | Same | |

## E. HARDCODED VALUES — Extract to JSON Config

| # | Pattern | Occurrences | Target |
|---|---------|-------------|--------|
| 19 | `3px solid ${BORDER}` / `3px solid var(--color-border)` | ~50+ across 30+ files | Add to CSS vars or `config/styles.json` |
| 20 | `4px 4px 0px ${SHADOW}` / `5px 5px 0px ${SHADOW}` | ~30+ occurrences | `--shadow-card`, `--shadow-card-hover` CSS vars exist but not used consistently |
| 21 | `transform 0.12s ease, box-shadow 0.12s ease` | ~15 occurrences (buttons) | `--ease-out` exists but not used in button transitions |
| 22 | `transform 0.18s ease, box-shadow 0.18s ease` | ~20 occurrences (cards) | `--ease-bounce` exists but card hover uses hardcoded strings |
| 23 | `'#1A1A1A'` (hardcoded text color on colored bg) | ~10 occurrences | Replace with `COLOR_TEXT_LIGHT` (already imported in some) or CSS var |
| 24 | `'rgba(26, 26, 26, 0.75)'` / `'rgba(26,26,26,0.6)'` | ~8 occurrences | No constant exists — add to constants or CSS vars |
| 25 | `{ xs: '1fr', sm: '1fr 1fr' }` grid template | ~8 files | Redundant definition — could be a shared constant |
| 26 | `{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }` | ~4 files | Same |

## F. UNUSED IMPORTS — Clean Up

| # | File | Unused Import |
|---|------|---------------|
| 27 | `routes/for-teachers.tgt-pgt.tsx:1` | `useNavigate` — used, OK. Check `DownloadIcon` — used only as `startIcon` |
| 28 | `routes/for-teachers.circular-formats.tsx:6-7` | `DownloadIcon` `PictureAsPdfIcon` `ArrowForwardIcon` — check actual usage |
| 29 | `features/resources/ResourceListPage.tsx:5` | `useTheme` imported but only `_isDark` destructured and never used |
| 30 | Various files | `React` default import not needed with React 19 auto JSX runtime |

---

## IMPLEMENTATION ORDER

1. **Phase 1**: Delete dead code (A: #1-6) and unused data files (B: #7-8)  
2. **Phase 2**: Clean up duplicates (C: #9-12)  
3. **Phase 3**: Create shared teacher components to eliminate duplication (D: #13-14)  
4. **Phase 4**: Consolidate resource pages (D: #15-18)  
5. **Phase 5**: Create `config/styles.json` for hardcoded style values (E: #19-26)  
6. **Phase 6**: Clean unused imports (F: #27-30)  
7. **Phase 7**: Build verification  

> Note: Phase 3 (teacher pages) completed — ~80% duplication eliminated.
> Phase 4 (resource pages) deferred — each route has unique SEO/search validation, the rendering logic is already shared via `ResourceListPage`.
> Build verification: TypeScript ✅ | Vite ✅ | Bundle: 363KB→355KB (-8KB)
