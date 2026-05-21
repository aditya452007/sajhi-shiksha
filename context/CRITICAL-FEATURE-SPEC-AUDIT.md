# CRITICAL-FEATURE-SPEC-AUDIT.md

> **Purpose:** This document serves as the single source of truth for identifying, documenting, and resolving all hallucinations, inconsistencies, and missing-critical-details across the project's feature specifications. 
> **Created By:** Senior Frontend Architecture Audit
> **Date:** 2026-05-20
> **Severity Codes:** 
> - `CRITICAL` — Will cause build/runtime failure or architectural collapse.
> - `HIGH` — Will lead to severe technical debt, performance issues, or conflicting implementations.
> - `MEDIUM` — Affects developer velocity, consistency, and maintainability.
> - `LOW` — Minor inconsistency or a suggestion for improved clarity.

---

## 1. Architecture & State Management Conflicts

### 1.1. `04-search-filter.md` vs `03-resource-pages.md` (CRITICAL)
*   **`04-search-filter.md` states:** 
    > "Search is client-side (no backend) using the hardcoded JSON data."
    
    AND 
    
    > "Debounced input... Filter resources.json by search terms"
    
*   **`03-resource-pages.md` implies:**
    > "Resource pages display lists of educational resources (PDFs, documents, links)..." 
    
    It then contains a `FilterState` interface and suggests "Results updated instantly" without clarifying the *source* of the data for the filters. 
    
*   **The Conflict:** `04-search-filter.md` is the only file to explicitly define the search algorithm (client-side, mock JSON) and the filter data structure. `03-resource-pages.md` describes a `FilterBar` with the same logic but doesn't link it to the search algorithm. This creates a risk of an AI agent implementing two separate filtering mechanisms or using different data schemas for filtering vs. searching.
*   **Resolution:** The `Resource` data model in `03-resource-pages.md` must be explicitly linked to the search algorithm in `04-search-filter.md`. The `FilterBar` in `03-resource-pages.md` must reference the shared `FilterState`.

### 1.2. `10-folder-architecture.md` (CRITICAL)
*   **The file provides a folder structure:** `features/`, `components/`, `data/`, `hooks/`.
*   **The Missing Link:** It does NOT specify the state management library (e.g., Zustand, Redux Toolkit) or how data flows between these features. An AI agent following this spec might place all state in `useState` within `features/`, leading to prop drilling or unmanageable local state. 
*   **Resolution:** Add a section on "State Architecture" specifying the preferred library and the rule: "Global state (user auth, theme, search queries) lives in `src/store/`. Feature-specific state (resource lists, filter preferences) lives within the `features/` directory."

---

## 2. Component & UI Inconsistencies (HIGH)

### 2.1. `IframeViewer` Component (Multiple Files)
*   **`05-iframe-viewer.md`:** 
    > "Width: 100% of parent (max 900px)... Height: 70vh (minimum 500px)"
*   **`09-responsive.md`:**
    > "Iframe viewer: 60vh height, full width" (Mobile)
    > "Iframe viewer: 70vh height, max-width 900px" (Desktop)
*   **The Inconsistency:** `05-iframe-viewer.md` provides a fixed `IframeContainer` component with hardcoded `70vh`. `09-responsive.md` then overrides this for mobile without updating the component code in `05-iframe-viewer.md`. An AI agent implementing `IframeViewer` based on `05-iframe-viewer.md` will build a non-responsive iframe.
*   **Resolution:** Move all responsive logic (`60vh` for mobile, `70vh` for desktop) into the `IframeContainer` component definition in `05-iframe-viewer.md` or create a shared `useResponsiveIframeHeight` hook.

### 2.2. `ThemeToggle` Logic (CRITICAL)
*   **`08-theme-toggle.md`** defines `useTheme` and a `getInitialTheme` function.
*   **`09-responsive.md`** discusses safe areas and theme-based padding but assumes the theme is available.
*   **The Gap:** No file explains HOW the theme state is propagated. Is it a React Context? A Zustand store? Just a `useState`? An AI agent might create a new Context provider inside `ThemeToggle.tsx` which would be inefficient, or they might miss the `data-theme` attribute entirely. 
*   **Resolution:** The `useTheme` hook must be placed inside a `ThemeProvider` (Context or Zustand) and wrapped around the application root in `App.tsx`.

### 2.3. `ResourceCard` / `CategoryCard` (MEDIUM)
*   **`01-homepage.md`:** Defines `CategoryCard` with a specific layout (Image, Title, Description).
*   **`03-resource-pages.md`:** Defines `ResourceCard`. It shares the purpose (displaying resources) but has a *slightly* different layout emphasis (e.g., more metadata, different aspect ratio).
*   **The Risk:** An AI might create two completely separate, duplicated components with 90% overlap, or it might try to force a single component that is too complex to maintain.
*   **Resolution:** Define a reusable base component (e.g., `BaseCard`) that accepts props for layout variants. Both `CategoryCard` and `ResourceCard` should be thin wrappers around `BaseCard`.

---

## 3. Data & API Ambiguities (CRITICAL)

### 3.1. `resources.json` (Schema Drift)
*   **`04-search-filter.md`:** Mentions "hardcoded JSON data" but never defines the schema.
*   **`03-resource-pages.md`:** Defines the `Resource` interface.
*   **`10-folder-architecture.md`:** Mentions `resources.json` in the `data/` folder.
*   **The Inconsistency:** The `Resource` interface in `03-resource-pages.md` contains fields like `driveUrl`, `contributors`, and `lastUpdated`. An AI agent might generate a `resources.json` file that is missing these fields, or adds extra fields that the interface doesn't support. 
*   **Resolution:** Create a shared schema definition file (e.g., `types/resource.ts`) and ensure `resources.json` is a direct match to that schema.

### 3.2. `navigation.json` (The Hidden Dependency)
*   **`02-navigation.md`**: Describes a complex mega-menu with "Programs", "Formats", etc.
*   **`10-folder-architecture.md`**: Mentions `navigation.json` in the `data/` folder.
*   **The Missing Detail:** `02-navigation.md` does not specify the exact structure of `navigation.json`. If the JSON structure is flat, the Mega Menu logic breaks. If it's deeply nested, the `MobileDrawer` logic needs to handle recursion. 
*   **Resolution:** Provide a concrete example of the `navigation.json` structure inside `02-navigation.md`.

### 3.3. `contributors.json` (Data Sourcing)
*   **`06-contribute.md`**: Mentions "Current Contributors" with names like "Ms. Jyoti".
*   **`10-folder-architecture.md`**: Lists `contributors.json`.
*   **The Ambiguity:** Is this data static? Is it hardcoded in the JSON? How is it fetched? 
*   **Resolution:** Clarify that `contributors.json` is a static asset loaded at build time or app initialization.

---

## 4. Performance & Rendering Oversights (HIGH)

### 4.1. `React.lazy` & Suspense Boundaries (CRITICAL)
*   **`10-folder-architecture.md`:** Mentions `main.tsx` and `App.tsx`.
*   **The Missing Rule:** NONE of the feature specs (especially `01-homepage.md` and `03-resource-pages.md`) instruct the AI to wrap feature entry points or heavy components in `React.lazy` and `Suspense`. Without this, the AI will likely create a monolithic bundle.
*   **Resolution:** Add a "Performance Rules" file (e.g., `13-performance.md`) explicitly mandating `React.lazy` for all route-level components and `Suspense` usage.

### 4.2. Image Optimization (MEDIUM)
*   **`01-homepage.md`**: "No heavy images — icons only (SVG, inline or sprite)".
*   **`03-resource-pages.md`**: Mentions `ResourceCard` having an image.
*   **The Contradiction:** `01-homepage.md` says no heavy images, but `03-resource-pages.md` implies images are part of resources. An AI might skip loading optimization for these resource images.
*   **Resolution:** Specify image handling rules. If using Google Drive thumbnails, explain how to proxy or lazy-load them.

---

## 5. Accessibility (A11y) Gaps (HIGH)

### 5.1. `05-iframe-viewer.md` vs `09-responsive.md` (CRITICAL)
*   `05-iframe-viewer.md` states the iframe needs a `title` and `aria-label`.
*   `09-responsive.md` mentions a `max-width: 900px` for the iframe container.
*   **The Missing Link:** Neither file addresses `prefers-reduced-motion` for the iframe viewer or tab switching, which is critical for accessibility on mobile. 
*   **Resolution:** Add an specific A11y checklist file (`14-accessibility.md`) that covers keyboard navigation, focus management, and `prefers-reduced-motion`.

### 5.2. Form A11y (MEDIUM)
*   **`06-contribute.md`**: Mentions an "Email Us" button and a form.
*   **The Missing Detail:** No specs define form validation (both visual and ARIA) or error message display for screen readers.
*   **Resolution:** Add a section to `06-contribute.md` detailing ARIA live regions for form errors and validation rules.

---

## 6. Specific Feature Spec Hallucinations & Corrections

### `01-homepage.md` 
*   **Hallucination:** "Subtle animated background: soft gradient or geometric pattern (CSS only)". 
    *   **Correction:** The `design.csv` (UI/UX skill) suggests a "Bauhaus" or "Minimalist Monochrome" style. This might conflict with a "soft gradient". The spec should either align with the design system or explicitly override it.
*   **Missing:** How are "Recent Searches" stored? LocalStorage? SessionStorage? 

### `02-navigation.md`
*   **Hallucination:** "Swipe right → close drawer (touch gesture)". 
    *   **Correction:** This is fine, but it requires a custom touch event handler or a library like `react-use-gesture` (now part of `@use-gesture/react`). It doesn't mention a dependency. 

### `03-resource-pages.md`
*   **Hallucination:** "Grid view uses virtualization for large lists (>50 items)". 
    *   **Correction:** This requires a library like `react-window` or `react-virtualized`. It is implied but not explicitly stated as a dependency. An AI might try to implement virtualization manually (very complex and error-prone) or skip it entirely.
*   **Missing:** No mention of the empty state for when a category has no resources.

### `04-search-filter.md`
*   **Hallucination:** "Client-side search across JSON data... Scoring: Title exact match: 10 points...".
    *   **Correction:** This is a classic candidate for a Web Worker to avoid blocking the main thread on large JSON files (> 1000 items). The spec doesn't mention offloading the search to a worker.
*   **Missing:** No loading state for search results. 

### `05-iframe-viewer.md`
*   **CRITICAL FLAW:** `allow="autoplay; encrypted-media"` on the iframe. 
    *   **Correction:** `allow="autoplay"` is a security and user experience risk. It should be removed unless explicitly required by the embedded content (which Google Drive previews do not require). 
*   **Missing:** Error handling for `driveUrl` being invalid or returning a 404.

### `06-contribute.md`
*   **Missing:** "WhatsApp: [number]" is left as a placeholder. The spec must be finalized with real data before implementation, or clearly mark it as a dynamic value to be filled in later.

### `07-about.md`
*   **Missing:** No mention of how social media links are managed or if they open in new tabs.

### `08-theme-toggle.md`
*   **Missing:** No fallback for when `localStorage` is disabled or full (rare, but possible in strict browser modes).

### `09-responsive.md`
*   **CRITICAL FLAW:** Breakpoints: `xs: 0-599`, `sm: 600-899`. 
    *   **Correction:** This is inconsistent with standard Tailwind breakpoints (`sm: 640px`, `md: 768px`). If using Tailwind, these custom breakpoints require configuration in `tailwind.config.js`. The spec should be updated to use standard breakpoints or explicitly define a custom config.

### `10-folder-architecture.md`
*   **CRITICAL FLAW:** Aliasing.
    *   **Correction:** The spec shows both `~` and `@` aliases. It must settle on a single, consistent alias strategy to avoid confusing the AI. 
*   **Missing:** No `.env` file structure for API keys or configuration.

### `11-seo.md`
*   **Missing:** No guidance on generating the OG image dynamically for each resource. 
*   **Missing:** No mention of `robots.txt` generation or `sitemap.xml` automation.

### `12-animations.md`
*   **Hallucination:** "Use `transform` and `opacity` only".
    *   **Correction:** While good for performance, `transform: translateY` and `opacity` are the primary tools. However, for "shimmer" effects, you often need `background-position`, which the document already uses. The rule should be: "Favor `transform` and `opacity`. For non-transform properties, ensure they are composited or used minimally."

---

## 7. Missing Global Files/Standards

1.  **`13-performance.md`**: Mandating `React.lazy`, `Suspense`, `React.memo`, and code-splitting strategies.
2.  **`14-accessibility.md`**: Global A11y rules, focus management, keyboard navigation, and screen reader considerations.
3.  **`15-error-handling.md`**: Global error boundary patterns, Sentry integration (if any), and user-facing error states (404, 500).
4.  **`16-data-flow.md`**: Explaining how `resources.json` is loaded, cached, and updated.

--- 

> **Next Steps:** 
> 1. Address all `CRITICAL` items first.
> 2. Create the missing global files (13, 14, 15, 16).
> 3. Update existing feature specs to reference these global standards and resolve identified conflicts.
