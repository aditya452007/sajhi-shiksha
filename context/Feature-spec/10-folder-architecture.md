# Feature Spec — Frontend Folder Architecture

## Overview

Modern, scalable folder structure following feature-based organization. Clear separation between domain features, reusable components, routes, data, and utilities.

## Complete Directory Structure

```
sajhi-shiksha/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt
│   └── images/
│       └── og-image.png
│
├── src/
│   ├── main.tsx                    # App entry point
│   ├── App.tsx                     # Root component with providers
│   │
│   ├── features/                   # Domain-specific features
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── CategoryGrid.tsx
│   │   │   │   ├── ClassSpotlight.tsx
│   │   │   │   ├── QuickLinks.tsx
│   │   │   │   └── ContributeCTA.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useHomePageData.ts
│   │   │   ├── helpers/
│   │   │   │   └── homeHelpers.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── resources/
│   │   │   ├── components/
│   │   │   │   ├── ResourceListPage.tsx
│   │   │   │   ├── ResourceGridView.tsx
│   │   │   │   ├── ResourceListView.tsx
│   │   │   │   └── ResourceCard.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useResourceFilters.ts
│   │   │   ├── helpers/
│   │   │   │   ├── resourceHelpers.ts
│   │   │   │   └── resourceSearch.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── viewer/
│   │   │   ├── components/
│   │   │   │   ├── ResourceViewPage.tsx
│   │   │   │   └── ActionButtons.tsx
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── search/
│   │   │   ├── components/
│   │   │   │   ├── SearchPage.tsx
│   │   │   │   ├── SearchResults.tsx
│   │   │   │   └── NoResultsState.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useSearch.ts
│   │   │   ├── helpers/
│   │   │   │   └── searchAlgorithm.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── contribute/
│   │   │   ├── components/
│   │   │   │   ├── ContributePage.tsx
│   │   │   │   ├── ContributeHero.tsx
│   │   │   │   ├── HowItWorks.tsx
│   │   │   │   ├── ShareTypes.tsx
│   │   │   │   ├── ContributorList.tsx
│   │   │   │   └── ContactInfo.tsx
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── about/
│   │       ├── components/
│   │       │   ├── AboutPage.tsx
│   │       │   ├── AboutHero.tsx
│   │       │   ├── MissionSection.tsx
│   │       │   ├── TeamSection.tsx
│   │       │   └── ContactSection.tsx
│   │       ├── types/
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   ├── components/                 # Reusable components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── NavItem.tsx
│   │   ├── Footer/
│   │   │   └── Footer.tsx
│   │   ├── MegaMenu/
│   │   │   └── MegaMenu.tsx
│   │   ├── MobileDrawer/
│   │   │   └── MobileDrawer.tsx
│   │   ├── BottomNav/
│   │   │   └── BottomNav.tsx
│   │   ├── SuspenseLoader/
│   │   │   └── SuspenseLoader.tsx
│   │   ├── CategoryCard/
│   │   │   └── CategoryCard.tsx
│   │   ├── ResourceCard/
│   │   │   └── ResourceCard.tsx
│   │   ├── SearchBar/
│   │   │   ├── SearchInput.tsx
│   │   │   ├── SearchModal.tsx
│   │   │   └── RecentSearches.tsx
│   │   ├── FilterBar/
│   │   │   ├── FilterBar.tsx
│   │   │   └── MobileFilterPanel.tsx
│   │   ├── IframeViewer/
│   │   │   ├── IframeViewer.tsx
│   │   │   ├── IframeSkeleton.tsx
│   │   │   ├── IframeError.tsx
│   │   │   └── ActionButtons.tsx
│   │   ├── ThemeToggle/
│   │   │   └── ThemeToggle.tsx
│   │   ├── ClassTabs/
│   │   │   └── ClassTabs.tsx
│   │   ├── Breadcrumbs/
│   │   │   └── Breadcrumbs.tsx
│   │   └── NoResultsState/
│   │       └── NoResultsState.tsx
│   │
│   ├── routes/                     # TanStack Router routes
│   │   ├── __root.tsx              # Root layout
│   │   ├── index.tsx               # Home (/)
│   │   ├── resources/
│   │   │   ├── index.tsx           # /resources
│   │   │   └── $categoryId.tsx     # /resources/:categoryId
│   │   ├── viewer/
│   │   │   └── $resourceId.tsx     # /viewer/:resourceId
│   │   ├── search/
│   │   │   └── index.tsx           # /search
│   │   ├── contribute/
│   │   │   └── index.tsx           # /contribute
│   │   └── about/
│   │       └── index.tsx           # /about
│   │
│   ├── data/                       # Static JSON content
│   │   ├── resources.json          # All resources
│   │   ├── categories.json         # Category definitions
│   │   ├── navigation.json         # Navigation structure
│   │   ├── contributors.json       # Contributor info
│   │   └── site-config.json        # Site configuration
│   │
│   ├── hooks/                      # Shared hooks
│   │   ├── useTheme.ts
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── lib/                        # Shared utilities
│   │   ├── utils.ts
│   │   └── constants.ts
│   │
│   ├── types/                      # Shared TypeScript types
│   │   ├── resource.ts
│   │   ├── category.ts
│   │   ├── navigation.ts
│   │   └── common.ts
│   │
│   ├── config/                     # Configuration
│   │   ├── theme.ts                # MUI theme (light/dark)
│   │   └── router.tsx              # TanStack Router config
│   │
│   └── assets/                     # Static assets
│       ├── images/
│       │   └── logo.svg
│       └── icons/
│           └── sprite.svg
│
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind configuration
├── package.json
└── README.md
```

## Naming Conventions

### Files
- Components: `PascalCase.tsx` (e.g., `ResourceCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useTheme.ts`)
- Helpers: `camelCase.ts` (e.g., `resourceHelpers.ts`)
- Types: `index.ts` or descriptive name (e.g., `resource.ts`)
- Config: `camelCase.ts` (e.g., `theme.ts`)

### Folders
- Features: `kebab-case` (e.g., `resources/`, `search/`)
- Components: `PascalCase` (e.g., `Header/`, `Footer/`)
- Subdirectories: `kebab-case` (e.g., `components/`, `hooks/`, `helpers/`)

### Variables and Functions
- Variables: `camelCase` (e.g., `resourceList`, `isActive`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RESULTS`, `DEFAULT_THEME`)
- Functions: `camelCase` (e.g., `filterResources`, `handleSearch`)
- Interfaces: `PascalCase` (e.g., `ResourceCardProps`, `FilterState`)

### Routes
- Route folders: `kebab-case` (e.g., `resources/`, `contribute/`)
- Route files: `index.tsx` for index routes, `$param.tsx` for dynamic routes
- Route paths: kebab-case in URLs (e.g., `/resource-materials`)

## Import Organization

```typescript
// 1. React and React-related
import React, { useState, useCallback, useMemo } from 'react';
import { lazy, Suspense } from 'react';

// 2. Third-party libraries (alphabetical)
import { Box, Grid, Typography } from '@mui/material'; // Example, use your actual UI lib

// 3. Absolute imports (via @ alias)
import { SuspenseLoader } from '@/components/SuspenseLoader';
import { ResourceCard } from '@/components/ResourceCard';
import type { Resource } from '@/types/resource';
import { useTheme } from '@/hooks/useTheme';

// 4. Relative imports (ONLY for files within the SAME feature or folder)
import { resourceHelpers } from '../helpers/resourceHelpers';
import type { ResourceListProps } from '../types';
```

## Import Aliases (vite.config.ts)

**MANDATORY:** Only one alias strategy is permitted to prevent import path hell and ensure consistency across the project.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Usage in code:**
```typescript
import { Button } from '@/components/Button';
import { useTheme } from '@/hooks/useTheme';
import type { Resource } from '@/types/resource';
```

**STRICT RULE:** Do NOT create custom aliases like `@components`, `@hooks`, or `@types`. Use the single `@` alias and rely on the folder structure (e.g., `@/components`, `@/hooks`) to organize imports. This prevents unnecessary `tsconfig.json` and `vite.config.ts` bloat.

## Feature vs Component Decision Tree

```
Is this used in 3+ features?
  ├── Yes → Put in components/
  └── No → Does it have domain-specific logic?
              ├── Yes → Put in features/{feature-name}/
              └── No → Put in components/

Does it have its own API/data layer?
  ├── Yes → Must be in features/
  └── No → Could be in components/

Will it grow over time?
  ├── Yes → Create feature folder
  └── No → Component is fine
```

## Route Structure

```
/                           → Homepage
/resources                  → All resources listing
/resources/:categoryId      → Category-specific resources
/viewer/:resourceId         → Single resource with iframe
/search                     → Search page
/contribute                 → Contribute page
/about                      → About Us page
```
