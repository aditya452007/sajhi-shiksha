# Feature Spec — Homepage Design

## Overview

The homepage is the entry point for all users. It must be welcoming, intuitive, and guide students/teachers to resources within 1-2 clicks. Playfulness level 5: friendly colors, subtle animations, clear hierarchy.

## Page Structure

```
┌──────────────────────────────────────────┐
│              Header/AppBar                │
│  Logo | Nav (desktop) | Search | Theme   │
├──────────────────────────────────────────┤
│                                          │
│          HERO SECTION                     │
│  "What are you looking for?"              │
│  Prominent Search Bar + Filter Chips      │
│  Subtle animated background pattern       │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│       QUICK ACCESS CATEGORIES             │
│  6-7 category cards in responsive grid    │
│  Icon + Title + Resource count            │
│  Hover: subtle lift + color accent        │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│       CLASSES 1-5 SPOTLIGHT               │
│  "Resources for Primary Classes"          │
│  Tabbed interface: Class 1 | 2 | 3 | 4 | 5│
│  Each tab shows subject cards             │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│       CLASSES 6-12 SPOTLIGHT              │
│  "Resources for Secondary Classes"        │
│  Filter chips: Class 6-8 | 9-10 | 11-12  │
│  Resource cards with download links       │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│       FORMATS & RULES                     │
│  Quick links to most-used formats         │
│  Assembly formats, GOI/KVS rules, etc.    │
│  List view with icons                     │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│       CONTRIBUTE CTA                      │
│  "Share Your Knowledge"                   │
│  Brief description + email link           │
│  Warm accent color background             │
│                                          │
├──────────────────────────────────────────┤
│              Footer                       │
│  Quick Links | About | Contact | Social   │
└──────────────────────────────────────────┘
```

## Sections Detail

### 1. Hero Section

**Purpose:** Immediate orientation + search entry point

**Content:**
- Heading: "What are you looking for?" (Nunito, bold, responsive size)
- Subheading: "Free study materials, question papers, and resources for KVS students"
- Prominent search bar (full-width on mobile, 60% on desktop)
- Filter chips below search: All | Classes 1-5 | Classes 6-12 | Formats | Rules
- Subtle animated background: soft gradient or geometric pattern (CSS only)

**Interactions:**
- Search bar: focus → expands slightly, shows recent/popular searches
- Filter chips: click → filters visible categories below
- On scroll: hero section fades slightly (parallax-lite, CSS)

**Mobile:**
- Search bar full-width
- Filter chips horizontally scrollable
- Heading size reduced

### 2. Quick Access Categories

**Purpose:** Visual navigation to main content sections

**Categories (6-7 cards):**

| Card | Icon | Description |
|------|------|-------------|
| Classes 1-5 | `MenuBook` | Primary class study materials |
| Classes 6-12 | `School` | Question papers and resources |
| Programs | `LocalLibrary` | Nipun/FLN, CMP, TBP, Cub & Bulbul |
| Formats & Rules | `Gavel` | Assembly formats, GOI/KVS rules |
| Admissions | `Assignment` | CBSE/NIOS, KVS admission info |
| Contribute | `VolunteerActivism` | Share your resources |
| About Us | `Info` | About Sajhi Shiksha |

**Card Design:**
- White background, rounded corners (12px), subtle shadow
- Icon (32px, subject-colored) at top
- Title (Nunito, bold, 18px)
- Resource count (muted text, 14px)
- Hover: lift 4px, shadow deepens, icon scales 1.1x
- Click: navigate to section page

**Grid Layout:**
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns (last row centered if odd)

### 3. Classes 1-5 Spotlight

**Purpose:** Quick access to primary class resources

**Design:**
- Section heading: "Resources for Primary Classes"
- Tab bar: Class 1 | Class 2 | Class 3 | Class 4 | Class 5
- Active tab: colored underline + bold text
- Content area: subject cards for selected class
- Each subject card: icon + subject name + resource count
- "View All" button at bottom → navigates to full class page

**Subjects per class:**
- Mathematics, English, Hindi, EVS, General

**Mobile:**
- Tabs horizontally scrollable
- Subject cards in 2-column grid

### 4. Classes 6-12 Spotlight

**Purpose:** Access to secondary class question papers and resources

**Design:**
- Section heading: "Resources for Secondary Classes"
- Filter chips: Class 6-8 | Class 9-10 | Class 11-12
- Resource cards in list view (more compact than category cards)
- Each card: title, class badge, subject badge, download icon
- "View All" button → navigates to full resources page

**Mobile:**
- Single column list
- Chips horizontally scrollable

### 5. Formats & Rules Quick Links

**Purpose:** Fast access to most-used administrative resources

**Design:**
- Section heading: "Quick Links"
- List format with icons
- Items:
  - Morning Assembly Formats
  - GOI/KVS Rules
  - Office Formats
  - Time Table Templates
  - Income Tax Guide
- Each item: icon + title + chevron-right
- Hover: background highlight, chevron animates right

### 6. Contribute CTA

**Purpose:** Encourage resource sharing

**Design:**
- Full-width banner with warm accent background
- Heading: "Share Your Knowledge"
- Description: "Have study materials or resources to share? Email us and help fellow teachers and students."
- Button: "Email Us" → opens mailto link
- Icon: `VolunteerActivism` (large, decorative)

**Mobile:**
- Stacked layout, centered text
- Full-width button

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| `HomePage` | Feature entry | `features/home/components/HomePage.tsx` |
| `HeroSection` | Section | `features/home/components/HeroSection.tsx` |
| `CategoryGrid` | Section | `features/home/components/CategoryGrid.tsx` |
| `CategoryCard` | Reusable | `components/CategoryCard/CategoryCard.tsx` |
| `ClassSpotlight` | Section | `features/home/components/ClassSpotlight.tsx` |
| `QuickLinks` | Section | `features/home/components/QuickLinks.tsx` |
| `ContributeCTA` | Section | `features/home/components/ContributeCTA.tsx` |

## Data Requirements

```typescript
interface HomePageData {
  hero: {
    title: string;
    subtitle: string;
  };
  categories: CategoryCard[];
  primaryClasses: {
    title: string;
    tabs: ClassTab[];
  };
  secondaryClasses: {
    title: string;
    filters: ClassFilter[];
  };
  quickLinks: QuickLink[];
  contributeCta: {
    title: string;
    description: string;
    email: string;
  };
}
```

## Performance Considerations

- All sections lazy-loaded below the fold
- Hero section is above the fold — must render immediately
- Category cards use `React.memo` to prevent re-renders
- No heavy images — icons only (SVG, inline or sprite)
- CSS animations only (no JS animation library for homepage)

## Accessibility

- All cards are keyboard navigable (tab index, focus visible)
- Icons have aria-labels
- Search bar has visible label (sr-only if visually hidden)
- Color contrast meets WCAG AA
- Reduced motion: disable parallax and hover animations
