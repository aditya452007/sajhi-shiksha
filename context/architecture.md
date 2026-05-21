# Architecture — Sajhi Shiksha

## Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | React 18 + Vite | Build tool and runtime |
| Language | TypeScript 5.x | Type safety |
| Router | TanStack Router | File-based routing, lazy loading |
| UI Library | MUI v7 | Component primitives (Button, Grid, AppBar, etc.) |
| Styling | MUI sx prop + TailwindCSS | Hybrid styling — MUI for components, Tailwind for layouts |
| Animations | CSS transitions + Framer Motion (lightweight) | Micro-interactions, page transitions |
| Data | Hardcoded JSON files | Content source (classes, resources, links) |
| State | TanStack Query (server) + useState (UI) | Lightweight state management |
| Icons | Material Icons / Lucide | Icon system |
| Analytics | Google Analytics (gtag) | Usage tracking |
| Hosting | Static hosting (Vercel/Netlify/GitHub Pages — TBD) | Deployment |
| Domain | sajishiksha.in (configurable via env var) | Production domain |

## System Boundaries

```
┌─────────────────────────────────────────────────┐
│                  User Browser                    │
│  ┌───────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  React    │  │ TanStack │  │  Google      │  │
│  │  App      │  │ Router   │  │  Drive       │  │
│  │  (SPA)    │  │          │  │  iframes     │  │
│  └─────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│        │              │               │          │
└────────┼──────────────┼───────────────┼──────────┘
         │              │               │
         ▼              ▼               ▼
┌────────────────┐ ┌──────────┐ ┌──────────────────┐
│ Static JSON    │ │ Static   │ │ Google Drive     │
│ Content Files  │ │ Assets   │ │ Embedded PDFs    │
│ (in repo)      │ │ (imgs)   │ │ (external)       │
└────────────────┘ └──────────┘ └──────────────────┘
```

### External Dependencies
- **Google Drive** — iframe embeds for PDF viewing (no API calls, just iframe URLs)
- **Google Fonts** — Nunito, Inter font families
- **Google Analytics** — page view tracking via gtag

### No Backend
- No API server
- No database
- No authentication
- No file uploads (email-based contribution only)

## Storage Model

### Content Storage
All content lives as **hardcoded JSON files** in the repository:

```
src/data/
  resources.json        — All resources with metadata
  categories.json       — Category definitions and hierarchy
  navigation.json       — Navigation structure
  contributors.json     — Contributor information
  site-config.json      — Site-wide configuration (domain, analytics ID, etc.)
```

### Resource Data Structure
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "class": "number | null",
  "subject": "string | null",
  "type": "pdf | document | format | link",
  "driveUrl": "string",
  "thumbnail": "string | null",
  "contributors": ["string"],
  "lastUpdated": "string (ISO date)"
}
```

### Domain Configuration
Domain is **not hardcoded**. It lives in `site-config.json` and can be changed without code modifications:

```json
{
  "siteUrl": "https://www.sajhishiksha.in",
  "siteName": "Sajhi Shiksha",
  "analyticsId": "G-XXXXXXXXXX"
}
```

## Auth and Access Model

**No authentication.** The site is fully public and read-only.

- Anyone can view all resources
- No user accounts, sessions, or tokens
- Contribution is email-based (mailto links)
- No admin panel

## Invariants

1. **No login flow exists** — the app must never assume a logged-in user
2. **All content is static** — no runtime API calls except Google Drive iframes
3. **Google Drive iframes are the only external content source** — no other third-party APIs
4. **Mobile-first is mandatory** — all designs must work on 320px width minimum
5. **Domain is configurable** — never hardcode URLs in components
6. **Performance budget** — initial bundle < 200KB gzipped, LCP < 1.5s
7. **Accessibility baseline** — WCAG 2.1 AA compliance on all interactive elements
8. **Suspense-first** — all route components are lazy-loaded with Suspense boundaries
9. **TypeScript strict mode** — no `any`, explicit return types, `import type` always
10. **Feature-based organization** — domain logic in `features/`, reusable primitives in `components/`
