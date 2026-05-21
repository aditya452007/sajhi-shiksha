# Clarification Questions — Sajhi Shiksha Frontend Rebuild

> Please answer all questions below. Number your answers corresponding to the question numbers for easy reference.

---

## 1. Technology Stack

### 1.1 Framework Choice
The existing site uses Next.js/React. The agent skills are configured for **React + TypeScript + TanStack Router + MUI v7 + Suspense-first** architecture. Are you okay with this stack, or do you want a different one?

- **Option A:** React + Vite + TypeScript + TanStack Router + MUI v7 (recommended — matches your skills)
- **Option B:** Next.js (App Router) + TypeScript + TailwindCSS
- **Option C:** Something else (please specify)
A

### 1.2 State Management
For a no-auth, no-database site, do you want:
- **Option A:** TanStack Query only (server state) + useState (local UI state) — lightweight
- **Option B:** Add Zustand for global UI state (theme, preferences, etc.)
- **Option C:** Something else
choose whatever which is light and works seamlessley

### 1.3 Styling Approach
The design research recommends playful, colorful, animated UI. How should we handle styling?
- **Option A:** MUI v7 sx prop + custom theme tokens (matches your skills)
- **Option B:** TailwindCSS (more flexible for custom playful designs)
- **Option C:** CSS Modules / vanilla CSS
- **Option D:** Hybrid — MUI components + Tailwind for custom layouts
d

---

## 2. Content & Data Source

### 2.1 Google Drive Integration
The current site uses Google Drive iframes to embed PDFs/documents. For the new frontend:
- Should we **continue using Google Drive iframes** as-is?
- Or do you want to **fetch Google Drive file metadata** via Google Drive API and render custom cards/previews instead of raw iframes?
- Or a **hybrid** — custom cards that open Google Drive iframes in a modal?
continue with iframe but make sure that each iframe has a dedicated section with right hieght x width center of page etc

### 2.2 Content Updates
Currently the content is hardcoded HTML pages. How should the new site handle content updates?
- **Option A:** Hardcoded JSON/Markdown files in the repo (professor edits files, deploys)
- **Option B:** Google Sheets as a CMS (professor edits a sheet, site reads from it)
- **Option C:** A simple admin JSON file that can be edited
- **Option D:** Something else
harcoded text for now simple larer we can change according to need

### 2.3 Content Volume
There are 20 pages with 69 headings, 111 paragraphs, and 2,340 links. Should we:
- Migrate **all 20 pages** as-is?
- Consolidate/simplify the structure?
- Start with a subset of pages (which ones)?
choose whatever best it would be good if we can migrate and simplify the process for students and teachers 

---

## 3. Pages & Navigation

### 3.1 Current Site Structure
The current site has these main sections:
1. Home
2. Classes 1-5 Resource Material (with sub-pages for each class)
3. Cub and Bulbul
4. Nipun/FLN
5. CMP
6. TBP
7. Miscellaneous
8. Morning Assembly Formats
9. GOI/KVS Rules
10. Question Papers (Class 6-12)
11. Office Formats
12. CBSE/NIOS
13. Time Table
14. KVS Admission
15. Income Tax
16. Contribute
17. About Us

**Questions:**
- Should we keep **all these sections** in the new design?
- Should we **consolidate** some sections (e.g., merge all class resources into one searchable page)?
- Are there sections to **remove** entirely?
consolidate the site and improve the experience in every way possible 

### 3.2 Navigation Style
The current site has dropdown menus. For the new playful design:
- **Option A:** Keep dropdown navigation (familiar, functional)
- **Option B:** Mega-menu with visual category cards
- **Option C:** Sidebar navigation with icons
- **Option D:** Bottom tab bar (mobile-style) + hamburger menu
- **Option E:** Something else
choose acc to screen size like laptop mega menu moblie hamburger menu + bottom tab bar etc choose acc to how humans interact with website

### 3.3 Search Functionality
The current site has a basic search icon. Should the new site have:
- A **prominent search bar** on the homepage?
- **Filter by class, subject, resource type**?
- **Full-text search** across all content?
- **None of the above** — keep it simple?
yes filter and prominent search bar 

---

## 4. Design & Visual Direction

### 4.1 Playfulness Level
The design research covers Duolingo-level playfulness. On a scale of 1-10:
- **1-3:** Clean, professional, subtle animations
- **4-6:** Friendly, colorful, some micro-interactions
- **7-8:** Very playful, characters, confetti, gamification elements
- **9-10:** Duolingo-level — mascots, streaks, levels, celebrations

**Where should Sajhi Shiksha fall?** (Note: This is for students AND professors/teachers)
5 because if we go higher we need auth database etc which we do not want to add such complexity for now keep it stupidly simple 

### 4.2 Target Audience
Who is the PRIMARY user?
- **Option A:** Students (K-12) — design for young learners
- **Option B:** Teachers/Professors — design for educators
- **Option C:** Both equally — need to balance both
- **Option D:** Parents also use it
both mainly students 

### 4.3 Age Group
If students are primary users, what age group?
- Classes 1-5 (ages 6-11)?
- Classes 6-12 (ages 11-18)?
- All ages?
class 1 - 12

### 4.4 Branding
- Should we keep the **"Sajhi Shiksha"** name and logo concept?
- The current site has a starry sky dark header — should we keep this or go fully bright/colorful?
- Any brand colors we MUST use? (Current site uses #d4d4d4, #2e2e2e, #eeeeee, blue accents)
yes keep the name and logo but replace the entire ui with our ui skills 

### 4.5 Language
- Is the site **English only**, **Hindi only**, or **bilingual** (Hindi + English)?
- The current site name "Sajhi Shiksha" is Hindi — should navigation/content be in Hindi?
for now english only 

---

## 5. Interactivity Features

### 5.1 Contribution Flow
The current site has a "Contribute" section where users can:
- Submit resources via email
- Donate resources
- Monetary contribution

For the new site:
- Should contribution be a **form** (upload file, fill details)?
- Or keep it as **email-based** (mailto link)?
- Should there be a **resource submission form** that stores submissions somewhere?
email based for now

### 5.2 Feedback/Rating
Should users be able to:
- **Rate resources** (star rating, thumbs up/down)?
- **Comment** on resources?
- **Report issues** with links/files?
- **None of the above** — keep it read-only?
none of aboce beacuse it require maintainnace

### 5.3 Download Tracking
- Should we track which resources are most downloaded/popular?
- Should we show "Most Popular Resources" on the homepage?
no 

### 5.4 Bookmarks/Favorites
Since there's no login:
- Should we offer **local storage bookmarks** (browser-based, no account needed)?
- Or skip this feature entirely?
skip for now overkill

---

## 6. Performance & Technical Constraints

### 6.1 Hosting
Where will the new frontend be hosted?
- **Option A:** Vercel / Netlify (static hosting, free tier)
- **Option B:** GitHub Pages
- **Option C:** Custom server
- **Option D:** Undecided
undecided

### 6.2 Domain
- Will it use the **same domain** (sajhishiksha.in)?
- Or a **new domain/subdomain**?
same domain but do not hardcode it so that future domain change is not affected

### 6.3 Performance Target
- Should we target **Lighthouse 90+** across all metrics?
- Is the current ~3s LCP acceptable, or should we aim for <1.5s?
yes performance is critical 

### 6.4 Mobile Support
- Should we design **mobile-first**?
- Or desktop-first with mobile responsive?
- What's the expected mobile vs desktop usage split?
yes mobile first because students aminly are i=on mobile but also make it work on laptop and tablet

---

## 7. Animation & Motion

### 7.1 Animation Library
For playful micro-interactions (confetti, hover effects, page transitions):
- **Option A:** Framer Motion (React-friendly, powerful)
- **Option B:** CSS animations + transitions (lighter, simpler)
- **Option C:** GSAP (professional-grade, heavier)
- **Option D:** Lottie (for complex animations)
chose best and lightwieght without ai overkill 

### 7.2 Animation Intensity
- **Option A:** Subtle — hover effects, smooth transitions only
- **Option B:** Moderate — page transitions, scroll animations, micro-interactions
- **Option C:** Heavy — character animations, confetti celebrations, particle effects
b

---

## 8. Accessibility

### 8.1 Accessibility Requirements
The design research emphasizes accessibility. Should we:
- Target **WCAG 2.1 AA** compliance?
- Support **reduced motion** preferences?
- Ensure **keyboard navigation** throughout?
- Support **screen readers**?
choose the best option or hybrid but no ai overkill 

### 8.2 Font Size
- Should we offer a **font size toggle** (small/medium/large)?
- Or rely on browser zoom?
browser zoom for now

---

## 9. Scope & Phasing

### 9.1 MVP Scope
What should be in **Phase 1 (MVP)**?
- **Option A:** Homepage + all content pages (full migration)
- **Option B:** Homepage + top 5 most-used sections
- **Option C:** Homepage + Classes 1-5 + Question Papers only
- **Option D:** Something else
choose the best 

### 9.2 Timeline
- Is there a **deadline** for this project?
- Should we build iteratively (phase by phase) or all at once?
no deadline but during vibecoding project useually finish in a days

### 9.3 Who Will Review
- Will the **professor** review the design before implementation?
- Should we create **wireframes/mockups** first, or go straight to code?
yes professor will review but no site change likely would be done so no worry but keep your guards up

---

## 10. Miscellaneous

### 10.1 Analytics
- Should we keep **Google Analytics** tracking?
- Or use a privacy-friendly alternative (Plausible, Umami)?
- Or no analytics?
google analytics

### 10.2 SEO
- Should we optimize for **search engines** (meta tags, structured data, sitemap)?
- Is discoverability important, or is this primarily for known users?
yes seo optimize  llms.txt robot.txt sitemap.xml html meta tags for whatsapp facebook etc.

### 10.3 PWA
- Should the site be a **Progressive Web App** (installable on mobile, offline support)?
- Or just a regular responsive website?
regular website

### 10.4 Dark Mode
- Should we support **dark mode** toggle?
- Or light mode only?
support both toggles

### 10.5 Existing Content Format
The current site content is in HTML. Do you have:
- The **original source files** (if it's a custom-built site)?
- Or should we **scrape and convert** the existing HTML to our new format?
not the original source code no lets build from scratch it is more easy that way but i would like you to extract the iframe url for eacch page 

---

## 11. Feature-Specific Questions

### 11.1 Homepage
The current homepage shows "What are you looking for?" with category links. Should the new homepage have:
- A **hero section** with search bar?
- **Featured/popular resources** carousel?
- **Category cards** with icons?
- **Recent updates** section?
- **Statistics** (total resources, classes covered, etc.)?
built acc to your choice but no ai overkill to build all only essential and improved secctions

### 11.2 Resource Cards
How should individual resources be displayed?
- **Option A:** Card grid with icon, title, description, download button
- **Option B:** List view with details
- **Option C:** Table view (sortable, filterable)
- **Option D:** Mixed — cards on homepage, table on category pages
likely d 

### 11.3 PDF Viewing
When a user clicks a PDF resource:
- **Option A:** Open Google Drive iframe in a modal on the same page
- **Option B:** Navigate to a dedicated resource page with iframe
- **Option C:** Direct download link
- **Option D:** Open in new tab
choose best 

### 11.4 Class-Specific Pages
For Classes 1-5, each class has its own page with subjects. Should we:
- Keep **separate pages per class**?
- Create a **unified class selector** with tabbed interface?
- Use a **filter-based approach** (select class, see all resources)?
depend on drive iframe choose best option 

---

**Please answer these questions and I'll create comprehensive feature specification markdown files based on your responses.**
