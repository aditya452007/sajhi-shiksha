# Feature Spec — Contribute Page Design

## Overview

The Contribute page explains how users can share their resources with the community. Since there's no upload functionality or backend, contribution is email-based. The page should be warm, inviting, and clearly explain the process.

## Page Layout

```
┌──────────────────────────────────────────┐
│              Header                       │
├──────────────────────────────────────────┤
│  Breadcrumbs: Home > Contribute           │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │         💝                         │  │
│  │                                    │  │
│  │  Share Your Knowledge              │  │
│  │                                    │  │
│  │  Help fellow teachers and students │  │
│  │  by sharing your study materials,  │  │
│  │  question papers, and resources.   │  │
│  │                                    │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │       📧 Email Us            │  │  │
│  │  └──────────────────────────────┘  │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  How It Works                       │  │
│  │                                    │  │
│  │  1. Prepare your resource          │  │
│  │     (PDF, document, or link)       │  │
│  │                                    │  │
│  │  2. Email us with details          │  │
│  │     Subject, class, description    │  │
│  │                                    │  │
│  │  3. We'll add it to the site       │  │
│  │     Your name will be credited     │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  What You Can Share                 │  │
│  │                                    │  │
│  │  📚 Study materials and notes      │  │
│  │  📝 Question papers and answers    │  │
│  │  📋 Formats and templates          │  │
│  │  🔗 Useful educational links       │  │
│  │  💰 Monetary contributions         │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Current Contributors               │  │
│  │                                    │  │
│  │  Ms. Jyoti — Class 1-5 Resources   │  │
│  │  [Name] — [Contribution]           │  │
│  │  [Name] — [Contribution]           │  │
│  │                                    │  │
│  │  Want to be listed here? Share!    │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Contact Information                │  │
│  │                                    │  │
│  │  📧 Mamta07691@gmail.com           │  │
│  │  📱 WhatsApp: [number]             │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
├──────────────────────────────────────────┤
│              Footer                       │
└──────────────────────────────────────────┘
```

## Sections Detail

### 1. Hero CTA

**Purpose:** Immediate call to action

**Content:**
- Large icon (💝 or `VolunteerActivism`, 64px)
- Heading: "Share Your Knowledge"
- Description: "Help fellow teachers and students by sharing your study materials, question papers, and resources."
- Primary button: "Email Us" → `mailto:Mamta07691@gmail.com?subject=Resource Contribution`
- Warm accent background (gradient or solid)

**Design:**
- Centered layout
- Warm background color
- Large, friendly typography
- Button with hover animation (scale 1.05)

### 2. How It Works

**Purpose:** Explain the simple 3-step process

**Steps:**
1. **Prepare** — "Gather your study materials, notes, or resources in PDF or document format."
2. **Email** — "Send us an email with the resource, subject, class, and a brief description."
3. **Credit** — "We'll add it to the site with your name credited as the contributor."

**Design:**
- 3 cards in a row (desktop) or column (mobile)
- Each card: step number (large, accent color), icon, title, description
- Connecting line or arrow between steps (desktop)
- Subtle hover effect on cards

### 3. What You Can Share

**Purpose:** Show the types of contributions accepted

**Items:**
- Study materials and notes
- Question papers and answer keys
- Formats and templates
- Useful educational links
- Monetary contributions (donations)

**Design:**
- List with icons
- Each item: icon + title + brief description
- Checkmark or bullet icon
- Clean, scannable layout

### 4. Current Contributors

**Purpose:** Show existing contributors and encourage participation

**Content:**
- List of contributors with their contributions
- Name + what they contributed
- "Want to be listed here? Share!" CTA

**Design:**
- Card with contributor list
- Each contributor: avatar placeholder (initials) + name + contribution
- "View All Contributors" link if list is long

### 5. Contact Information

**Purpose:** Provide direct contact details

**Content:**
- Email address
- WhatsApp number (if available)
- Physical address (if applicable)

**Design:**
- Simple card with contact details
- Icons for each contact method
- Clickable email and WhatsApp links

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| `ContributePage` | Feature entry | `features/contribute/components/ContributePage.tsx` |
| `ContributeHero` | Section | `features/contribute/components/ContributeHero.tsx` |
| `HowItWorks` | Section | `features/contribute/components/HowItWorks.tsx` |
| `ShareTypes` | Section | `features/contribute/components/ShareTypes.tsx` |
| `ContributorList` | Section | `features/contribute/components/ContributorList.tsx` |
| `ContactInfo` | Section | `features/contribute/components/ContactInfo.tsx` |

## Data Requirements

```typescript
interface ContributeData {
  hero: {
    title: string;
    description: string;
    email: string;
  };
  steps: {
    icon: string;
    title: string;
    description: string;
  }[];
  shareTypes: {
    icon: string;
    title: string;
    description: string;
  }[];
  contributors: {
    name: string;
    contribution: string;
  }[];
  contact: {
    email: string;
    whatsapp?: string;
  };
}
```

## Accessibility

- Email link is a proper `<a href="mailto:...">` link
- All icons have aria-labels
- Steps are in a logical reading order
- Contact information is selectable and copyable
- Color contrast meets WCAG AA

## Performance

- All content is static (hardcoded JSON)
- No images — icons only
- No animations beyond CSS hover effects
- Page loads instantly
