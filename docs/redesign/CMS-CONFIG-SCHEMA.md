# CMS Config Schema — Sajhi Shiksha

## Purpose

Replace **all hardcoded content** (categories, resources, navigation, homepage sections) with a **single flat JSON file** (`frontend/src/data/site-content.json`) that the professor can manually edit. The React codebase will read this file at build time and render accordingly.

No database. No admin panel. Just one file.

---

## File Location

```
frontend/src/data/site-content.json
```

---

## How It Works

1. The professor opens `site-content.json` in any text editor (Notepad, VS Code, etc.)
2. Edits the values — titles, routes, drive URLs, enabled/disabled toggles
3. Saves the file
4. The website rebuilds and reflects changes

---

## Schema Reference

### 1. `site` — Global Site Settings

```jsonc
"site": {
    "name": "Sajhi Shiksha",
    "tagline": "Sharing Knowledge — From You, For You",
    "contactEmail": "Mamta07691@gmail.com",
    "whatsappGroupUrl": "https://chat.whatsapp.com/...",
    "whatsappNumber": "+91XXXXXXXXXX"
}
```

| Field | Type | What it does |
|-------|------|-------------|
| `name` | string | Site name in header/footer |
| `tagline` | string | Subtitle shown on homepage |
| `contactEmail` | string | Email in About page |
| `whatsappGroupUrl` | string | Full WhatsApp invite link for the floating button |
| `whatsappNumber` | string | Fallback number (used if group URL is empty) |

### 2. `homepage` — Hero Section

```jsonc
"homepage": {
    "heroTitle": "What do you want to learn today?",
    "heroHighlightWord": "learn",
    "heroSubtitle": "Free study materials, question papers, and resources for KVS students."
}
```

### 3. `sections` — The 3 Main Doorways

#### 3a. `students`

```jsonc
"sections": {
    "students": {
        "enabled": true,
        "title": "For Students",
        "subtitle": "Mathematics resources for Classes 6 to 12",
        "icon": "School",
        "buttonColor": "var(--color-blue)",
        "redirectRoute": "/for-students",
        "filterParams": {
            "class": ["6", "7", "8", "9", "10", "11", "12"],
            "subject": ["Mathematics"]
        }
    }
}
```

Professor edits:
- `enabled`: set `false` to hide this section entirely
- `title` / `subtitle`: change button text
- `redirectRoute`: where the button goes
- `filterParams`: which classes/subjects to show on the student page

#### 3b. `teachers`

```jsonc
"teachers": {
    "enabled": true,
    "title": "For Teachers",
    "subtitle": "Programs, Formats & Rules, Admissions, and more",
    "icon": "ChalkboardTeacher",
    "buttonColor": "var(--color-green)",
    "redirectRoute": "/for-teachers",
    "categoryFilters": ["programs", "formats", "admissions"]
}
```

`categoryFilters` controls which resource categories appear in the teacher search results.

#### 3c. `mathLovers`

```jsonc
"mathLovers": {
    "enabled": true,
    "title": "For Math Lovers",
    "subtitle": "Explore the beauty of mathematics",
    "icon": "Calculator",
    "buttonColor": "var(--color-purple)",
    "redirectRoute": "/for-math-lovers",
    "blocks": [
        {
            "id": "ml-block-1",
            "title": "Interesting Math Facts",
            "description": "Fun facts about numbers and patterns",
            "driveUrl": "https://docs.google.com/document/d/.../edit",
            "lastUpdated": "2026-05-22"
        },
        {
            "id": "ml-block-2",
            "title": "Puzzle of the Week",
            "description": "Weekly math puzzles with solutions",
            "driveUrl": "https://docs.google.com/document/d/.../edit",
            "lastUpdated": "2026-05-22"
        }
    ]
}
```

**`blocks` array**: Each block is a Google Doc embedded as an iframe. The professor adds/removes entries here to control how many blocks appear on the Math Lovers page. Each block requires:
- `id`: unique identifier (use `ml-block-1`, `ml-block-2`, etc.)
- `title`: heading shown above the iframe
- `description`: short text below the title
- `driveUrl`: the Google Docs **share link** (must be "Anyone with link can view")
- `lastUpdated`: ISO date string

### 4. `navigation` — Header & Footer Links

```jsonc
"navigation": {
    "headerLinks": [
        { "label": "Home", "route": "/" },
        { "label": "Students", "route": "/for-students" },
        { "label": "Teachers", "route": "/for-teachers" },
        { "label": "Math Lovers", "route": "/for-math-lovers" },
        { "label": "Contribute", "route": "/contribute" },
        { "label": "About", "route": "/about" }
    ],
    "footerGroups": [
        {
            "heading": "For Students",
            "links": [
                { "label": "Classes 6-12 Maths", "route": "/for-students" }
            ]
        },
        {
            "heading": "For Teachers",
            "links": [
                { "label": "Programs", "route": "/resources/programs" },
                { "label": "Formats & Rules", "route": "/resources/formats" },
                { "label": "Admissions", "route": "/resources/admissions" }
            ]
        },
        {
            "heading": "More",
            "links": [
                { "label": "About Us", "route": "/about" },
                { "label": "Contribute", "route": "/contribute" }
            ]
        }
    ]
}
```

### 5. `contact` — About Page

```jsonc
"contact": {
    "showProfessorNames": false,
    "email": "Mamta07691@gmail.com",
    "showContributors": true
}
```

| Field | What it does |
|-------|-------------|
| `showProfessorNames` | Set `false` to hide all professor names everywhere |
| `showContributors` | Set `false` to hide "Behind Sajhi Shiksha" team section entirely |

---

## Editing Rules for the Professor

1. **Do not change** `id` values inside arrays — they are used for routing
2. **Do not remove** commas between object entries
3. **Do not change** the key names (words before the colon like `"title"`)
4. **Only change** the values (words after the colon like `"Sajhi Shiksha"`)
5. **Boolean values** must be `true` or `false` (no quotes)
6. **Strings** must be inside double quotes `"like this"`
7. **Add new blocks** by copying an existing block entry and pasting it inside the `blocks` array

---

## Example: Adding a New Math Lovers Block

Copy this inside `"blocks": [ ... ]` (between the square brackets):

```json
{
    "id": "ml-block-3",
    "title": "My New Block Title",
    "description": "Short description here",
    "driveUrl": "https://docs.google.com/document/d/PASTE_YOUR_DOC_ID/edit",
    "lastUpdated": "2026-05-22"
}
```

Then add a comma after the previous block's closing `}`.

---

## TypeScript Interface (for Developers)

```typescript
interface SiteContent {
    site: {
        name: string;
        tagline: string;
        contactEmail: string;
        whatsappGroupUrl: string;
        whatsappNumber: string;
    };
    homepage: {
        heroTitle: string;
        heroHighlightWord: string;
        heroSubtitle: string;
    };
    sections: {
        students: SectionConfig & { filterParams: { class: string[]; subject: string[] } };
        teachers: SectionConfig & { categoryFilters: string[] };
        mathLovers: SectionConfig & { blocks: ContentBlock[] };
    };
    navigation: {
        headerLinks: NavLink[];
        footerGroups: { heading: string; links: NavLink[] }[];
    };
    contact: {
        showProfessorNames: boolean;
        email: string;
        showContributors: boolean;
    };
}
```
