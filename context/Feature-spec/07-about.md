# Feature Spec — About Us Page Design

## Overview

The About Us page tells the story of Sajhi Shiksha, its mission, the people behind it, and how to get in touch. Simple, clean, and informative.

## Page Layout

```
┌──────────────────────────────────────────┐
│              Header                       │
├──────────────────────────────────────────┤
│  Breadcrumbs: Home > About Us             │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │  About Sajhi Shiksha               │  │
│  │                                    │  │
│  │  Sajhi Shiksha is a free, open     │  │
│  │  educational platform built for    │  │
│  │  KVS students and teachers. Our    │  │
│  │  mission is to make quality study  │  │
│  │  materials accessible to everyone. │  │
│  │                                    │  │
│  │  "Sharing Knowledge — From You,    │  │
│  │   For You"                          │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Our Mission                        │  │
│  │                                    │  │
│  │  • Free access for all students    │  │
│  │  • Teacher-contributed resources   │  │
│  │  • No login, no barriers           │  │
│  │  • Always growing, always free     │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Behind Sajhi Shiksha               │  │
│  │                                    │  │
│  │  [Photo/Avatar]  [Name]            │  │
│  │  [Role/Description]                │  │
│  │                                    │  │
│  │  [Photo/Avatar]  [Name]            │  │
│  │  [Role/Description]                │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Get In Touch                       │  │
│  │                                    │  │
│  │  📧 Mamta07691@gmail.com           │  │
│  │  🌐 www.sajhishiksha.in            │  │
│  │                                    │  │
│  │  Have questions or suggestions?    │  │
│  │  We'd love to hear from you.       │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
├──────────────────────────────────────────┤
│              Footer                       │
└──────────────────────────────────────────┘
```

## Sections Detail

### 1. About Hero

**Content:**
- Heading: "About Sajhi Shiksha"
- Description paragraph explaining the platform
- Tagline: "Sharing Knowledge — From You, For You" (prominent, italic)

**Design:**
- Centered text
- Clean, readable typography
- Subtle background pattern or gradient

### 2. Our Mission

**Content:**
- Heading: "Our Mission"
- Bullet points of core values:
  - Free access for all students
  - Teacher-contributed resources
  - No login, no barriers
  - Always growing, always free

**Design:**
- Card with icon list
- Each point: icon + text
- Green checkmark icons for positive statements

### 3. Behind Sajhi Shiksha

**Content:**
- Heading: "Behind Sajhi Shiksha"
- List of key contributors with their roles
- Avatar placeholder (initials in colored circle)
- Name and description

**Design:**
- Card with contributor list
- Each contributor: avatar + name + role
- Grid layout on desktop (2 columns)
- Single column on mobile

### 4. Get In Touch

**Content:**
- Heading: "Get In Touch"
- Email address (clickable mailto link)
- Website URL
- Brief invitation to reach out

**Design:**
- Card with contact details
- Icons for each contact method
- Clean, minimal layout

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| `AboutPage` | Feature entry | `features/about/components/AboutPage.tsx` |
| `AboutHero` | Section | `features/about/components/AboutHero.tsx` |
| `MissionSection` | Section | `features/about/components/MissionSection.tsx` |
| `TeamSection` | Section | `features/about/components/TeamSection.tsx` |
| `ContactSection` | Section | `features/about/components/ContactSection.tsx` |

## Data Requirements

```typescript
interface AboutData {
  hero: {
    title: string;
    description: string;
    tagline: string;
  };
  mission: {
    title: string;
    points: string[];
  };
  team: {
    title: string;
    members: {
      name: string;
      role: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    email: string;
    website: string;
    description: string;
  };
}
```

## Accessibility

- All text is selectable and readable
- Contact links are proper `<a>` tags
- Sufficient color contrast
- Logical heading hierarchy
