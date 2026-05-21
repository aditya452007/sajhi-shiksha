# Neo-Brutalist Playful Redesign — Implementation Plan

> **Project:** Sajhi Shiksha — Educational Resource Platform
> **Design Direction:** Neo-Brutalist + Playful Hand-Drawn Aesthetic
> **Target:** Transform from generic corporate UI → bold, playful, student-loved experience
> **Date:** 2026-05-21

---

## 1. CURRENT STATE ANALYSIS

### 1.1 What Exists Today

The current website uses:
- **MUI v7** component library with standard rounded cards, soft shadows
- **Generic gradient hero** with radial gradients and purple/indigo palette
- **Standard AppBar** navigation with basic hamburger drawer
- **Conventional card layouts** with hover lift effects
- **TailwindCSS v4** imported but barely used (all styling via MUI `sx` prop)
- **Subtle animations** — scroll reveals, page transitions, chip toggles

**Problem:** It looks like every other SaaS landing page. Zero personality. No playfulness. Students won't feel excited to visit.

### 1.2 Dead Code Inventory (Safe to Remove)

| File / Export | Lines | Reason | Action |
|---|---|---|---|
| `App.css` | 184 | Vite template styles, never imported | DELETE file |
| `assets/vite.svg` | — | Unused asset | DELETE |
| `assets/react.svg` | — | Unused asset | DELETE |
| `assets/hero.png` | — | Unused asset | DELETE |
| `components/SearchBar/SearchModal.tsx` | 140 | Never imported anywhere | DELETE file |
| `useSnackbar` hook (in Snackbar.tsx) | ~10 | Exported but never called | REMOVE export + context |
| `cn()` utility (lib/utils.ts) | ~8 | Never imported | DELETE function |
| `debounce()` utility (lib/utils.ts) | ~12 | Never imported | DELETE function |
| `RESOURCE_TYPES` (lib/constants.ts) | 1 | Never imported | DELETE constant |
| `MAX_CONTENT_WIDTH` (lib/constants.ts) | 1 | Never imported | DELETE constant |
| `MOBILE_BREAKPOINT` (lib/constants.ts) | 1 | Never imported | DELETE constant |
| `TABLET_BREAKPOINT` (lib/constants.ts) | 1 | Never imported | DELETE constant |
| `HomePageData` interface (types/index.ts) | ~5 | Never used | DELETE interface |
| `ClassTab` interface (types/index.ts) | ~4 | Never used | DELETE interface |
| `SubjectInfo` interface (types/index.ts) | ~4 | Never used | DELETE interface |
| `ClassFilter` interface (types/index.ts) | ~4 | Never used | DELETE interface |
| `QuickLink` interface (types/index.ts) | ~4 | Never used (component defines own) | DELETE interface |
| `@tanstack/react-query` | dep | Never imported anywhere | REMOVE from package.json |
| `_searchQuery` state (HomePage.tsx:18) | 1 | Set but never read | REMOVE state + setter |
| `activeFilter` state (HomePage.tsx:19) | 1 | Set but never meaningfully used | REMOVE or wire up properly |
| `handleSearch` / `handleFilter` callbacks | 2 | Passed to HeroSection but state unused | REMOVE or implement real filtering |

### 1.3 Data Bugs to Fix

| Issue | File | Fix |
|---|---|---|
| Wrong routes: `/programs`, `/formats`, `/admissions` | `data/categories.json`, `data/navigation.json` | Prefix with `/resources/` |
| All `resourceCount` values are `0` | `data/categories.json` | Compute dynamically from `resources.json` at build time |

---

## 2. NEO-BRUTALIST DESIGN SYSTEM

### 2.1 What is Neo-Brutalism?

Neo-brutalism is a web design trend characterized by:
- **Thick black borders** (2-4px solid) on everything
- **Bold, contrasting colors** — no gradients, no subtlety
- **Hard shadows** — offset solid-color shadows (not blurred)
- **Raw, unpolished feel** — slightly imperfect, hand-crafted
- **Playful typography** — chunky, bold, sometimes quirky fonts
- **High contrast** — no muted grays, everything pops
- **Visible structure** — borders reveal the grid, not hide it

**Examples:** Gumroad, Figma's marketing pages, Linear's early site, PokePoké

### 2.2 Why Neo-Brutalism for Sajhi Shiksha?

1. **Students love it** — feels like a notebook, sketchbook, or comic book
2. **Stands out** — zero educational sites in India use this style
3. **Playful by default** — thick borders + bold colors = instant fun
4. **Accessible** — high contrast is built into the style
5. **Fast to render** — no complex gradients, no glassmorphism blur
6. **Matches "paper draw" aesthetic** — thick borders look like pen strokes

### 2.3 New Color Palette

#### Light Mode (Neo-Brutalist)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FFFDF7` | Warm white (slightly yellow, like paper) |
| `--color-border` | `#1A1A1A` | Near-black thick borders |
| `--color-shadow` | `#1A1A1A` | Hard shadow color |
| `--color-text` | `#1A1A1A` | Primary text |
| `--color-text-secondary` | `#4A4A4A` | Secondary text |
| `--color-yellow` | `#FFD600` | Primary accent, highlights |
| `--color-pink` | `#FF6B9D` | Secondary accent, CTAs |
| `--color-blue` | `#4ECDC4` | Tertiary accent, links |
| `--color-green` | `#95E45C` | Success, math subject |
| `--color-purple` | `#C084FC` | English subject |
| `--color-orange` | `#FF8C42` | Hindi subject, warnings |
| `--color-red` | `#FF6B6B` | Science subject, errors |
| `--color-teal` | `#4ECDC4` | Social Science subject |

#### Dark Mode (Neo-Brutalist)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#1A1A2E` | Deep navy |
| `--color-border` | `#FFFFFF` | White borders (inverted) |
| `--color-shadow` | `#000000` | Black hard shadows |
| `--color-text` | `#FFFFFF` | Primary text |
| `--color-yellow` | `#FFE066` | Primary accent |
| `--color-pink` | `#FF8FAB` | Secondary accent |
| `--color-blue` | `#7EDDD6` | Tertiary accent |

### 2.4 Typography

| Usage | Font | Weight | Style |
|---|---|---|---|
| Headings (H1-H3) | `Space Grotesk` | 700-800 | Chunky, geometric |
| Body | `Inter` | 400-500 | Clean, readable |
| Accent / Labels | `Space Mono` | 400 | Monospace for tags, chips |
| Playful / Hero | `Fredoka` | 600 | Rounded, friendly |

**Font sizes (brutalist = bigger):**
- H1: `3.5rem` mobile → `5rem` desktop (was 1.75rem → 3rem)
- H2: `2rem` mobile → `3rem` desktop
- H3: `1.5rem` mobile → `2rem` desktop
- Body: `1.125rem` (18px minimum, was 16px)

### 2.5 Border & Shadow System

| Element | Border | Shadow |
|---|---|---|
| Cards | `3px solid #1A1A1A` | `4px 4px 0px #1A1A1A` |
| Buttons | `3px solid #1A1A1A` | `3px 3px 0px #1A1A1A` |
| Inputs | `3px solid #1A1A1A` | None |
| Chips | `2px solid #1A1A1A` | `2px 2px 0px #1A1A1A` |
| Header | `0 3px 0 #1A1A1A` (bottom border only) | None |

**Hover state:** Shadow increases by 2px, element shifts -2px up:
```css
.card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #1A1A1A;
}
```

**Active/pressed state:** Shadow collapses, element shifts down:
```css
.card:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #1A1A1A;
}
```

### 2.6 Border Radius

| Element | Radius |
|---|---|
| Cards | `0px` (sharp corners) or `4px` |
| Buttons | `0px` (sharp) or `8px` |
| Chips | `9999px` (pill shape) |
| Inputs | `0px` (sharp) |
| Hero section | `0px` |

**Brutalist rule:** Most things are sharp. Only pills/badges are rounded.

---

## 3. PLAYFUL INTERACTIONS TO ADD

### 3.1 Hand-Drawn SVG Borders

Replace straight CSS borders with slightly wavy SVG borders that look like pen strokes:

```css
/* Using SVG filter for hand-drawn effect */
.brutalist-border {
  border: 3px solid #1A1A1A;
  filter: url(#hand-drawn);
}
```

SVG filter creates slight waviness (2-3px variance) on all borders.

### 3.2 Micro-interactions

| Interaction | Trigger | Effect |
|---|---|---|
| **Button press** | Click | Element shifts down 3px, shadow collapses (physical button feel) |
| **Card hover** | Mouse enter | Card lifts 4px, shadow grows, slight rotation (0.5deg) |
| **Category card** | Mouse enter | Card rotates slightly (-1deg to 1deg), border color changes to accent |
| **Search input focus** | Focus | Border thickens to 4px, yellow glow appears |
| **Chip toggle** | Click | Chip flips with 3D rotation, color changes |
| **Scroll reveal** | Element enters viewport | Element drops in from above with bounce (like a stamp) |
| **Page load** | Route change | Content slides in with stagger (each element 50ms delay) |
| **Theme toggle** | Click | Sun/moon icon spins 360deg, colors flash briefly |
| **Download button** | Click | Button shows checkmark, confetti burst (CSS-only) |
| **Navigation hover** | Mouse enter | Underline appears as thick black line that draws left-to-right |

### 3.3 Playful Elements

| Element | Description |
|---|---|
| **Doodle decorations** | Hand-drawn stars, arrows, squiggles between sections (SVG) |
| **Sticker badges** | "NEW", "POPULAR" badges that look like stickers (rotated slightly) |
| **Speech bubbles** | Tooltips and hints in comic-style speech bubbles |
| **Hand-drawn arrows** | Pointing to important elements (CTAs, search bar) |
| **Paper texture** | Subtle noise overlay on background (like real paper) |
| **Tape decorations** | "Tape" holding cards in place (CSS pseudo-elements) |
| **Stamp effects** | "APPROVED", "VERIFIED" stamps on contributor resources |

### 3.4 Animation Library

**Replace CSS-only animations with Framer Motion** for:
- Spring physics on all interactions
- Layout animations when filters change
- Staggered children animations
- Gesture-based interactions (drag, tap)
- Shared element transitions between pages

Install: `npm install framer-motion`

---

## 4. COMPONENT REDESIGN SPECIFICATIONS

### 4.1 Header → "Top Bar"

**Current:** Standard MUI AppBar with logo + nav buttons + theme toggle
**New:** Bold, chunky top bar with:

- **Logo:** "Sajhi Shiksha" in Space Grotesk 800, with a small doodle icon (book + pencil)
- **Nav links:** Underline-on-hover style, thick black text
- **Theme toggle:** Sun/moon icon in a pill-shaped button with hard shadow
- **Mobile:** Hamburger becomes a "MENU" button with thick border
- **Height:** 72px (was 64px)
- **Border:** 3px solid black bottom border only
- **Background:** `#FFFDF7` (warm paper white)

### 4.2 Hero Section → "Big Welcome"

**Current:** Gradient background, centered search bar, filter chips
**New:** Bold, asymmetric layout:

- **Left side (60%):** Massive heading "What do you want to learn today?" in Space Grotesk 800, 5rem
- **Right side (40%):** Illustration area with hand-drawn doodles (books, pencils, stars)
- **Search bar:** Full-width, thick 3px black border, sharp corners, yellow focus state
- **Filter chips:** Pill-shaped with hard shadows, bold colors (yellow, pink, blue, green)
- **Background:** Warm white with subtle paper texture
- **Decorations:** Hand-drawn arrows pointing to search bar, scattered stars

### 4.3 Category Cards → "Subject Boxes"

**Current:** MUI Card with icon, title, description, resource count, subtle hover
**New:** Chunky, colorful boxes:

- **Border:** 3px solid black
- **Shadow:** 4px 4px 0px black
- **Background:** Alternating bright colors (yellow, pink, blue, green, purple, orange)
- **Icon:** Large (48px), hand-drawn style SVG icons
- **Title:** Space Grotesk 700, 1.5rem
- **Hover:** Card rotates -1deg to 1deg, shadow grows to 6px 6px
- **Click:** Physical press effect (shadow collapses)
- **Layout:** Masonry-style, cards slightly rotated randomly (-2deg to 2deg)

### 4.4 Resource Cards → "Resource Stamps"

**Current:** MUI Card with type icon, title, chips, View/Download buttons
**New:** Stamp-style cards:

- **Border:** 3px solid black
- **Shadow:** 4px 4px 0px black
- **Background:** White
- **Type badge:** Colored pill at top-left (PDF = red, Document = blue, Link = green)
- **Title:** Space Grotesk 700, bold
- **Class/Subject chips:** Monospace font, thick borders
- **View button:** Yellow background, thick border, hard shadow
- **Download button:** Pink background, thick border, hard shadow
- **Hover:** Card lifts, slight rotation
- **Grid view:** 3 columns desktop, 2 tablet, 1 mobile

### 4.5 Footer → "Bottom Section"

**Current:** Standard footer with link columns, copyright
**New:** Bold, playful footer:

- **Background:** Yellow (`#FFD600`)
- **Border:** 3px solid black top border
- **Columns:** 4 columns with thick dividers
- **Links:** Underline-on-hover, bold text
- **Copyright:** "Made with ♥ by students, for students" in Space Mono
- **Decorations:** Hand-drawn doodles in corners

### 4.6 Iframe Viewer → "Document Window"

**Current:** MUI Card with loading skeleton, error state, retry button
**New:** Window-style viewer:

- **Frame:** Looks like a browser window with title bar
- **Title bar:** Gray background, 3 dots (red, yellow, green) like macOS
- **Border:** 3px solid black
- **Shadow:** 6px 6px 0px black
- **Loading:** Hand-drawn spinner animation
- **Error:** Comic-style "Oops!" message with doodle
- **Full-screen button:** Expands to fill viewport

### 4.7 Filter Bar → "Filter Panel"

**Current:** Dropdown selects + search input, responsive drawer on mobile
**New:** Bold filter panel:

- **Layout:** Horizontal row of filter buttons on desktop
- **Each filter:** Pill-shaped button with thick border, hard shadow
- **Active state:** Filled color, shadow collapses
- **Mobile:** Full-width drawer with large tap targets
- **Clear button:** Red "X" button to reset all filters
- **Results count:** "Showing 23 resources" in monospace font

### 4.8 Bottom Tab Bar (Mobile) → "Quick Nav"

**Current:** 5-tab bottom navigation with icons
**New:** Chunky mobile nav:

- **Height:** 72px (was 56px)
- **Border:** 3px solid black top border
- **Background:** White
- **Active tab:** Yellow background, thick border, hard shadow
- **Icons:** Larger (28px), hand-drawn style
- **Labels:** Space Mono, 12px
- **Safe area:** Respects iOS safe area inset

---

## 5. IMPLEMENTATION PHASES

### Phase 1: Foundation & Cleanup (Day 1-2)

**Goal:** Remove dead code, set up new design tokens, install dependencies

#### Tasks:

1. **Delete dead code files:**
   - `App.css`
   - `SearchModal.tsx`
   - `assets/vite.svg`, `assets/react.svg`, `assets/hero.png`

2. **Remove dead code from files:**
   - `lib/utils.ts`: Remove `cn()`, `debounce()`
   - `lib/constants.ts`: Remove `RESOURCE_TYPES`, `MAX_CONTENT_WIDTH`, `MOBILE_BREAKPOINT`, `TABLET_BREAKPOINT`
   - `types/index.ts`: Remove `HomePageData`, `ClassTab`, `SubjectInfo`, `ClassFilter`, `QuickLink`
   - `components/Snackbar/Snackbar.tsx`: Remove `useSnackbar` export and context
   - `features/home/HomePage.tsx`: Remove `_searchQuery`, `activeFilter`, `handleSearch`, `handleFilter` (or wire up properly)

3. **Remove unused dependency:**
   - `@tanstack/react-query` from package.json

4. **Fix data bugs:**
   - `data/categories.json`: Fix routes (`/programs` → `/resources/programs`, etc.)
   - `data/categories.json`: Compute `resourceCount` from `resources.json`
   - `data/navigation.json`: Fix routes

5. **Install new dependencies:**
   ```bash
   npm install framer-motion
   ```

6. **Add new fonts to `index.html`:**
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```

7. **Update `index.css` with new design tokens:**
   - Replace all color variables with neo-brutalist palette
   - Add new border/shadow variables
   - Add paper texture background
   - Add hand-drawn border filter CSS

8. **Update `config/theme.ts`:**
   - Replace light/dark palettes with neo-brutalist colors
   - Update typography to use Space Grotesk, Space Mono
   - Update component overrides (buttons, cards, chips)
   - Set border radius to 0 for most components

### Phase 2: Core Components Redesign (Day 3-4)

**Goal:** Redesign Header, Footer, Hero, Category Cards

#### Tasks:

1. **Redesign Header (`components/Header/Header.tsx`):**
   - Replace MUI AppBar with custom div
   - Use Space Grotesk 800 for logo
   - Add doodle icon (SVG)
   - Thick bottom border (3px solid black)
   - Nav links with underline-on-hover
   - Theme toggle in pill button
   - Mobile: "MENU" button with thick border

2. **Redesign Footer (`components/Footer/Footer.tsx`):**
   - Yellow background
   - Thick top border
   - 4-column layout with thick dividers
   - Hand-drawn doodle decorations
   - Space Mono for copyright text

3. **Redesign Hero Section (`features/home/components/HeroSection.tsx`):**
   - Asymmetric layout (60/40 split)
   - Massive heading in Space Grotesk 800
   - Search bar with thick border, sharp corners
   - Filter chips with hard shadows
   - Hand-drawn doodle decorations (SVG)
   - Paper texture background

4. **Redesign Category Cards (`components/CategoryCard/CategoryCard.tsx`):**
   - Thick borders, hard shadows
   - Alternating bright background colors
   - Large hand-drawn style icons
   - Random rotation on each card (-2deg to 2deg)
   - Hover: rotation + shadow growth
   - Click: physical press effect

5. **Redesign Category Grid (`features/home/components/CategoryGrid.tsx`):**
   - Masonry-style layout
   - Cards slightly rotated randomly
   - Responsive: 3 cols desktop, 2 tablet, 1 mobile

### Phase 3: Feature Components Redesign (Day 5-6)

**Goal:** Redesign Resource Cards, Filter Bar, Iframe Viewer, Search

#### Tasks:

1. **Redesign Resource Cards (`components/ResourceCard/ResourceCard.tsx`):**
   - Thick borders, hard shadows
   - Type badges as colored pills
   - Monospace font for chips
   - View/Download buttons with neo-brutalist style
   - Hover: lift + rotation
   - Grid/list view support

2. **Redesign Filter Bar (`components/FilterBar/FilterBar.tsx`):**
   - Horizontal filter buttons on desktop
   - Pill-shaped buttons with hard shadows
   - Active state: filled color
   - Mobile: full-width drawer
   - Clear button in red
   - Results count in monospace

3. **Redesign Iframe Viewer (`components/IframeViewer/IframeViewer.tsx`):**
   - Browser window frame with title bar
   - macOS-style 3 dots
   - Thick borders, hard shadows
   - Hand-drawn loading spinner
   - Comic-style error state

4. **Redesign Search Components (`components/SearchBar/SearchInput.tsx`):**
   - Thick border search input
   - Yellow focus state
   - Hand-drawn search icon
   - Recent searches in stamp-style cards

5. **Redesign Scroll Reveal (`components/ScrollReveal/ScrollReveal.tsx`):**
   - Use Framer Motion for drop-in animation with bounce
   - Stagger children animations

6. **Redesign Page Transition (`components/PageTransition/PageTransition.tsx`):**
   - Use Framer Motion for page transitions
   - Staggered entrance for page elements

### Phase 4: Feature Pages Redesign (Day 7-8)

**Goal:** Redesign all feature pages with new design system

#### Tasks:

1. **HomePage (`features/home/HomePage.tsx`):**
   - Wire up search/filter functionality properly
   - Add playful section dividers (hand-drawn squiggles)
   - Add doodle decorations between sections

2. **ClassSpotlight (`features/home/components/ClassSpotlight.tsx`):**
   - Tabbed interface with thick-bordered tabs
   - Active tab: filled color, hard shadow
   - Subject cards with alternating colors

3. **SecondaryClassSpotlight (`features/home/components/SecondaryClassSpotlight.tsx`):**
   - Filterable list with stamp-style cards
   - Monospace font for class labels

4. **QuickLinks (`features/home/components/QuickLinks.tsx`):**
   - Link cards with thick borders
   - Hover: underline draws left-to-right

5. **ContributeCTA (`features/home/components/ContributeCTA.tsx`):**
   - Bold banner with thick border
   - Hand-drawn arrow pointing to CTA button
   - Yellow background

6. **ResourceListPage (`features/resources/components/ResourceListPage.tsx`):**
   - Grid/list toggle with thick-bordered buttons
   - Filter bar integration
   - Results count display

7. **SearchPage (`features/search/components/SearchPage.tsx`):**
   - Full-page search experience
   - Recent searches in stamp-style cards
   - Search results with neo-brutalist cards

8. **ResourceViewPage (`features/viewer/components/ResourceViewPage.tsx`):**
   - Document viewer with browser window frame
   - Metadata in thick-bordered info cards
   - Download/share buttons with neo-brutalist style

9. **ContributePage (`features/contribute/components/ContributePage.tsx`):**
   - Step-by-step guide with numbered badges
   - Thick-bordered info cards
   - Contributor list with avatar stamps

10. **AboutPage (`features/about/components/AboutPage.tsx`):**
    - Mission statement in large typography
    - Team member cards with thick borders
    - Contact info in stamp-style cards

### Phase 5: Polish & Playfulness (Day 9-10)

**Goal:** Add micro-interactions, doodles, animations, final polish

#### Tasks:

1. **Add hand-drawn SVG doodles:**
   - Create SVG components for: stars, arrows, squiggles, books, pencils
   - Place strategically throughout the site
   - Use as section dividers, decorations, accents

2. **Add paper texture:**
   - Subtle noise overlay on background
   - CSS `background-image` with SVG noise pattern
   - Opacity 0.03 (barely visible)

3. **Add sticker badges:**
   - "NEW", "POPULAR" badges for resources
   - Slight rotation (-5deg to 5deg)
   - Thick border, hard shadow

4. **Add speech bubble tooltips:**
   - Replace MUI Tooltip with custom speech bubble
   - Thick border, tail pointer
   - Comic-style font

5. **Add confetti animation:**
   - CSS-only confetti burst on download button click
   - Small colored squares that fall and fade

6. **Add theme toggle animation:**
   - Sun/moon icon spins 360deg
   - Brief color flash during transition

7. **Add cursor effects:**
   - Custom cursor (optional, desktop only)
   - Hover states on interactive elements

8. **Test accessibility:**
   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader support
   - Reduced motion support

9. **Test responsiveness:**
   - Mobile (320px - 768px)
   - Tablet (768px - 1024px)
   - Desktop (1024px+)

10. **Performance audit:**
    - Lighthouse score 90+
    - Bundle size check
    - Image optimization
    - Font loading optimization

---

## 6. FILE CHANGES SUMMARY

### Files to DELETE
```
frontend/src/App.css
frontend/src/assets/vite.svg
frontend/src/assets/react.svg
frontend/src/assets/hero.png
frontend/src/components/SearchBar/SearchModal.tsx
```

### Files to MODIFY (major redesign)
```
frontend/src/index.css                    → New design tokens, brutalist styles
frontend/src/config/theme.ts              → Neo-brutalist palette, typography
frontend/src/components/Header/Header.tsx → Complete redesign
frontend/src/components/Footer/Footer.tsx → Complete redesign
frontend/src/components/ResourceCard/ResourceCard.tsx → Complete redesign
frontend/src/components/CategoryCard/CategoryCard.tsx → Complete redesign
frontend/src/components/FilterBar/FilterBar.tsx → Complete redesign
frontend/src/components/IframeViewer/IframeViewer.tsx → Complete redesign
frontend/src/components/SearchBar/SearchInput.tsx → Complete redesign
frontend/src/components/ScrollReveal/ScrollReveal.tsx → Framer Motion
frontend/src/components/PageTransition/PageTransition.tsx → Framer Motion
frontend/src/features/home/HomePage.tsx   → Wire up search/filter, add doodles
frontend/src/features/home/components/HeroSection.tsx → Complete redesign
frontend/src/features/home/components/CategoryGrid.tsx → Masonry layout
frontend/src/features/home/components/ClassSpotlight.tsx → Thick-bordered tabs
frontend/src/features/home/components/SecondaryClassSpotlight.tsx → Stamp cards
frontend/src/features/home/components/QuickLinks.tsx → Underline animations
frontend/src/features/home/components/ContributeCTA.tsx → Bold banner
frontend/src/features/resources/components/ResourceListPage.tsx → Neo-brutalist
frontend/src/features/search/components/SearchPage.tsx → Neo-brutalist
frontend/src/features/viewer/components/ResourceViewPage.tsx → Browser window
frontend/src/features/contribute/components/ContributePage.tsx → Step badges
frontend/src/features/about/components/AboutPage.tsx → Stamp cards
```

### Files to MODIFY (minor cleanup)
```
frontend/src/lib/utils.ts                 → Remove cn(), debounce()
frontend/src/lib/constants.ts             → Remove unused constants
frontend/src/types/index.ts               → Remove unused interfaces
frontend/src/components/Snackbar/Snackbar.tsx → Remove useSnackbar export
frontend/src/data/categories.json         → Fix routes, compute resourceCount
frontend/src/data/navigation.json         → Fix routes
frontend/package.json                     → Remove @tanstack/react-query, add framer-motion
frontend/index.html                       → Add new Google Fonts
```

### Files to CREATE (new)
```
frontend/src/components/Doodles/Star.tsx          → SVG star doodle
frontend/src/components/Doodles/Arrow.tsx         → SVG arrow doodle
frontend/src/components/Doodles/Squiggle.tsx      → SVG squiggle divider
frontend/src/components/Doodles/Book.tsx          → SVG book doodle
frontend/src/components/Doodles/Pencil.tsx        → SVG pencil doodle
frontend/src/components/StickerBadge/StickerBadge.tsx → Sticker badge component
frontend/src/components/SpeechBubble/SpeechBubble.tsx → Tooltip component
frontend/src/components/Confetti/Confetti.tsx     → Confetti animation
frontend/src/components/PaperTexture/PaperTexture.tsx → Paper texture overlay
frontend/src/lib/handDrawnFilter.ts               → SVG filter for hand-drawn borders
```

---

## 7. AI AGENT EXECUTION NOTES

### How to Execute This Plan

1. **Follow phases in order** — each phase builds on the previous
2. **Run lint/typecheck after each file change** — catch errors early
3. **Test in browser after each component redesign** — visual feedback is critical
4. **Keep the old design tokens as comments** — for reference during transition
5. **Use Framer Motion for ALL animations** — don't mix CSS and Framer Motion
6. **Test accessibility after Phase 5** — brutalist design can break WCAG if not careful

### Key Principles During Implementation

- **Thick borders everywhere** — 3px solid black is the default
- **Hard shadows, never blurred** — `4px 4px 0px #1A1A1A` is the default
- **Sharp corners** — border-radius 0 except for pills/badges
- **Bold colors** — no gradients, no muted tones
- **Big typography** — Space Grotesk 800 for headings, 18px minimum body
- **Playful but functional** — doodles decorate, they don't distract
- **High contrast** — brutalism is inherently accessible if done right

### Testing Checklist

- [ ] All dead code removed
- [ ] All data bugs fixed
- [ ] New fonts loaded and working
- [ ] Design tokens applied globally
- [ ] Header redesigned and responsive
- [ ] Footer redesigned and responsive
- [ ] Hero section redesigned
- [ ] Category cards redesigned with random rotation
- [ ] Resource cards redesigned
- [ ] Filter bar redesigned
- [ ] Iframe viewer redesigned
- [ ] Search page redesigned
- [ ] All feature pages redesigned
- [ ] Doodles added strategically
- [ ] Paper texture applied
- [ ] Sticker badges working
- [ ] Confetti animation working
- [ ] Theme toggle animation working
- [ ] Framer Motion animations smooth
- [ ] Reduced motion respected
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Lighthouse 90+ on all metrics
- [ ] Mobile (320px) tested
- [ ] Tablet (768px) tested
- [ ] Desktop (1440px) tested
- [ ] Dark mode tested
- [ ] Light mode tested

---

## 8. ESTIMATED EFFORT

| Phase | Tasks | Estimated Time |
|---|---|---|
| Phase 1: Foundation & Cleanup | 8 tasks | 4-6 hours |
| Phase 2: Core Components | 5 tasks | 6-8 hours |
| Phase 3: Feature Components | 6 tasks | 6-8 hours |
| Phase 4: Feature Pages | 10 tasks | 8-10 hours |
| Phase 5: Polish & Playfulness | 10 tasks | 6-8 hours |
| **Total** | **39 tasks** | **30-40 hours** |

---

## 9. SUCCESS CRITERIA

The redesign is successful when:

1. **Visual:** The site looks bold, playful, and unlike any other educational site
2. **Functional:** All existing features work exactly as before
3. **Accessible:** WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly
4. **Performant:** Lighthouse 90+ across all metrics
5. **Responsive:** Works beautifully on 320px mobile to 1440px desktop
6. **Delightful:** Students smile when they visit, teachers recommend it
7. **Maintainable:** Clean code, no dead code, well-organized components

---

*This document is the single source of truth for the neo-brutalist redesign. All AI agents should follow this plan exactly. If questions arise, refer to the design specifications in Section 2 and component specifications in Section 4.*
