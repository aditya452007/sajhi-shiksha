# Feature Spec — Responsive Breakpoints and Mobile Design

## Overview

Mobile-first responsive design. The site must work seamlessly on phones (320px+), tablets (768px+), and desktops (1024px+). Students primarily use mobile devices.

## Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|---------------|
| xs | 0px - 599px | Mobile phones |
| sm | 600px - 899px | Large phones, small tablets |
| md | 900px - 1199px | Tablets, small laptops |
| lg | 1200px - 1535px | Laptops, desktops |
| xl | 1536px+ | Large desktops, monitors |

## Mobile-First Principles

1. **Design for mobile first** — start with 320px width, scale up
2. **Touch-friendly** — all interactive elements are at least 44x44px
3. **Readable text** — minimum 16px body text, no horizontal scroll
4. **Fast loading** — minimal assets, lazy loading for below-fold content
5. **Simple navigation** — hamburger + bottom tab bar

## Layout Adaptations by Breakpoint

### Mobile (xs: 0-599px)

**Header:**
- Hamburger menu (left) + Logo (center) + Search + Theme (right)
- Height: 56px

**Navigation:**
- Hamburger drawer (full-height overlay)
- Bottom tab bar (4-5 tabs, fixed bottom)

**Content:**
- Single column layout
- Full-width cards
- Padding: 16px
- Font sizes: H1=28px, H2=24px, H3=20px, Body=16px

**Homepage:**
- Hero: stacked layout, full-width search
- Categories: 2-column grid
- Class spotlight: scrollable tabs
- Resource cards: single column list

**Resource Pages:**
- Filter bar: collapsed into "Filters" button
- Filter panel: slide-up from bottom
- Resource cards: single column
- Iframe viewer: 60vh height, full width

**Search:**
- Full-screen search modal
- Recent searches + popular chips
- Results in single column list

### Tablet (sm-md: 600-1199px)

**Header:**
- Same as mobile (hamburger + logo + search + theme)
- Height: 64px

**Navigation:**
- Same as mobile (hamburger drawer + bottom tab bar)
- Bottom tab bar may show 4 tabs instead of 5

**Content:**
- Two-column grid where appropriate
- Padding: 24px
- Font sizes: H1=36px, H2=30px, H3=24px, Body=16px

**Homepage:**
- Categories: 3-column grid
- Resource cards: 2-column grid
- Iframe viewer: 70vh height, max-width 800px

### Desktop (lg+: 1200px+)

**Header:**
- Full navigation with mega-menu
- Logo (left) + Nav items + Search + Theme + Contribute button (right)
- Height: 72px

**Navigation:**
- Mega-menu on hover
- No bottom tab bar
- Breadcrumbs visible

**Content:**
- Multi-column layouts
- Padding: 32px
- Max content width: 1200px (centered)
- Font sizes: H1=48px, H2=36px, H3=28px, Body=16px

**Homepage:**
- Categories: 4-column grid
- Resource cards: 3-column grid
- Iframe viewer: 70vh height, max-width 900px

**Resource Pages:**
- Filter bar: horizontal row of dropdowns
- Resource cards: 3-column grid
- List view toggle available

## Touch Targets

All interactive elements must be at least 44x44px:

| Element | Minimum Size |
|---------|-------------|
| Buttons | 44x44px |
| Icon buttons | 44x44px |
| Tab bar items | 44x44px + label |
| Cards (clickable) | Full card area |
| Links | 44x44px hit area |
| Form inputs | 44px height minimum |

## Safe Areas

For notched phones (iPhone, modern Android):

```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

- Bottom tab bar accounts for safe area
- Footer padding accounts for safe area

## Orientation

- **Portrait:** Default layout
- **Landscape (mobile):** Same layout, no special handling needed
- iframe viewer adjusts height based on orientation

## Performance on Mobile

- Images: none (icons only, SVG)
- Animations: CSS only, GPU-accelerated
- Lazy loading for below-fold content
- No heavy JavaScript on initial load
- Bundle split by route

## Testing Checklist

- [ ] Works on 320px width (iPhone SE)
- [ ] Works on 375px width (iPhone 12/13)
- [ ] Works on 414px width (iPhone Pro Max)
- [ ] Works on 768px width (iPad)
- [ ] Works on 1024px width (iPad Pro)
- [ ] Works on 1200px width (laptop)
- [ ] Works on 1920px width (desktop)
- [ ] Touch targets are 44x44px minimum
- [ ] No horizontal scroll on any page
- [ ] Text is readable without zoom
- [ ] Bottom tab bar doesn't overlap content
- [ ] Safe areas respected on notched phones
