# AI-EXECUTION-PLAYBOOK.md

> **Purpose:** The definitive guide for ANY AI Agent (Junior or Senior) to implement features in this project without hallucinations, spaghetti code, or inconsistencies. 
> **Before you write code, READ this file. After you write code, VERIFY against this file.**

---

## 1. The AI Mindset

You are NOT just writing code. You are building a production-grade educational platform for students and teachers in India. Your code must be:
1.  **Performant:** Works on 2GB RAM Android phones and 2G networks.
2.  **Accessible:** Usable by students with disabilities.
3.  **Consistent:** Looks and feels the same way everywhere.
4.  **Maintainable:** Easy for another AI (or human) to read and modify later.

---

## 2. The Rule of Read-First

**NEVER, EVER write code for a feature before reading these files in this exact order:**

1.  **`CRITICAL-FEATURE-SPEC-AUDIT.md`** (Know what is broken or missing. Do not repeat those mistakes).
2.  **`IMPLEMENTATION-RULES.md`** (Know the coding standard, file structure, and performance budget).
3.  **`THE-COMPONENT-COOKBOOK.md`** (Know how to build UI components correctly by composing atoms/molecules).
4.  **`ERROR-HANDLING.md`** (Know how to catch and recover from errors gracefully).
5.  **`context/ui-context.md`** (Know the colors, fonts, and spacing system).
6.  **`context/Feature-spec/[Relevant Feature].md`** (Know the specific user-facing requirements).

**Consequence of Ignoring This Rule:** You will build something that conflicts with the existing architecture, misses edge cases, or introduces bugs that another AI will have to waste time fixing.

---

## 3. The Subtask Workflow (Divide & Conquer)

For ANY feature (e.g., "Implement Homepage"):
1.  **Decompose:** Break the feature into atomic subtasks.
    *   Example: `Homepage` -> `HeroSection`, `SearchBar`, `CategoryGrid`, `ResourceCard`.
2.  **Map Dependencies:** Identify which subtasks depend on others.
    *   `CategoryGrid` depends on `ResourceCard`.
    *   `HeroSection` depends on `SearchBar`.
3.  **Implement Bottom-Up:** Build the most basic components first (Atoms), then compose them into molecules, then organisms.
4.  **Stub & Iterate:** If Component B depends on Component A, but Component A is not ready, create a stub for Component A so that Component B can be developed in parallel.

### 3.1. Subtask Checklist Template (Use This)

When creating a subtask, include this checklist to force verification:

```
- [ ] Read relevant Feature Spec + Audit + Rules + Cookbook + Error Handling.
- [ ] Create `types.ts` for any new data structures.
- [ ] Create utility functions (if any) in `utils/`.
- [ ] Create Atom components (Button, Input, etc.).
- [ ] Create Molecule components (SearchBar, ResourceCard, etc.).
- [ ] Wire up components in the Feature's main page component.
- [ ] Add responsive breakpoints (reference `09-responsive.md`).
- [ ] Add error boundaries and loading states (reference `ERROR-HANDLING.md`).
- [ ] Verify accessibility (keyboard nav, ARIA, contrast).
- [ ] Verify no `console.log` or `any` types remain.
```

---

## 4. File & Folder Creation Protocol

When you create a new file or folder, follow this protocol to maintain order:

1.  **Choose the Right Parent Folder:**
    *   Is it a pure UI element used in 3+ places? -> `src/components/ui/` or `src/components/`.
    *   Is it specific to a single feature (e.g., `HeroSection` on `HomePage`)? -> `src/features/home/components/`.
    *   Is it a TypeScript type? -> `src/types/`.
    *   Is it a shared utility? -> `src/utils/`.
2.  **Use Correct Naming:**
    *   Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
    *   Hooks: `usePascalCase.ts` (e.g., `useTheme.ts`)
    *   Utilities: `camelCase.ts` (e.g., `searchAlgorithm.ts`)
    *   Types: `PascalCase.ts` (e.g., `Resource.ts`)
3.  **Create the Barrel Export:** Immediately create (or update) an `index.ts` file in the parent folder that exports the new file.
    *   Example: In `src/components/ui/index.ts`, add `export { Button } from './Button';`
    *   **Why:** Prevents import path hell and makes refactoring easier.
4.  **Document the API:** Add a JSDoc comment above the component or function definition explaining its purpose, props, and return value.
    *   Example:
```typescript
/**
 * Renders a single resource card with image, title, and action buttons.
 * @param {ResourceCardProps} props - The properties for the card.
 * @returns {React.ReactNode} The rendered card.
 */
export const ResourceCard: React.FC<ResourceCardProps> = ({ ... }) => { ... };
```

---

## 5. Styling & Design System Compliance

1.  **ABSOLUTELY NO HARDCODED VALUES.** All colors, fonts, and spacing must come from the design system (referenced in `context/ui-context.md` and implemented in `tailwind.config.js` or a theme provider).
    *   ❌ **DON'T:** `style={{ color: '#4F46E5', marginTop: '20px' }}`
    *   ✅ **DO:** `className="text-primary mt-4"`
2.  **Responsive First:** Write styles for mobile first, then use `md:` and `lg:` prefixes for larger screens.
    *   ❌ **DON'T:** Write desktop styles first and then override for mobile.
    *   ✅ **DO:** Write mobile base styles, then enhance for larger screens.
3.  **Dark Mode:** Use `dark:` prefix for all custom colors to ensure dark mode works automatically.

---

## 6. The "Hallucination Prevention" Checklist

Before confirming a task is complete, do a "sanity check" against these common AI mistakes:

*   [ ] **Did I check for existing components?** Search the `src/components/` folder to see if a generic `Button` or `Card` already exists. Do NOT create a new `MyButton` if `Button` exists.
*   [ ] **Did I follow the data contract?** If I am working with `resources.json`, did I check the `Resource` interface in `src/types/resource.ts` to make sure the fields match?
*   [ ] **Did I break the layout?** If I modified a shared component (e.g., `Header`), did I check how it looks on other pages (e.g., `ResourcesPage`, `AboutPage`)?
*   [ ] **Did I introduce new dependencies?** If I ran `npm install <something>`, did I verify it was necessary and that its bundle size is acceptable?
*   [ ] **Did I write tests?** (If the project has a testing framework, even a simple render test is better than nothing).
*   [ ] **Did I consider the error state?** What happens if the API/data fails? Am I showing a fallback UI?

---

## 7. Communication & Handoff

When you finish a task, update these files:
1.  **`context/progress-tracker.md`:** Mark the completed subtask as done. Add any new "Open Questions" if applicable.
2.  **If you discovered a bug in a previous AI's code,** document it in `CRITICAL-FEATURE-SPEC-AUDIT.md` and fix it.
3.  **If you changed a global standard (e.g., added a new alias, changed a theme color),** update `IMPLEMENTATION-RULES.md` and/or `context/ui-context.md` to reflect the change.

---

## 8. The "Stop & Ask" Protocol

If at any point you encounter a situation not covered by the existing documentation, **DO NOT GUESS.** Stop and ask for clarification by adding a note to `context/progress-tracker.md` under "Open Questions".

**Examples of when to STOP:**
*   The feature spec asks for a 3rd party library that isn't in the existing `package.json`.
*   The design system and the feature spec use conflicting colors.
*   You need to create a new global component that doesn't fit into the existing `src/components` or `src/features` structure.

**Examples of when to PROCEED (if the path is clear):**
*   The feature spec asks for a new page that clearly maps to an existing route pattern.
*   You are building a component that is a direct combination of existing atoms/molecules.

---

> **Final Reminder:** Your goal is to write code that is so clean, so well-documented, and so aligned with the architecture, that a different AI agent could take over from you instantly without missing a beat. Build for the next developer, not just for the current task.

**Last Updated:** 2026-05-20
