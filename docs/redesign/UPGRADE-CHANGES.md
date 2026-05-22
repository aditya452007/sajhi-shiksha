# Upgrade Changes — Phase: Homepage Restructure & CMS Migration

## Overview

Major frontend restructure replacing hardcoded section-based homepage with a 3-doorway system (Students / Teachers / Math Lovers), removing all Classes 1-5 content, and migrating all editable strings to a single JSON config file.

---

## What Gets Removed

### 1. Classes 1-5 — Complete Removal

| Item | File(s) | Action |
|------|---------|--------|
| `ClassSpotlight` component | `features/home/components/ClassSpotlight.tsx` | Delete entire file |
| Primary class tabs in HomePage | `features/home/HomePage.tsx` | Remove `<ClassSpotlight>` and its ScrollReveal wrapper |
| "Classes 1-5" nav item | `navigation.json` | Remove from header and footer |
| "Classes 1-5" category | `categories.json` | Remove entire entry |
| All resources with category `"classes-1-5"` | `resources.json` | Remove 14 entries (class-1-maths through class-5-social-science) |
| `SUBJECTS_PRIMARY` constant | `lib/constants.ts` | Remove (no longer needed) |
| `CLASS_RANGES.primary` | `lib/constants.ts` | Remove |
| `FILTER_CHIPS` "Classes 1-5" entry | `lib/constants.ts` | Remove chip |
| `/resources/primary` route | `routes/resources.primary.tsx` | Delete entire route file |
| `resources.primary` from route tree | `router.ts` / `routes/` | Remove from route tree generation |
| Primary resources from navigation | `data/navigation.json` | Remove "Classes 1-5" links |
| "resources" → "primary" link from categories | `data/categories.json` | Remove |

### 2. Professor Names — Contact Section Removal

| Item | File(s) | Action |
|------|---------|--------|
| Contributor cards on About page | `features/about/components/AboutPage.tsx` | Hide/remove "Behind Sajhi Shiksha" section when `showProfessorNames` = `false` |
| Contributors data reference | `features/about/components/AboutPage.tsx` | Wrap in conditional check from `site-content.json` |
| `contributors.json` | `data/contributors.json` | Mark as deprecated; data lives in `site-content.json` now |

The `showProfessorNames: false` flag in `site-content.json` will:
- Hide the "Behind Sajhi Shiksha" section entirely
- Keep the mission statement and contact email visible
- Keep "Get In Touch" section visible

---

## What Gets Added

### 3. New JSON Config File

| Item | Location |
|------|----------|
| `site-content.json` | `frontend/src/data/site-content.json` |
| TypeScript interface | `frontend/src/types/index.ts` — add `SiteContent` interface |
| Import in App root | Replace individual JSON imports with single site-content import |

### 4. New Homepage Structure

| Section | Component | Description |
|---------|-----------|-------------|
| Hero (unchanged) | `HeroSection.tsx` | Keep existing — same search, doodles, animations |
| 3 Doorway Cards | NEW component: `DoorwayCards.tsx` | 3 large neo-brutalist cards: Students, Teachers, Math Lovers |
| QuickLinks (modified) | `QuickLinks.tsx` | Keep but update links (remove 1-5 references) |
| Contribute CTA (unchanged) | `ContributeCTA.tsx` | Keep as-is |

#### New `DoorwayCards.tsx` Component

- Location: `features/home/components/DoorwayCards.tsx`
- Reads from `site-content.json` → `sections` object
- Each card:
  - Large button/card with thick border (3px) + hard shadow (5px)
  - Icon in white bordered box
  - Title (Space Grotesk 800, ~1.75rem)
  - Subtitle (Space Mono, ~0.85rem)
  - Background color from config
  - Links to `redirectRoute` from config
  - Random slight rotation (-1deg to 1deg)
  - Framer Motion hover lift + tap press
  - Staggered spring entrance animation

### 5. New Routes

| Route | Component | Behavior |
|-------|-----------|----------|
| `/for-students` | `routes/for-students.tsx` | Search page pre-filtered: class=6-12, subject=Mathematics |
| `/for-teachers` | `routes/for-teachers.tsx` | Search page pre-filtered: categories=programs,formats,admissions |
| `/for-math-lovers` | `routes/for-math-lovers.tsx` | Block feed page showing Google Doc iframes |

#### `/for-math-lovers` Page (`features/mathLovers/MathLoversPage.tsx`)

New feature folder: `features/mathLovers/`

```
features/mathLovers/
  MathLoversPage.tsx      — Main page with block feed
  components/
    ContentBlock.tsx       — Single iframe block component
```

- Scrollable feed of `ContentBlock` components
- Each block reads from `site-content.json` → `sections.mathLovers.blocks[]`
- Each block shows:
  - Title heading (Space Grotesk 800)
  - Description (body text)
  - Google Doc iframe embedded via `IframeViewer` (reuse existing component)
  - Last updated date (Space Mono)
- Add/remove blocks simply by editing the JSON array

### 6. WhatsApp Toggle Button

New component: `components/WhatsAppButton/WhatsAppButton.tsx`

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| Position | Fixed bottom-right (24px from edges) | First icon on BottomTabBar |
| Size | 56×56px circle | 40×40px circle |
| Visibility | Always visible | Always visible |
| Link | `site-content.json` → `site.whatsappGroupUrl` | Same |
| Behavior | Opens in new tab | Opens WhatsApp app via deep link |

- Conditionally renders: hidden if `whatsappGroupUrl` is empty
- Neo-brutalist styling: thick border, hard shadow, green background
- Subtle pulse animation every 5 seconds (desktop only)
- React.memo optimized

### 7. Updated Navigation

Header (desktop):
```
Home | Students | Teachers | Math Lovers | Contribute | About
```

Footer:
```
For Students: [6-12 Maths]
For Teachers: [Programs] [Formats & Rules] [Admissions]
More: [About Us] [Contribute]
```

Bottom Tab Bar (mobile):
```
[🏠 Home] [🏫 Students] [🍎 Teachers] [♥ Math] [≡ Menu]
                                                  (drawer)
```

---

## Updated Constants (`lib/constants.ts`)

```typescript
// REMOVE:
export const SUBJECTS_PRIMARY = [...];          // No longer needed
// CLASS_RANGES.primary                         // No longer needed

// UPDATE:
export const FILTER_CHIPS = [
    { label: 'All', value: 'all' },
    { label: 'Classes 6-12', value: 'secondary' },
    { label: 'Formats', value: 'formats' },
    { label: 'Rules', value: 'rules' },
];  // Removed 'Classes 1-5'
```

---

## Updated Resources (`data/resources.json`)

Remove all 14 entries where `"category": "classes-1-5"`:

- class-1-maths through class-5-social-science (14 resources)
- Keep all programs, formats, admissions, and classes-6-12 resources

Also: Update the `classes-6-12` resources to filter to **Mathematics only** for the student path. Non-Mathematics subjects (Hindi, Science, Social Science, Sanskrit, Physics, Biology, CS/IP, Accountancy) can remain in the system but will only surface through search or `/for-teachers`, not `/for-students`.

---

## Updated Categories (`data/categories.json`)

Remove the `primary` entry. Result:

```json
[
    { "id": "secondary", "title": "Classes 6-12", ... },
    { "id": "programs", "title": "Programs", ... },
    { "id": "formats", "title": "Formats & Rules", ... },
    { "id": "admissions", "title": "Admissions", ... },
    { "id": "contribute", "title": "Contribute", ... },
    { "id": "about", "title": "About Us", ... }
]
```

---

## Updated Navigation (`data/navigation.json`)

- Remove "Classes 1-5" from `navItems`
- Remove "Classes 1-5" from `footerLinks.quickLinks`
- The navigation will be driven by `site-content.json` instead

---

## Updated About Page (`features/about/components/AboutPage.tsx`)

```diff
- Read contributors from contributors.json
+ Read showProfessorNames from site-content.json
+ Conditionally render "Behind Sajhi Shiksha" section
+ Conditionally show/hide contributor cards
```

---

## Files to Create

| File | Description |
|------|-------------|
| `data/site-content.json` | Central config file |
| `types/index.ts` — SiteContent interface | Type for site-content.json |
| `features/home/components/DoorwayCards.tsx` | 3 large neo-brutalist cards |
| `features/mathLovers/MathLoversPage.tsx` | Block feed page |
| `features/mathLovers/components/ContentBlock.tsx` | Single iframe block |
| `components/WhatsAppButton/WhatsAppButton.tsx` | Floating WhatsApp toggle |
| `routes/for-students.tsx` | Student resource page route |
| `routes/for-teachers.tsx` | Teacher resource page route |
| `routes/for-math-lovers.tsx` | Math lovers page route |

---

## Files to Delete

| File | Reason |
|------|--------|
| `features/home/components/ClassSpotlight.tsx` | Classes 1-5 removed |
| `routes/resources.primary.tsx` | Classes 1-5 route removed |
| `data/contributors.json` (optional) | Merged into site-content.json |

---

## Files to Modify

| File | Changes |
|------|---------|
| `features/home/HomePage.tsx` | Remove ClassSpotlight, add DoorwayCards |
| `lib/constants.ts` | Remove SUBJECTS_PRIMARY, update FILTER_CHIPS |
| `data/resources.json` | Remove 14 classes-1-5 entries |
| `data/categories.json` | Remove primary entry |
| `data/navigation.json` | Remove 1-5 links, update structure |
| `features/about/components/AboutPage.tsx` | Conditional professor names |
| `routes/__root.tsx` | Add WhatsAppButton, update nav links |
| `components/BottomTabBar/BottomTabBar.tsx` | Add WhatsApp icon, update tabs |
| `components/Header/Header.tsx` | Update nav links from config |
| `components/Footer/Footer.tsx` | Update footer links from config |
| `types/index.ts` | Add SiteContent interface |
| `router.ts` | Add 3 new routes |
| `context/progress-tracker.md` | Update after implementation |

---

## Implementation Order

| Phase | Tasks |
|-------|-------|
| **1. Config Migration** | Create site-content.json, SiteContent type, update imports |
| **2. Content Cleanup** | Remove classes-1-5 resources, categories, navigation entries |
| **3. Delete old components** | Delete ClassSpotlight, primary route, update HomePage |
| **4. Build DoorwayCards** | New 3-card component with neo-brutalist styling |
| **5. Build new routes** | /for-students, /for-teachers, /for-math-lovers |
| **6. Math Lovers page** | ContentBlock component, block feed |
| **7. WhatsApp toggle** | WhatsAppButton component, desktop + mobile placement |
| **8. Navigation update** | Header, Footer, BottomTabBar updated from config |
| **9. About page** | Conditional professor names from config |
| **10. Verification** | Build passes, all routes work, no dead code |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Removing classes-1-5 resources breaks search | Medium | Resources are removed from data, search will naturally exclude them |
| Professor edits JSON incorrectly | Medium | Add validation guide in CMS-CONFIG-SCHEMA.md; handle missing fields gracefully |
| `/for-students` shows no results if no math resources have correct filters | Low | Ensure resources.json has math entries with class 6-12 and subject "Mathematics" |
| Math Lovers blocks empty if no drive URLs configured | Low | Show empty state: "No content yet — check back soon!" |
| WhatsApp button shows but link is empty | Low | Conditionally hide if `whatsappGroupUrl` is empty string |
