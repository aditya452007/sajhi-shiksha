# Project Overview — Sajhi Shiksha

## Overview

Sajhi Shiksha is a free, open educational resource-sharing platform built for students (Classes 1-12) and teachers in the KVS (Kendriya Vidyalaya Sangathan) system. The site provides access to study materials, question papers, assembly formats, government rule documents, and teacher-contributed resources — all embedded via Google Drive iframes. No login, no database, no authentication. Content is hardcoded as JSON/Markdown and served as a static frontend.

Tagline: **"Sharing Knowledge — From You, For You"**

## Goals

1. **Replace the existing outdated UI** with a modern, playful, mobile-first design
2. **Consolidate 20 scattered pages** into a simplified, intuitive navigation structure
3. **Make resource discovery effortless** with prominent search and filters
4. **Maintain zero complexity** — no auth, no database, no server-side logic
5. **Achieve Lighthouse 90+** across all performance metrics
6. **Full SEO optimization** for discoverability

## Core User Flow

1. Student/Teacher lands on homepage
2. Sees category cards or uses search bar
3. Filters by class, subject, or resource type
4. Clicks a resource → views Google Drive iframe in a dedicated viewer section
5. Can download or share the resource
6. Optionally navigates to Contribute page to submit resources via email

## Features

### Resource Discovery & Viewing
- Homepage with category cards, search bar, and quick-access sections
- Full-text search across all resource titles and descriptions
- Filter by class (1-12), subject, resource type
- Google Drive iframe viewer with proper sizing and centering
- Resource cards on listing pages, detailed view on resource pages

### Navigation
- Mega-menu with visual category cards on desktop
- Hamburger menu + bottom tab bar on mobile
- Breadcrumb navigation for deep pages
- Responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)

### Content Sections (Consolidated)
1. **Classes 1-5** — Unified class selector with tabbed interface
2. **Classes 6-12** — Question papers and resource material
3. **Programs** — Nipun/FLN, CMP, TBP, Cub & Bulbul, Miscellaneous
4. **Formats & Rules** — Morning Assembly, GOI/KVS Rules, Office Formats
5. **Admissions & Services** — CBSE/NIOS, KVS Admission, Income Tax, Time Table
6. **Contribute** — Email-based resource submission
7. **About Us** — Mission, contributors, contact

### Design & UX
- Playfulness level 5: friendly, colorful, subtle micro-interactions
- Dark/Light mode toggle
- Mobile-first responsive design
- WCAG 2.1 AA accessibility
- Moderate animations: page transitions, hover effects, scroll reveals
- Browser zoom for font sizing

### SEO & Analytics
- llms.txt, robots.txt, sitemap.xml
- HTML meta tags for WhatsApp, Facebook, Twitter cards
- Google Analytics tracking

## Scope

### In Scope
- Full frontend rebuild from scratch
- All 20 existing pages migrated and consolidated
- Google Drive iframe integration
- Search and filter functionality
- Dark/Light mode
- Responsive design (mobile, tablet, desktop)
- SEO optimization
- Google Analytics

### Out of Scope
- User authentication / login
- Database or backend
- Resource ratings, comments, reviews
- Download tracking / analytics per resource
- Bookmarks / favorites
- PWA / offline support
- Admin panel or CMS
- Resource upload functionality (email-based only)

## Success Criteria

- Lighthouse score 90+ across Performance, Accessibility, Best Practices, SEO
- Mobile-first design that works seamlessly on phones
- All existing content accessible within 3 clicks from homepage
- Google Drive iframes render correctly with proper sizing
- Dark/Light mode toggle works without layout shift
- Page load time < 1.5s LCP
- Zero JavaScript errors in production
