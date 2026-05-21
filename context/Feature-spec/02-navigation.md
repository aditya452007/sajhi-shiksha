# Feature Spec — Navigation Design

## Overview

Responsive navigation that adapts to screen size. Desktop gets a mega-menu with visual category cards. Mobile gets a hamburger menu + bottom tab bar. Tablet gets a hybrid approach.

## Breakpoint Strategy

| Breakpoint | Width | Navigation Style |
|------------|-------|-----------------|
| Mobile | < 768px | Hamburger menu (top) + Bottom tab bar |
| Tablet | 768px - 1024px | Hamburger menu (top) + Bottom tab bar |
| Desktop | > 1024px | Mega-menu in header |

## Desktop Navigation (>1024px)

### Header Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  Logo    Home ▾  Resources ▾  Programs ▾  Formats ▾  About  🔍 🌙│
└─────────────────────────────────────────────────────────────────┘
```

### Mega Menu

Triggered on hover (desktop) or click (tablet). Shows visual category cards.

**Home Dropdown:**
- Homepage (icon: `Home`)
- All Categories (icon: `GridOn`)

**Resources Dropdown:**
- Classes 1-5 (icon: `MenuBook`, color: blue)
- Classes 6-8 (icon: `School`, color: green)
- Classes 9-10 (icon: `School`, color: purple)
- Classes 11-12 (icon: `School`, color: amber)
- All Resources (icon: `LibraryBooks`)

**Programs Dropdown:**
- Nipun/FLN (icon: `AutoStories`)
- CMP (icon: `Description`)
- TBP (icon: `Description`)
- Cub & Bulbul (icon: `Pets`)
- Miscellaneous (icon: `MoreHoriz`)

**Formats Dropdown:**
- Morning Assembly (icon: `EventNote`)
- GOI/KVS Rules (icon: `Gavel`)
- Office Formats (icon: `Description`)
- CBSE/NIOS (icon: `Assignment`)
- KVS Admission (icon: `HowToReg`)
- Income Tax (icon: `AccountBalance`)
- Time Table (icon: `CalendarToday`)

**Mega Menu Design:**
- White/dark card with shadow
- Grid of category cards (3-4 columns)
- Each card: icon + title + brief description
- Hover on card: background highlight
- Click: navigate to section
- Dismisses on click outside or ESC

### Header Components

| Element | Behavior |
|---------|----------|
| Logo | Click → navigate home |
| Nav items | Hover → show mega menu |
| Search icon | Click → expand search bar in header |
| Theme toggle | Click → toggle light/dark |
| Contribute button | Visible as CTA button in header (accent color) |

## Mobile Navigation (< 1024px)

### Top Header

```
┌─────────────────────────────────────┐
│  ☰    Logo                    🔍 🌙 │
└─────────────────────────────────────┘
```

- Hamburger menu icon (left)
- Logo (center)
- Search icon + Theme toggle (right)

### Hamburger Menu (Drawer)

Slides in from left. Full-height overlay.

```
┌──────────────────────┐
│  Logo         ✕      │
├──────────────────────┤
│  🏠  Home            │
│  📚  Resources  ▸    │
│  📖  Programs   ▸    │
│  📋  Formats    ▸    │
│  🎓  Admissions ▸    │
│  💝  Contribute      │
│  ℹ️  About Us        │
├──────────────────────┤
│  [Email Us Button]   │
└──────────────────────┘
```

**Interactions:**
- Click hamburger → drawer slides in from left
- Click overlay background → drawer closes
- Click ✕ → drawer closes
- Click ▸ → expands sub-menu (accordion)
- Click item → navigate + close drawer
- Swipe right → close drawer (touch gesture)

### Bottom Tab Bar

Fixed at bottom on mobile. Shows 4-5 most important destinations.

```
┌─────────────────────────────────────┐
│                                     │
│         (Page Content)              │
│                                     │
├─────────────────────────────────────┤
│  🏠     📚     🔍     💝     📋    │
│ Home  Resources Search Contribute More│
└─────────────────────────────────────┘
```

**Tabs:**

| Tab | Icon | Route |
|-----|------|-------|
| Home | `Home` | `/` |
| Resources | `MenuBook` | `/resources` |
| Search | `Search` | `/search` (opens search modal) |
| Contribute | `VolunteerActivism` | `/contribute` |
| More | `MoreHoriz` | Opens drawer menu |

**Design:**
- Fixed position, bottom of viewport
- White/dark background with top border
- Active tab: accent color icon + label
- Inactive tab: muted icon + label
- Safe area padding for notched phones
- Height: 64px

## Tablet Navigation (768px - 1024px)

- Same as mobile: hamburger + bottom tab bar
- Mega menu not shown (screen too narrow)
- Bottom tab bar may show 4 tabs instead of 5

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| `Header` | Reusable | `components/Header/Header.tsx` |
| `MegaMenu` | Reusable | `components/MegaMenu/MegaMenu.tsx` |
| `MobileDrawer` | Reusable | `components/MobileDrawer/MobileDrawer.tsx` |
| `BottomNav` | Reusable | `components/BottomNav/BottomNav.tsx` |
| `NavItem` | Reusable | `components/Header/NavItem.tsx` |
| `SearchIcon` | Reusable | `components/Header/SearchIcon.tsx` |

## State Management

```typescript
interface NavigationState {
  mobileMenuOpen: boolean;
  activeMegaMenu: string | null; // 'resources' | 'programs' | 'formats' | null
  activeBottomTab: string;
  searchExpanded: boolean;
}
```

- Managed via `useState` in Header component
- Lifted to Context if needed by child components
- No global state manager needed

## Accessibility

- Hamburger button has aria-label="Open menu"
- Drawer has role="dialog" and aria-modal="true"
- Focus trapped inside drawer when open
- ESC key closes drawer
- Mega menu dismissible with ESC
- Bottom nav items have aria-current="page" for active tab
- All navigation links have descriptive text (not just icons)

## Performance

- Mega menu loaded on demand (lazy)
- Bottom nav always visible (small bundle impact)
- Drawer content static (no runtime fetch)
- CSS transitions for slide animations (GPU-accelerated)
