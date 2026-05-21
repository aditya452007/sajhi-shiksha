# Feature Spec — Search and Filter Design

## Overview

Prominent search functionality with filter capabilities. Users can search across all resources and filter by class, subject, and resource type. Search is client-side (no backend) using the hardcoded JSON data.

## Search Entry Points

### 1. Homepage Hero Search

- Large, prominent search bar in hero section
- Placeholder: "Search for study materials, question papers..."
- Filter chips below: All | Classes 1-5 | Classes 6-12 | Formats | Rules
- Click → navigates to `/search?q=query`

### 2. Header Search Icon

- Desktop: click → expands inline search bar in header
- Mobile: click → opens full-screen search modal
- Always accessible from any page

### 3. Dedicated Search Page

- Route: `/search`
- Full search experience with filters and results
- Accessible from bottom nav (mobile) or header (desktop)

## Search Page Layout

```
┌──────────────────────────────────────────┐
│              Header                       │
├──────────────────────────────────────────┤
│  Breadcrumbs: Home > Search               │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  🔍 Search input (auto-focus)      │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Filter Bar                        │  │
│  │  [Class ▼] [Subject ▼] [Type ▼]   │  │
│  │  [Clear All]                       │  │
│  └────────────────────────────────────┘  │
│                                          │
│  "42 results for 'mathematics'"           │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Result   │ │ Result   │ │ Result   │ │
│  │ Card     │ │ Card     │ │ Card     │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│  ...more results...                      │
│                                          │
│  No results? Try different keywords      │
│  or browse categories →                   │
└──────────────────────────────────────────┘
```

## Search Behavior

### Search Algorithm

Client-side search across JSON data:

1. **Title match** (highest priority) — exact or partial match in resource title
2. **Description match** (medium priority) — match in resource description
3. **Category match** (lower priority) — match in category name
4. **Subject match** (lower priority) — match in subject name

**Scoring:**
- Title exact match: 10 points
- Title partial match: 5 points
- Description match: 3 points
- Category/subject match: 1 point

**Results sorted by score descending.**

### Search Features

| Feature | Description |
|---------|-------------|
| Debounced input | 300ms delay before search triggers |
| Case insensitive | "Math" matches "math" |
| Partial matching | "math" matches "mathematics" |
| Multi-word support | "class 3 math" matches resources with all terms |
| Recent searches | Stored in localStorage (last 5) |
| Popular searches | Hardcoded list of common searches |

### Mobile Search Modal

Full-screen overlay on mobile:

```
┌─────────────────────────────┐
│  ✕  🔍 Search...            │
├─────────────────────────────┤
│  Recent Searches             │
│  > mathematics               │
│  > class 5 english           │
│  > assembly format           │
├─────────────────────────────┤
│  Popular Searches            │
│  [Class 1] [Question Papers] │
│  [GOI Rules] [Math]          │
└─────────────────────────────┘
```

**Interactions:**
- Auto-focus on input when modal opens
- ESC or ✕ closes modal
- Tap recent search → executes search
- Tap popular search chip → executes search
- Type → shows live results below input

## Filter Design

### Filter Options

| Filter | Options | Type |
|--------|---------|------|
| Class | All, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | Dropdown / Chips |
| Subject | All, Mathematics, English, Hindi, Science, Social Science, General | Dropdown / Chips |
| Type | All, PDF, Document, Link, Format | Dropdown / Chips |
| Category | All, Classes 1-5, Classes 6-12, Programs, Formats, Rules, Admissions | Dropdown / Chips |

### Desktop Filter Bar

- Horizontal row of dropdowns
- "Clear All" button appears when any filter is active
- Active filters shown as removable chips above results

### Mobile Filter Panel

- Single "Filters" button opens slide-up panel
- Full-screen filter panel with all options
- "Apply" button (primary) and "Clear All" button (secondary)
- Panel slides up from bottom, overlay dims background

### Filter State

- Reflected in URL query params: `?class=3&subject=mathematics&type=pdf`
- Shareable and bookmarkable
- Browser back/forward works with filter changes
- Reset on navigating away from search page

## Results Display

### Result Cards

Same as resource cards on listing pages:
- Icon, title, badges, description, action buttons
- Grid view on desktop, list view on mobile
- "View" and "Download" actions

### No Results State

```
┌─────────────────────────────────────┐
│                                     │
│         🔍                          │
│                                     │
│  No results found for "xyz"         │
│                                     │
│  Try:                               │
│  • Checking your spelling           │
│  • Using different keywords         │
│  • Removing some filters            │
│                                     │
│  [Browse All Categories]            │
│                                     │
└─────────────────────────────────────┘
```

### Results Count

- "Showing X results" displayed above results
- Updates live as filters change
- Hidden when no filters active and showing all results

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| `SearchPage` | Feature entry | `features/search/components/SearchPage.tsx` |
| `SearchInput` | Reusable | `components/SearchBar/SearchInput.tsx` |
| `SearchModal` | Reusable | `components/SearchBar/SearchModal.tsx` |
| `FilterBar` | Reusable | `components/FilterBar/FilterBar.tsx` |
| `MobileFilterPanel` | Reusable | `components/FilterBar/MobileFilterPanel.tsx` |
| `SearchResults` | Feature | `features/search/components/SearchResults.tsx` |
| `NoResultsState` | Reusable | `components/NoResultsState/NoResultsState.tsx` |
| `RecentSearches` | Reusable | `components/SearchBar/RecentSearches.tsx` |

## Data Flow

```
User types in search input
  → Debounce 300ms
  → Filter resources.json by search terms
  → Apply active filters (class, subject, type)
  → Sort by relevance score
  → Update results display
  → Update URL query params
```

## Performance

- Search runs on pre-loaded JSON data (no network calls)
- Debounced input prevents excessive re-renders
- Results use `useMemo` for filtered/sorted data
- Virtualized list for large result sets (>50 items)
- Recent searches stored in localStorage (max 5)

## Accessibility

- Search input has visible label
- Filter controls have aria-labels
- Results count announced to screen readers
- Keyboard navigation through results
- Focus moves to results after search
- No results state is descriptive and actionable
