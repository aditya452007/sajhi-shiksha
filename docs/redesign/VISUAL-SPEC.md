# Visual Specification — Redesigned Homepage

## Design Language

- **Style**: Neo-brutalism (thick borders, hard shadows, bold colors)
- **Vibe**: Playful, friendly, educational
- **Fonts**: Space Grotesk (headings), Space Mono (labels/buttons)
- **Animations**: Framer Motion spring physics, hover lifts, press effects

---

## Laptop / Desktop View (> 1024px)

```
┌──────────────────────────────────────────────────────────────────────┐
│  [BookIcon] Sajhi Shiksha   [Home] [Students] [Teachers] [Math ♥]    │
│                              [Contribute] [About]            [🌙]    │
│  ═══════════════════════════════════════════════════════════════════  │
│                                                                       │
│                              ╔══════════════╗                         │
│                              ║  ★  Star     ║                         │
│                              ╚══════════════╝                         │
│                                                                       │
│  ┌──────────────────────────────────────────────┐  ┌──────────────┐  │
│  │                                              │  │              │  │
│  │  What do you want to                         │  │   ┌──────┐   │  │
│  │  ━━━━━━━━━━━━━━                              │  │   │ BOOK │   │  │
│  │      learn  today?                           │  │   │      │   │  │
│  │                                              │  │   └──────┘   │  │
│  │  Free study materials, question papers       │  │   ┌──┐       │  │
│  │  and resources for KVS students.             │  │   │★ │       │  │
│  │                                              │  │   └──┘       │  │
│  │  ┌──────────────────────────────────────┐    │  └──────────────┘  │
│  │  │  Search resources, subjects...  🔍   │    │                    │
│  │  └──────────────────────────────────────┘    │              ┌──┐  │
│  │                                              │              │★ │  │
│  │  [All] [Classes 1-5] [Classes 6-12] [...]    │              └──┘  │
│  └──────────────────────────────────────────────┘                    │
│                                                                       │
│  ═══════════════════════════════════════════════════════════════════  │
│                                                                       │
│              ┌──────────────────────────────────────┐                 │
│              │      Pick Your Path  ~~~             │                 │
│              │                                      │                 │
│              │  ┌──────────┐  ┌──────────┐  ┌────┐ │                 │
│              │  │          │  │          │  │    │ │                 │
│              │  │  🏫      │  │  🍎      │  │ ♥  │ │                 │
│              │  │  FOR     │  │  FOR     │  │FOR │ │                 │
│              │  │ STUDENTS │  │ TEACHERS │  │MATH│ │                 │
│              │  │          │  │          │  │LOV.│ │                 │
│              │  │  ──────── │  │  ──────── │  │────│ │                 │
│              │  │ Maths    │  │Progs,    │  │Doc │ │                 │
│              │  │ 6-12     │  │Rules,    │  │Blog│ │                 │
│              │  │          │  │Admissions│  │    │ │                 │
│              │  └──────────┘  └──────────┘  └────┘ │                 │
│              │                                      │                 │
│              └──────────────────────────────────────┘                 │
│                                                                       │
│  ═══════════════════════════════════════════════════════════════════  │
│                                                                       │
│  [QuickLinks: Programs | Formats | Rules | Admissions]                │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Got Resources to Share?  [Contribute →]  ✨                │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ═══════════════════════════════════════════════════════════════════  │
│                                                                       │
│  [Sajhi Shiksha]  │  For Students: [6-12 Maths]                      │
│                   │  For Teachers: [Programs] [Formats] [Admissions]  │
│                   │  More: [About] [Contribute]                       │
│  Made with ♥                                                          │
│                                                                       │
│  WhatsApp bubble → 📱  (fixed bottom-right, z-index: 9999)          │
└──────────────────────────────────────────────────────────────────────┘
```

### WhatsApp Toggle — Desktop

```
Position:   fixed, bottom: 24px, right: 24px
Size:       56px × 56px
Shape:      Circle with thick border (neo-brutalist)
Color:      Green (#25D366) background, white icon
Border:     3px solid #1A1A1A
Shadow:     4px 4px 0px #1A1A1A
Hover:      Slight lift (translateY(-2px))
Animation:  Subtle pulse/bounce every 5 seconds to draw attention
Icon:       WhatsApp logo (SVG inline)
Link:       Opens whatsappGroupUrl from site-content.json
```

---

## Mobile View (< 768px)

```
 ┌─────────────────────────────────────┐
 │  [≡]  Sajhi Shiksha          [🌙]  │
 │ ════════════════════════════════════ │
 │                                      │
 │  ┌────────────────────────────────┐  │
 │  │                                │  │
 │  │   What do you want to          │  │
 │  │   ━━━━━━━━━━━━━━               │  │
 │  │      learn  today?             │  │
 │  │                                │  │
 │  │   ┌─────────────────────────┐  │  │
 │  │   │ Search resources... 🔍  │  │  │
 │  │   └─────────────────────────┘  │  │
 │  │                                │  │
 │  │   [All] [ [6-12] [...]    │  │
 │  └────────────────────────────────┘  │
 │                                      │
 │  ┌────────────────────────────────┐  │
 │  │     Pick Your Path  ~~~       │  │
 │  │                                │  │
 │  │  ┌─────────────────────┐      │  │
 │  │  │ 🏫                   │      │  │
 │  │  │ FOR STUDENTS         │      │  │
 │  │  │ Maths Resources      │      │  │
 │  │  │ Classes 6-12         │      │  │
 │  │  └─────────────────────┘      │  │
 │  │                                │  │
 │  │  ┌─────────────────────┐      │  │
 │  │  │ 🍎                   │      │  │
 │  │  │ FOR TEACHERS         │      │  │
 │  │  │ Programs, Rules,     │      │  │
 │  │  │ Admissions & more    │      │  │
 │  │  └─────────────────────┘      │  │
 │  │                                │  │
 │  │  ┌─────────────────────┐      │  │
 │  │  │ ♥                    │      │  │
 │  │  │ FOR MATH LOVERS      │      │  │
 │  │  │ Explore math blogs,  │      │  │
 │  │  │ puzzles & docs       │      │  │
 │  │  └─────────────────────┘      │  │
 │  └────────────────────────────────┘  │
 │                                      │
 │  [QuickLinks...]                     │
 │                                      │
 │  ┌─── Contribute CTA ────┐          │
 │  │ Share your resources  │          │
 │  └───────────────────────┘          │
 │                                      │
 │ ════════════════════════════════════ │
 │  Footer © Sajhi Shiksha             │
 │                                      │
 │ ════════════════════════════════════ │
 │  [🏠] [Students] [Teachers] [♥] [≡]  │  ← Bottom Tab Bar
 │                                      │
 │          📱 ← WhatsApp icon          │  ← Bottom left of tab bar
 │       (fixed, on bottom bar)        │
 └─────────────────────────────────────┘
```

### WhatsApp Toggle — Mobile

```
Position:   Attached to the bottom tab bar, left side
Size:       40px × 40px (fits within 56px tab bar height)
Shape:      Circular, green background
Border:     2px solid #1A1A1A
Shadow:     2px 2px 0px #1A1A1A
Behavior:   Sits as the first "tab" icon on the bottom bar
            OR as a floating bubble just above the bottom bar
            Links to whatsappGroupUrl
```

### Bottom Tab Bar (Mobile Only)

```
[📱] [🏫] [🍎] [♥] [≡]
  ↓     ↓     ↓    ↓    ↓
Home  Stdnts Tchrs Math Menu
      (6-12)       Lvr  (drawer)
```

Tab labels use Space Mono, 0.65rem. Active tab highlighted with yellow background. Thick borders, hard shadows — neo-brutalist style.

---

## New Routes Summary

| Route | Page | What it shows |
|-------|------|--------------|
| `/` | Homepage | Hero + 3 big buttons (Students/Teachers/Math Lovers) + QuickLinks + CTA |
| `/for-students` | Student Resources | Search/filter page pre-filtered: Class 6-12, Subject: Mathematics |
| `/for-teachers` | Teacher Resources | Search/filter page pre-filtered: Categories = programs, formats, admissions |
| `/for-math-lovers` | Math Lovers | Scrollable feed of Google Doc iframe blocks (from config) |

---

## Color Mapping for the 3 Buttons

| Button | Background Color | Text Color | Border | Shadow |
|--------|-----------------|------------|--------|--------|
| For Students | `var(--color-blue)` | `#1A1A1A` | 3px solid | 5px 5px 0px |
| For Teachers | `var(--color-green)` | `#1A1A1A` | 3px solid | 5px 5px 0px |
| For Math Lovers | `var(--color-purple)` | `#1A1A1A` | 3px solid | 5px 5px 0px |

Each button card has:
- Large icon (48px) in a white bordered box
- Title in Space Grotesk 800
- Subtitle in Space Mono
- Slight random rotation (-1deg to 1deg) for playful feel
- Hover: lift -4px, shadow grows
- Tap: press effect, shadow collapses
- Framer Motion spring entrance animation
