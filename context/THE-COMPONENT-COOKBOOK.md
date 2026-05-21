# THE-COMPONENT-COOKBOOK.md

> **Purpose:** A reference guide for every UI component in the app. Defines how to build them, how they interact, and how to avoid common implementation traps.
> **Target Audience:** AI Agents, Frontend Developers, Code Reviewers.

---

## 1. The Atomic Design Principle

We follow a simplified Atomic Design methodology to ensure consistency:
*   **Atoms:** The smallest unit (Button, Input, Label, Icon, Badge).
*   **Molecules:** A grouping of atoms (SearchBar = Input + Icon + Button, ResourceCard = Image + Text + Badge).
*   **Organisms:** A grouping of molecules that form a distinct section (HeroSection = Text + SearchBar + Background, ResourceList = FilterBar + Grid of ResourceCards).
*   **Templates:** Page-level layouts (HomePage, ResourcesPage).

**Rule:** AI agents MUST build from Atoms up. Never build a massive organism component directly. Break it down into molecules and atoms first.

---

## 2. Core Atoms

### 2.1. `Button`
**Location:** `src/components/ui/Button.tsx`
**Props Interface:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```
**Implementation Rules:**
*   MUST use `forwardRef` to allow parent components to access the underlying DOM node (critical for focus management in modals).
*   MUST be a `<button>` element (semantic HTML).
*   MUST handle `disabled` state correctly (removes click events, applies opacity).
*   Styling MUST come from the Design System (no hardcoded colors).
**Variants:**
*   **Primary:** Main CTA. Solid background color (`var(--color-primary)`), white text.
*   **Secondary:** Less important actions. Outline style, primary text color.
*   **Ghost:** Used for toolbars or inline actions. No background, text only, subtle hover effect.
*   **Outline:** Used for secondary actions, clear boundaries.
*   **Size Scale:** `sm` (36px height), `md` (44px height), `lg` (56px height).

### 2.2. `Input`
**Location:** `src/components/ui/Input.tsx`
**Props Interface:**
```typescript
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
}
```
**Implementation Rules:**
*   MUST be a `<input>` or `<textarea>` element.
*   MUST display an `error` string below the input in red text.
*   MUST have a visible focus state (ring around the input).

### 2.3. `Badge`
**Location:** `src/components/ui/Badge.tsx`
**Props Interface:**
```typescript
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  children: React.ReactNode;
}
```
**Implementation Rules:**
*   Small, pill-shaped container.
*   Color MUST come from theme.

### 2.4. `Icon`
**Location:** `src/components/ui/Icon.tsx`
**Props Interface:**
```typescript
interface IconProps {
  name: string; // Name from the icon library (e.g., 'Search', 'Menu')
  size?: number; // Default: 24
  color?: string; // Default: currentColor
  className?: string;
}
```
**Implementation Rules:**
*   Rendered as inline SVG for best performance (avoids extra HTTP requests).
*   MUST have `aria-hidden="true"` if purely decorative.
*   MUST have `role="img"` and `aria-label` if it conveys meaning.

---

## 3. Core Molecules

### 3.1. `ResourceCard`
**Location:** `src/components/ResourceCard.tsx`
**Composition:** `div` > `Image` (optional) + `Badge` (Class) + `Badge` (Subject) + `h3` (Title) + `p` (Description) + `Button` (View) + `Button` (Download)
**Props Interface:**
```typescript
import { Resource } from '@types/resource';

interface ResourceCardProps {
  resource: Resource;
  onView: (id: string) => void;
  onDownload: (url: string) => void;
}
```
**Implementation Rules:**
*   MUST be wrapped in `React.memo` to prevent re-renders when parent lists update.
*   Image (if present) MUST be lazy-loaded.
*   Hover effects MUST use CSS transitions, not JS.

### 3.2. `SearchBar`
**Location:** `src/components/SearchBar.tsx`
**Composition:** `div` > `Icon` (Search) + `Input` + `Button` (Clear)
**Props Interface:**
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}
```
**Implementation Rules:**
*   `onChange` MUST be debounced (300ms) to avoid excessive filtering.
*   MUST handle `Enter` key to trigger `onSubmit`.

### 3.3. `FilterBar`
**Location:** `src/components/FilterBar.tsx`
**Composition:** `div` > `Select` (Class) + `Select` (Subject) + `Select` (Type) + `Button` (Clear)
**Props Interface:**
```typescript
interface FilterBarProps {
  activeFilters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}
```
**Implementation Rules:**
*   MUST be a controlled component (state managed by parent, not internally).
*   Clear button MUST only appear when at least one filter is active.

---

## 4. Core Organisms

### 4.1. `HeroSection`
**Location:** `src/features/home/components/HeroSection.tsx`
**Composition:** `section` > `h1` (Title) + `p` (Subtitle) + `SearchBar`
**Implementation Rules:**
*   MUST be the first item on the homepage.
*   Background MUST use a low-motion CSS pattern (no heavy JS animation).

### 4.2. `ResourceList`
**Location:** `src/features/resources/components/ResourceList.tsx`
**Composition:** `div` > `FilterBar` + `div` (Grid of `ResourceCard`s)
**Implementation Rules:**
*   MUST handle empty states (show `NoResults` component).
*   MUST handle loading states (show `Skeleton` components).

### 4.3. `Footer`
**Location:** `src/components/layout/Footer.tsx`
**Composition:** `footer` > `nav` (Links) + `div` (Copyright)
**Implementation Rules:**
*   MUST contain accessible links with proper `href` attributes.

---

## 5. Layout Components

### 5.1. `AppLayout`
**Location:** `src/components/layout/AppLayout.tsx`
**Responsibility:** Wraps every page. Contains `Header`, `main`, and `Footer`.
**Implementation Rules:**
*   MUST handle the layout for both mobile and desktop using the responsive breakpoints defined in `09-responsive.md`.
*   The `main` content area MUST grow to fill the available screen height (prevent footer from sticking up on short pages).

---

## 6. Component Checklist (Before Merge)

Before finalizing ANY component, ensure:
* [ ] It has a clear `Props` interface defined.
* [ ] It is typed with TypeScript (no `any`).
* [ ] It is exported as a named export AND a default export (`export const Button` and `export default Button`).
* [ ] It handles its `disabled` state if it's interactive.
* [ ] It is responsive (tested at `xs`, `sm`, `md`, `lg`, `xl`).
* [ ] It is accessible (keyboard navigable, ARIA labels where needed).
* [ ] It does not contain any business/logic (keep logic in hooks or parent components).

---

## 7. Common Pitfalls for AI Agents

*   **Pitfall 1: Spaghetti Props.** Passing 10+ props to a single component. 
    *   **Fix:** Group related props into objects (e.g., `resource: Resource` instead of `id`, `title`, `description`, etc.).
*   **Pitfall 2: Deep Nesting.** Nesting components 5+ levels deep.
    *   **Fix:** Extract child components into their own files.
*   **Pitfall 3: Mixing Logic & UI.** Putting data fetching logic inside a `ResourceCard`.
    *   **Fix:** Data fetching happens in the parent (`ResourceList`) and is passed as props.
*   **Pitfall 4: Magic Numbers.** Using `px` values everywhere.
    *   **Fix:** Use the theme's spacing scale (e.g., `theme.spacing.md`).
*   **Pitfall 5: Ignoring `useEffect` Cleanup.** Forgetting to remove event listeners in `useEffect`.
    *   **Fix:** Always return a cleanup function.
