# Feature Spec — Resource Pages Design

## Overview

Resource pages display lists of educational resources (PDFs, documents, links) organized by category, class, or subject. Uses a mixed approach: cards for browsing, detailed view for individual resources.

## Page Types

### 1. Category Listing Page

Shows all resources within a category (e.g., "Classes 1-5", "Formats & Rules").

```
┌──────────────────────────────────────────┐
│              Header                       │
├──────────────────────────────────────────┤
│  Breadcrumbs: Home > Classes 1-5          │
│                                          │
│  H1: Classes 1-5 Resources                │
│  Description: Study materials for...      │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Filter Bar                        │  │
│  │  [Class ▼] [Subject ▼] [Type ▼]   │  │
│  │  Search within category...         │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Resource │ │ Resource │ │ Resource │ │
│  │  Card    │ │  Card    │ │  Card    │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐              │
│  │ Resource │ │ Resource │              │
│  │  Card    │ │  Card    │              │
│  └──────────┘ └──────────┘              │
│                                          │
├──────────────────────────────────────────┤
│              Footer                       │
└──────────────────────────────────────────┘
```

### 2. Class-Specific Page

For Classes 1-5: tabbed interface showing subjects.
For Classes 6-12: filter chips for class ranges.

### 3. Individual Resource View

Dedicated page for viewing a single resource with Google Drive iframe.

## Category Listing Page

### Filter Bar

**Position:** Below page title, above resource cards

**Filters:**
- **Class dropdown:** All | Class 1 | Class 2 | ... | Class 12
- **Subject dropdown:** All | Mathematics | English | Hindi | Science | Social Science
- **Type dropdown:** All | PDF | Document | Link | Format
- **Search input:** "Search within this category..."

**Behavior:**
- Filters are additive (AND logic)
- Clear all filters button appears when any filter is active
- Filter state reflected in URL query params (shareable)
- Results update instantly (no page reload)

**Mobile:**
- Filters collapse into a single "Filters" button
- Opens a slide-up filter panel
- "Apply" and "Clear" buttons at bottom of panel

### Resource Cards

**Card Design (Grid View):**

```
┌─────────────────────────────┐
│  📘                         │
│                             │
│  Mathematics                │
│  Class 3                    │
│                             │
│  Chapter-wise notes and     │
│  practice questions         │
│                             │
│  ┌───────────┐              │
│  │  View     │  ↓ Download  │
│  └───────────┘              │
└─────────────────────────────┘
```

**Card Elements:**
- Icon (32px, subject-colored)
- Title (Nunito, bold, 16px)
- Badges: Class, Subject (colored chips)
- Description (2 lines max, truncated)
- Action buttons: "View" (primary) + "Download" (secondary)

**Card Interactions:**
- Hover: lift 4px, shadow deepens
- Click card body → navigate to resource view page
- Click "View" → navigate to resource view page
- Click "Download" → open Google Drive in new tab

**Grid Layout:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

### List View (Alternative)

Toggle between grid and list view.

**List View Design:**

```
┌──────────────────────────────────────────────────┐
│  📘  Mathematics — Class 3                       │
│      Chapter-wise notes and practice questions   │
│      [Class 3] [Mathematics]        [View] [↓]   │
├──────────────────────────────────────────────────┤
│  📗  English — Class 3                           │
│      Grammar exercises and reading comprehension │
│      [Class 3] [English]            [View] [↓]   │
└──────────────────────────────────────────────────┘
```

**When to use:**
- Grid view: category pages, homepage
- List view: search results, filtered results with many items

## Class-Specific Pages

### Classes 1-5: Tabbed Interface

```
┌──────────────────────────────────────────┐
│  Breadcrumbs: Home > Classes 1-5          │
│                                          │
│  H1: Class 3 Resources                    │
│                                          │
│  [Class 1] [Class 2] [Class 3] [4] [5]   │
│  (Active tab: colored underline)          │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Math     │ │ English  │ │ Hindi    │ │
│  │ Cards    │ │ Cards    │ │ Cards    │ │
│  └──────────┘ └──────────┘ └──────────┘ │
└──────────────────────────────────────────┘
```

**Tab Behavior:**
- Click tab → switch content (no page reload)
- Tab state in URL: `/classes/1-5?class=3`
- Swipe gesture on mobile to switch tabs

### Classes 6-12: Filter Chips

```
┌──────────────────────────────────────────┐
│  Breadcrumbs: Home > Classes 6-12         │
│                                          │
│  H1: Question Papers & Resources          │
│                                          │
│  [6-8] [9-10] [11-12]                    │
│                                          │
│  [Mathematics] [Science] [English] [...]  │
│                                          │
│  Resource cards below...                  │
└──────────────────────────────────────────┘
```

## Individual Resource View Page

```
┌──────────────────────────────────────────┐
│  Breadcrumbs: Home > Class 3 > Math      │
│                                          │
│  H1: Mathematics — Class 3                │
│  Description: Chapter-wise notes...       │
│                                          │
│  [Class 3] [Mathematics] [PDF]            │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │     Google Drive iframe            │  │
│  │     (centered, proper sizing)      │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [Download PDF]  [Share]  [Back]         │
│                                          │
│  Contributors: Ms. Jyoti, ...            │
│  Last Updated: Jan 2026                  │
└──────────────────────────────────────────┘
```

**Iframe Container:**
- Width: 100% of content area (max 900px)
- Height: 70vh (minimum 500px)
- Centered horizontally
- Rounded corners (12px)
- Subtle border
- Loading skeleton while iframe loads

**Action Buttons:**
- "Download PDF" → opens Google Drive URL in new tab
- "Share" → copies link to clipboard, shows snackbar
- "Back" → navigates to previous page

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| `ResourceListPage` | Feature entry | `features/resources/components/ResourceListPage.tsx` |
| `ResourceCard` | Reusable | `components/ResourceCard/ResourceCard.tsx` |
| `ResourceListView` | Feature | `features/resources/components/ResourceListView.tsx` |
| `ResourceGridView` | Feature | `features/resources/components/ResourceGridView.tsx` |
| `FilterBar` | Reusable | `components/FilterBar/FilterBar.tsx` |
| `MobileFilterPanel` | Reusable | `components/FilterBar/MobileFilterPanel.tsx` |
| `ClassTabs` | Reusable | `components/ClassTabs/ClassTabs.tsx` |
| `ResourceViewPage` | Feature entry | `features/viewer/components/ResourceViewPage.tsx` |
| `IframeContainer` | Reusable | `components/IframeViewer/IframeContainer.tsx` |

## Data Requirements

```typescript
interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  class: number | null;
  subject: string | null;
  type: 'pdf' | 'document' | 'link' | 'format';
  driveUrl: string;
  contributors: string[];
  lastUpdated: string;
}

interface FilterState {
  class: number | 'all';
  subject: string | 'all';
  type: string | 'all';
  search: string;
}
```

## Performance

- Resource cards use `React.memo`
- Filter state updates are debounced (300ms for search)
- Grid view uses virtualization for large lists (>50 items)
- Iframe loads lazily (only when resource view page is visited)
- Filter state in URL enables shareable links without state loss

## Accessibility

- Filter controls have visible labels
- Resource cards are keyboard navigable
- iframe has title attribute for screen readers
- Breadcrumbs use aria-label="Breadcrumb"
- Color is not the only indicator (badges have text + color)
- Focus management on filter changes
