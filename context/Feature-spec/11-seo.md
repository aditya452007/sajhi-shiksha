# Feature Spec — SEO and Meta Tags

## Overview

Full SEO optimization for discoverability. Includes meta tags, Open Graph, Twitter Cards, structured data, robots.txt, sitemap.xml, and llms.txt.

## HTML Meta Tags

### Basic Meta Tags (in index.html)

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Sajhi Shiksha — Free Study Materials for KVS Students</title>
  <meta name="description" content="Free educational resources, study materials, question papers, and formats for KVS students (Classes 1-12). No login required. Sharing Knowledge — From You, For You." />
  <meta name="keywords" content="KVS, Kendriya Vidyalaya, study materials, question papers, class 1-5, class 6-12, education, free resources, India" />
  <meta name="author" content="Sajhi Shiksha" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />

  <link rel="canonical" href="https://www.sajhishiksha.in/" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
</head>
```

### Open Graph (Facebook, WhatsApp, LinkedIn)

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.sajhishiksha.in/" />
<meta property="og:title" content="Sajhi Shiksha — Free Study Materials for KVS Students" />
<meta property="og:description" content="Free educational resources, study materials, question papers, and formats for KVS students (Classes 1-12). No login required." />
<meta property="og:image" content="https://www.sajhishiksha.in/images/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Sajhi Shiksha" />
<meta property="og:locale" content="en_US" />
```

### Twitter Card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://www.sajhishiksha.in/" />
<meta name="twitter:title" content="Sajhi Shiksha — Free Study Materials for KVS Students" />
<meta name="twitter:description" content="Free educational resources, study materials, question papers, and formats for KVS students (Classes 1-12)." />
<meta name="twitter:image" content="https://www.sajhishiksha.in/images/og-image.png" />
```

### WhatsApp Specific

WhatsApp uses Open Graph tags. Ensure:
- `og:image` is 1200x630px (optimal for WhatsApp preview)
- `og:title` is under 60 characters
- `og:description` is under 200 characters

### Per-Page Meta Tags

Each route should have its own meta tags:

| Route | Title | Description |
|-------|-------|-------------|
| `/` | Sajhi Shiksha — Free Study Materials for KVS Students | Main description |
| `/resources` | Resources — Sajhi Shiksha | Browse all study materials and resources |
| `/resources/classes-1-5` | Classes 1-5 Resources — Sajhi Shiksha | Study materials for primary classes |
| `/resources/classes-6-12` | Classes 6-12 Resources — Sajhi Shiksha | Question papers and resources for secondary classes |
| `/viewer/:id` | {Resource Title} — Sajhi Shiksha | View and download {resource title} |
| `/search` | Search Resources — Sajhi Shiksha | Search across all study materials |
| `/contribute` | Contribute — Sajhi Shiksha | Share your knowledge with fellow teachers |
| `/about` | About Us — Sajhi Shiksha | Learn about our mission and team |

## Structured Data (JSON-LD)

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sajhi Shiksha",
  "url": "https://www.sajhishiksha.in",
  "description": "Free educational resources for KVS students",
  "sameAs": []
}
```

### WebSite Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sajhi Shiksha",
  "url": "https://www.sajhishiksha.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.sajhishiksha.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### EducationalOrganization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Sajhi Shiksha",
  "description": "Free educational resource-sharing platform for KVS students and teachers",
  "url": "https://www.sajhishiksha.in",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "KVS students Classes 1-12"
  }
}
```

## robots.txt

```
User-agent: *
Allow: /

Sitemap: https://www.sajhishiksha.in/sitemap.xml
```

## sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.sajhishiksha.in/</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.sajhishiksha.in/resources</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.sajhishiksha.in/resources/classes-1-5</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.sajhishiksha.in/resources/classes-6-12</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.sajhishiksha.in/search</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.sajhishiksha.in/contribute</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.sajhishiksha.in/about</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

## llms.txt

```
# Sajhi Shiksha

Sajhi Shiksha is a free, open educational resource-sharing platform for KVS (Kendriya Vidyalaya Sangathan) students and teachers.

## What is Sajhi Shiksha?

A website that provides free access to study materials, question papers, assembly formats, government rule documents, and teacher-contributed resources for Classes 1-12. No login required.

## Key Features

- Free study materials for Classes 1-12
- Question papers and answer keys
- Morning assembly formats
- GOI/KVS rules and office formats
- Teacher-contributed resources
- Google Drive embedded viewing
- Search and filter functionality
- Mobile-friendly design

## Content Categories

1. Classes 1-5: Primary class study materials (Math, English, Hindi, EVS)
2. Classes 6-12: Question papers and resources by subject
3. Programs: Nipun/FLN, CMP, TBP, Cub & Bulbul
4. Formats: Morning assembly, GOI/KVS rules, office formats
5. Admissions: CBSE/NIOS, KVS admission info, income tax guide

## How to Contribute

Email resources to Mamta07691@gmail.com with subject, class, and description.

## URL Structure

- Homepage: https://www.sajhishiksha.in/
- Resources: https://www.sajhishiksha.in/resources
- Search: https://www.sajhishiksha.in/search
- Contribute: https://www.sajhishiksha.in/contribute
- About: https://www.sajhishiksha.in/about
```

## Google Analytics

```html
<!-- Google Analytics (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

- Analytics ID stored in `site-config.json`
- Page views tracked on route changes
- No user-level tracking (privacy-friendly)

## Implementation

### Vite Plugin for SEO

Use `vite-plugin-html` or manual injection for per-page meta tags.

### React Helmet Alternative

Since this is a SPA, use a lightweight approach:

```typescript
// In each route component
useEffect(() => {
  document.title = 'Resources — Sajhi Shiksha';
  // Update meta tags
  document.querySelector('meta[name="description"]')?.setAttribute('content', '...');
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', '...');
}, []);
```

Or use a custom hook:

```typescript
function useSEO({ title, description, ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title;
    // Update all meta tags
  }, [title, description, ogImage]);
}
```

## OG Image

Create `public/images/og-image.png`:
- Size: 1200x630px
- Content: Sajhi Shiksha logo + tagline + brief description
- Design: Clean, colorful, matches site theme
- Format: PNG (optimized)
