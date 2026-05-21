# AI Workflow Rules — Sajhi Shiksha

## Approach

**Documentation-Driven Development (DDD):**
1. Read context files before any implementation
2. Update feature specs before writing code
3. Keep context files in sync with implementation
4. Progress tracker updated after every meaningful change

**Keep It Stupidly Simple (KISS):**
- No over-engineering
- No AI-slop features
- No unnecessary abstractions
- Build simple first, iterate based on need
- Open to change — architecture should allow future additions without rewrites

## Scoping Rules

### When to Create a New Feature
- Feature has 3+ related components
- Feature has its own data/API layer
- Feature has domain-specific logic
- Feature will grow over time

### When to Add to Existing Feature
- Logically related to existing feature
- Shares same data source
- Extends existing functionality

### When to Create a Reusable Component
- Used across 3+ features
- Generic, no domain-specific logic
- Pure UI primitive

## When to Split Work

| Scope | Action |
|-------|--------|
| Single component change | Implement directly |
| New page/route | Create route + feature folder + update progress |
| New feature (3+ components) | Create feature spec first, then implement |
| Architecture change | Update architecture.md first, then implement |
| Design system change | Update ui-context.md first, then implement |

## Handling Missing Requirements

1. Check context files for existing decisions
2. Check feature specs for page/component details
3. If not found, make a reasonable decision following existing patterns
4. Document the decision in the relevant context file
5. Flag it in progress-tracker.md as an "Architecture Decision"

## Protected Files

These files should NOT be modified without explicit instruction:
- `scrape_full_content.json` — raw scrape data (reference only)
- `scrape_structure.json` — scrape statistics (reference only)
- `website_analysis.md` — analysis of existing site (reference only)
- `EXTRACTION_SUMMARY.md` — extraction summary (reference only)
- `JSON_DATA_STRUCTURE.md` — data structure documentation (reference only)
- `API_NETWORK_ANALYSIS.md` — network analysis (reference only)

## Keeping Docs in Sync

After every implementation change:
1. Update `context/progress-tracker.md` — mark completed items, add new ones
2. Update relevant feature spec if component/page behavior changed
3. Update `context/architecture.md` if system boundaries changed
4. Update `context/ui-context.md` if design tokens changed
5. Update `context/code-standards.md` if conventions changed

## Before Moving to the Next Unit

Checklist before considering a task complete:
- [ ] Feature spec exists and is up to date
- [ ] Component follows React.FC<Props> pattern
- [ ] TypeScript strict — no `any`, explicit types
- [ ] Suspense boundary wraps lazy-loaded components
- [ ] Mobile-first responsive design verified
- [ ] Dark mode tested
- [ ] Accessibility basics checked (contrast, keyboard nav, aria labels)
- [ ] No console errors
- [ ] Progress tracker updated
- [ ] Context files updated if scope changed

## Development Phases

### Phase 1: Foundation
- Project setup (Vite + React + TypeScript)
- Folder structure creation
- Theme configuration (light/dark)
- Routing setup (TanStack Router)
- Base components (Header, Footer, SuspenseLoader)

### Phase 2: Core Pages
- Homepage with category cards and search
- Resource listing pages
- Google Drive iframe viewer
- Navigation (mega menu desktop, hamburger mobile)

### Phase 3: Content Migration
- Convert all 20 pages of content to JSON
- Create consolidated category structure
- Wire up all routes and content

### Phase 4: Polish
- Search and filter functionality
- Responsive refinements
- Animation and micro-interactions
- SEO (meta tags, sitemap, robots.txt, llms.txt)
- Google Analytics integration
- Performance optimization

### Phase 5: Review & Launch
- Professor review
- Lighthouse audit
- Cross-browser testing
- Deploy to hosting
