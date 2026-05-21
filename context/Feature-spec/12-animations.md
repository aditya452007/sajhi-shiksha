# Feature Spec — Animation and Micro-interactions

## Overview

Moderate animation intensity (level 5 playfulness). CSS-first approach with lightweight JavaScript only when necessary. No heavy animation libraries. Animations enhance UX without distracting from content.

## Animation Principles

1. **Purposeful** — every animation serves a UX goal (feedback, orientation, delight)
2. **Subtle** — never overwhelming or distracting
3. **Fast** — 150-300ms for micro-interactions, 300-500ms for page transitions
4. **Respectful** — honors `prefers-reduced-motion`
5. **Consistent** — same easing curves and durations throughout

## Easing Curves

```css
--ease-out: cubic-bezier(0.25, 0.1, 0.25, 1);    /* Standard */
--ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);   /* Smooth */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful */
```

## Animation Inventory

### 1. Page Transitions

**Type:** Fade + slight slide
**Duration:** 300ms
**Easing:** `--ease-out`

```css
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms var(--ease-out),
              transform 300ms var(--ease-out);
}
```

**When:** Route changes
**Library:** CSS only (no JS animation library needed)

### 2. Hover Effects

#### Card Hover

```css
.card {
  transition: transform 200ms var(--ease-out),
              box-shadow 200ms var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

**When:** Resource cards, category cards
**Effect:** Lift 4px, shadow deepens

#### Button Hover

```css
.button {
  transition: background-color 150ms var(--ease-out),
              transform 150ms var(--ease-out);
}

.button:hover {
  transform: scale(1.02);
}

.button:active {
  transform: scale(0.98);
}
```

**When:** All buttons
**Effect:** Slight scale up on hover, scale down on press

#### Icon Hover

```css
.icon-button:hover .icon {
  transform: scale(1.1);
  transition: transform 150ms var(--ease-bounce);
}
```

**When:** Icon buttons, navigation icons
**Effect:** Icon scales up slightly with bounce easing

### 3. Focus States

```css
.focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

**When:** Keyboard navigation focus
**Effect:** Visible outline, no animation

### 4. Loading Skeleton

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    var(--bg-secondary) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

**When:** Content loading (iframe, data fetch)
**Effect:** Shimmer animation across placeholder

### 5. Scroll Reveal

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms var(--ease-out),
              transform 400ms var(--ease-out);
}
```

**When:** Sections appear on scroll (homepage sections)
**Effect:** Fade in + slide up
**Implementation:** IntersectionObserver (lightweight, no library)

### 6. Filter Chip Toggle

```css
.chip {
  transition: background-color 150ms var(--ease-out),
              transform 150ms var(--ease-bounce);
}

.chip.active {
  transform: scale(1.05);
}
```

**When:** Filter chips, category chips
**Effect:** Slight scale up when activated

### 7. Tab Switch

```css
.tab-indicator {
  transition: transform 300ms var(--ease-in-out),
              width 300ms var(--ease-in-out);
}
```

**When:** Class tabs, category tabs
**Effect:** Indicator slides smoothly to active tab

### 8. Drawer Slide

```css
.drawer {
  transform: translateX(-100%);
  transition: transform 300ms var(--ease-out);
}

.drawer.open {
  transform: translateX(0);
}
```

**When:** Mobile hamburger menu
**Effect:** Slides in from left

### 9. Modal/Panel Slide Up

```css
.panel {
  transform: translateY(100%);
  transition: transform 300ms var(--ease-out);
}

.panel.open {
  transform: translateY(0);
}
```

**When:** Mobile filter panel, search modal
**Effect:** Slides up from bottom

### 10. Snackbar/Toast

```css
@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.snackbar {
  animation: slideIn 300ms var(--ease-out);
}
```

**When:** "Link copied" messages, feedback
**Effect:** Slides up from bottom, auto-dismisses

### 11. Theme Toggle Transition

```css
[data-theme] {
  transition: background-color 300ms var(--ease-out),
              color 300ms var(--ease-out);
}
```

**When:** Light/dark mode switch
**Effect:** Smooth color transition across all elements

### 12. Search Bar Expand

```css
.search-bar {
  width: 40px;
  transition: width 300ms var(--ease-out);
}

.search-bar.expanded {
  width: 100%;
}
```

**When:** Desktop header search icon click
**Effect:** Expands from icon to full search bar

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Effect:** Disables all animations for users who prefer reduced motion

## What NOT to Animate

- Google Drive iframes (external, no control)
- Text content (distracting)
- Navigation items beyond hover states
- Form inputs beyond focus states
- Loading spinners beyond simple rotation

## Performance Guidelines

- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Use `will-change` sparingly (only for active animations)
- Remove `will-change` after animation completes
- No JavaScript animations on scroll (use CSS + IntersectionObserver)

## Component Inventory

| Component | Animation | Location |
|-----------|-----------|----------|
| `PageTransition` | Fade + slide | `components/PageTransition/` |
| `ScrollReveal` | Fade in on scroll | `components/ScrollReveal/` |
| `Skeleton` | Shimmer | `components/Skeleton/` |
| `ThemeToggle` | Color transition | `components/ThemeToggle/` |
| `Drawer` | Slide in | `components/MobileDrawer/` |
| `FilterPanel` | Slide up | `components/FilterBar/` |

## Implementation Approach

1. **CSS-first** — all animations defined in CSS
2. **IntersectionObserver** — for scroll-triggered reveals (no library)
3. **No Framer Motion** — too heavy for this use case
4. **No GSAP** — overkill for simple animations
5. **No Lottie** — no complex animations needed
