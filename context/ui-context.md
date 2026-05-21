# UI Context — Sajhi Shiksha

## Theme

**Dual theme:** Light mode (default) + Dark mode with toggle.

- Light mode: Clean, bright, friendly with warm accents
- Dark mode: Deep navy/charcoal background with same accent colors, adjusted contrast
- Toggle in header, persists via localStorage

## Colors

### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#FFFFFF` | Main background |
| `--color-bg-secondary` | `#F8F9FA` | Section backgrounds, cards |
| `--color-bg-tertiary` | `#F0F4F8` | Hover states, subtle backgrounds |
| `--color-text-primary` | `#1A1A2E` | Headings, primary text |
| `--color-text-secondary` | `#4A4A68` | Body text, descriptions |
| `--color-text-muted` | `#6B7280` | Captions, metadata |
| `--color-accent-primary` | `#4F46E5` | Primary buttons, links, active states |
| `--color-accent-secondary` | `#7C3AED` | Secondary accents, gradients |
| `--color-accent-warm` | `#F59E0B` | Highlights, badges, playful elements |
| `--color-success` | `#10B981` | Success states |
| `--color-warning` | `#F59E0B` | Warning states |
| `--color-error` | `#EF4444` | Error states |
| `--color-border` | `#E5E7EB` | Dividers, card borders |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0F172A` | Main background |
| `--color-bg-secondary` | `#1E293B` | Section backgrounds, cards |
| `--color-bg-tertiary` | `#334155` | Hover states, subtle backgrounds |
| `--color-text-primary` | `#F1F5F9` | Headings, primary text |
| `--color-text-secondary` | `#CBD5E1` | Body text, descriptions |
| `--color-text-muted` | `#94A3B8` | Captions, metadata |
| `--color-accent-primary` | `#818CF8` | Primary buttons, links |
| `--color-accent-secondary` | `#A78BFA` | Secondary accents |
| `--color-accent-warm` | `#FBBF24` | Highlights, badges |
| `--color-border` | `#334155` | Dividers, card borders |

### Subject Color Coding (for Classes 1-12)

| Subject | Color |
|---------|-------|
| Mathematics | `#3B82F6` (Blue) |
| English | `#8B5CF6` (Purple) |
| Hindi | `#F59E0B` (Amber) |
| Science | `#10B981` (Green) |
| Social Science | `#EF4444` (Red) |
| General/Other | `#6B7280` (Gray) |

## Typography

### Font Families

| Usage | Font | Fallback |
|-------|------|----------|
| Headings | `Nunito` | `system-ui, sans-serif` |
| Body | `Inter` | `system-ui, sans-serif` |
| Playful/Accent | `Fredoka` | `system-ui, sans-serif` |

### Font Sizes (Responsive)

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| H1 | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) |
| H2 | 1.5rem (24px) | 1.875rem (30px) | 2.25rem (36px) |
| H3 | 1.25rem (20px) | 1.5rem (24px) | 1.75rem (28px) |
| Body | 1rem (16px) | 1rem (16px) | 1rem (16px) |
| Small | 0.875rem (14px) | 0.875rem (14px) | 0.875rem (14px) |
| Caption | 0.75rem (12px) | 0.75rem (12px) | 0.75rem (12px) |

### Font Weights

| Usage | Weight |
|-------|--------|
| Headings | 700 (Bold) |
| Body | 400 (Regular) |
| Emphasis | 500 (Medium) |
| Buttons | 600 (Semi-bold) |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Buttons, small elements |
| `--radius-md` | `12px` | Cards, inputs |
| `--radius-lg` | `16px` | Large cards, modals |
| `--radius-xl` | `24px` | Hero sections, featured cards |
| `--radius-full` | `9999px` | Badges, avatars, pills |

## Component Library

**MUI v7** for component primitives:
- `Button`, `IconButton`, `TextField`, `Select`, `Chip`
- `Grid` (v7 syntax with `size` prop)
- `AppBar`, `Drawer`, `Dialog`, `Tooltip`
- `Card`, `CardActionArea`, `CardContent`
- `Tabs`, `Tab`, `Breadcrumbs`
- `Skeleton` (for loading states)

**Custom components** built on top:
- `SuspenseLoader` — loading boundary wrapper
- `ResourceCard` — resource display card
- `CategoryCard` — homepage category card
- `SearchBar` — prominent search with filters
- `IframeViewer` — Google Drive iframe container
- `ThemeToggle` — dark/light mode switch
- `BottomNav` — mobile bottom tab bar
- `MegaMenu` — desktop navigation menu

## Layout Patterns

### Page Structure
```
┌─────────────────────────────────┐
│           Header/AppBar          │
│  Logo | Nav | Search | Theme    │
├─────────────────────────────────┤
│         (Mobile: BottomNav)      │
├─────────────────────────────────┤
│                                  │
│         Main Content             │
│         (max-width: 1200px)      │
│         (centered, padded)       │
│                                  │
├─────────────────────────────────┤
│            Footer                │
│  Quick Links | About | Contact   │
└─────────────────────────────────┘
```

### Content Width
- Max content width: `1200px`
- Mobile padding: `16px`
- Tablet padding: `24px`
- Desktop padding: `32px`

### Grid System
- MUI Grid v7 with `size` prop
- Mobile: 1 column (full width)
- Tablet: 2 columns
- Desktop: 3-4 columns (depending on content)

## Icons

**Material Icons** (MUI) for consistency:
- Navigation: `Menu`, `Close`, `Search`, `Home`, `School`, `Description`
- Actions: `Download`, `Share`, `Email`, `ArrowForward`, `ExpandMore`
- UI: `DarkMode`, `LightMode`, `FilterList`, `Sort`, `ChevronRight`
- Categories: `MenuBook`, `Article`, `EventNote`, `Gavel`, `Assessment`

**Icon size guidelines:**
- Navigation icons: `24px`
- Card icons: `32px`
- Hero/featured icons: `48px`
