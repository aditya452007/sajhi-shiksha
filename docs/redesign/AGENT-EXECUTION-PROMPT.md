# Agent Execution Prompt — Sajhi Shiksha Restructure

> **Copy the entire block below** and paste to your AI coding agent.

---

```
You are a senior frontend engineer executing a planned restructure of the Sajhi Shiksha website (React 18 + Vite + TypeScript + MUI v7 + TanStack Router + TailwindCSS). The codebase lives under `C:\Users\Hp\SAJHISHIKSHA\frontend\`.

## CRITICAL RULES — Read First

### Rule 1: Work Smart, Not Blind
DO NOT manually read every file to understand it. Use these commands instead:
- `rg "SEARCH_TERM" --include="*.tsx" --include="*.ts" --include="*.json"` to find every occurrence across the codebase at once
- `rg "SEARCH_TERM" --include="*.tsx" --include="*.ts" -n` to get line numbers
- `sed -i` or `node -e` for bulk find-and-replace across files (Windows: use PowerShell `(Get-Content file) -replace 'old','new' | Set-Content file`)
- Glob patterns to find files: `**/*.tsx`, `**/*.ts`, `**/*.json`
- `git diff --stat` after changes to see what you modified

Always batch operations. Never visit one file at a time.

### Rule 2: Graph First, Code Later
Before ANY code change, call pyscribe-code MCP tools in this order:
1. `pyscribe-code_analyze-codebase-graph` with scope="full", path="C:\Users\Hp\SAJHISHIKSHA\frontend\src", language="typescript"
2. Use `pyscribe-code_find-callers` and `pyscribe-code_analyze-impact` to understand what each symbol affects BEFORE modifying it
3. For any function/component you plan to delete, first verify nothing else imports it

### Rule 3: Verify After Every Batch
After each group of changes, run:
- `npx tsc --noEmit` — TypeScript check
- `npm run build` — Vite build
Ensure zero errors before moving to the next batch.

---

## What You Need to Execute

You have 5 reference documents at `C:\Users\Hp\SAJHISHIKSHA\docs\redesign\`:

### Read These Files First (in order)
1. `VISUAL-SPEC.md` — Understand the new visual layout (3 doorway buttons, WhatsApp toggle)
2. `UPGRADE-CHANGES.md` — Complete list of files to create/delete/modify
3. `CMS-CONFIG-SCHEMA.md` — The new JSON config format
4. `site-content.json` — Already created at `frontend/src/data/site-content.json`

### Then Read These Context Files
5. `C:\Users\Hp\SAJHISHIKSHA\context\progress-tracker.md` — Current phase status
6. `C:\Users\Hp\SAJHISHIKSHA\context\architecture.md` — System structure
7. `C:\Users\Hp\SAJHISHIKSHA\context\code-standards.md` — Component patterns
8. `C:\Users\Hp\SAJHISHIKSHA\context\ui-context.md` — Design tokens

---

## Execution Plan (10 Phases)

Execute each phase COMPLETELY before moving to the next.

### Phase 1: Graph Analysis & Discovery
```bash
# Step 1: Build codebase graph
pyscribe-code_analyze-codebase-graph scope=full path=C:\Users\Hp\SAJHISHIKSHA\frontend\src language=typescript

# Step 2: Find all files that import or reference the things we're removing
rg "ClassSpotlight" --include="*.tsx" --include="*.ts" -n
rg "resources.primary\|/resources/primary" --include="*.tsx" --include="*.ts" --include="*.json" -n
rg "SUBJECTS_PRIMARY" --include="*.tsx" --include="*.ts" -n
rg "classes-1-5" --include="*.tsx" --include="*.ts" --include="*.json" -n
rg "contributors\.json\|contributorsData\|contributors/" --include="*.tsx" --include="*.ts" -n
rg "onNavigate" --include="*.tsx" --include="*.ts" -n

# Step 3: Check impact before deleting anything
pyscribe-code_analyze-impact symbol=ClassSpotlight change_type=delete
pyscribe-code_analyze-impact symbol=SUBJECTS_PRIMARY change_type=delete
```

### Phase 2: Remove Classes 1-5 Content
1. Remove 14 resources from `data/resources.json` where `"category": "classes-1-5"`
2. Remove `primary` entry from `data/categories.json`
3. Remove "Classes 1-5" nav items from `data/navigation.json`
4. Remove `SUBJECTS_PRIMARY` and `CLASS_RANGES.primary` from `lib/constants.ts`
5. Remove "Classes 1-5" from `FILTER_CHIPS` in `lib/constants.ts`

### Phase 3: Delete Deprecated Components & Routes
1. Delete file: `features/home/components/ClassSpotlight.tsx`
2. Delete file: `routes/resources.primary.tsx`
3. Remove `<Route path="/resources/primary" />` from route tree

### Phase 4: Update HomePage
Replace `ClassSpotlight` with new `DoorwayCards` component in `features/home/HomePage.tsx`:
```tsx
// Replace this:
<ScrollReveal><ClassSpotlight title="Resources for Primary Classes" classNumbers={[1,2,3,4,5]} /></ScrollReveal>

// With this:
<ScrollReveal><DoorwayCards /></ScrollReveal>
```

### Phase 5: Build DoorwayCards Component
Create `features/home/components/DoorwayCards.tsx`:
- Reads `sections` from `site-content.json`
- Renders 3 large neo-brutalist cards (Students, Teachers, Math Lovers)
- Each card: icon box, title (Space Grotesk 800), subtitle (Space Mono), colored background, thick border, hard shadow, random slight rotation, Framer Motion hover/tap
- Links to `redirectRoute` from config
- Import site-content.json: `import siteContent from '@/data/site-content.json'`

### Phase 6: Build New Routes
Create 3 route files:
- `routes/for-students.tsx` — Uses SearchPage/ResourceListPage with pre-filtered params
- `routes/for-teachers.tsx` — Uses SearchPage/ResourceListPage with pre-filtered params
- `routes/for-math-lovers.tsx` — New `MathLoversPage` component

### Phase 7: Build Math Lovers Page
Create:
- `features/mathLovers/MathLoversPage.tsx`
- `features/mathLovers/components/ContentBlock.tsx`
- Reads `sections.mathLovers.blocks[]` from config
- Renders scrollable feed of Google Doc iframes via existing `IframeViewer`

### Phase 8: Build WhatsApp Toggle
Create `components/WhatsAppButton/WhatsAppButton.tsx`:
- Desktop: fixed bottom-right, 56px circle, green, thick border
- Mobile: first icon on BottomTabBar
- Reads `site.whatsappGroupUrl` from config
- Hidden if URL is empty
- Integrate into `__root.tsx` (desktop) and `BottomTabBar.tsx` (mobile)

### Phase 9: Update Navigation & About Page
1. **Header**: Rewire to read from `site-content.json` → `navigation.headerLinks`
2. **Footer**: Rewire to read from `site-content.json` → `navigation.footerGroups`
3. **BottomTabBar**: Add WhatsApp icon, update tabs to: Home, Students, Teachers, Math Lovers, Menu
4. **AboutPage**: Conditionally hide "Behind Sajhi Shiksha" section based on `contact.showProfessorNames`

### Phase 10: Final Verification
```bash
npx tsc --noEmit
npm run build
# Check no errors
# Verify routes: /, /for-students, /for-teachers, /for-math-lovers
# Verify old routes removed: /resources/primary should 404
# Verify no dead imports
rg "import.*from.*ClassSpotlight\|import.*from.*primary\|SUBJECTS_PRIMARY" --include="*.tsx" --include="*.ts"
```

---

## Key Conventions to Follow

1. **Neo-brutalism**: Thick borders (3px), hard shadows (4-6px), bold colors, Space Grotesk headings, Space Mono labels/mono text
2. **Animations**: Framer Motion spring physics (`type: 'spring', stiffness: 300, damping: 20`), hover lift, press effect
3. **Mobile-first**: All sx props start with `{ xs: ..., md: ... }`
4. **TypeScript**: Strict mode, `React.FC<Props>` pattern, no `any`, explicit return types
5. **No dead code**: After deletions, run `rg` to confirm nothing references deleted symbols
6. **Config-driven**: ALL text strings come from `site-content.json`, NEVER hardcode user-facing text

## Do NOT
- Do NOT manually read every file one by one — use grep/glob/batch operations
- Do NOT modify `scrape_*.json`, `JSON_DATA_STRUCTURE.md`, `EXTRACTION_SUMMARY.md`, `API_NETWORK_ANALYSIS.md`, `website_analysis.md` — these are reference-only
- Do NOT add comments to code unless the existing pattern requires it
- Do NOT break existing animations or theme behavior
- Do NOT modify `node_modules/`, `dist/`, or build artifacts

## Deliver When Done
Report back with:
1. Build status (TypeScript ✅ / Vite ✅)
2. List of files created
3. List of files deleted
4. List of files modified
5. Any issues encountered
6. Suggested next steps
```
