# JSON Data Structure - Website Content

## Scrape Structure (scrape_structure.json)

```json
{
  "total_pages": 20,
  "total_headings": 69,
  "total_paragraphs": 111,
  "total_links": 2340,
  "pages": [
    {
      "url": "https://www.sajhishiksha.in/home",
      "title": "Sajhi Shiksha",
      "path": "/home",
      "headings_count": 12,
      "paragraphs_count": 1,
      "links_count": 121,
      "first_heading": "Sajhi Shiksha"
    },
    {
      "url": "https://www.sajhishiksha.in/home/classes-1-5-resource-material",
      "title": "Sajhi Shiksha - Classes 1-5 Resource Material",
      "path": "/home/classes-1-5-resource-material",
      "headings_count": 12,
      "paragraphs_count": 8,
      "links_count": 121,
      "first_heading": "Content for Classes 1-5"
    },
    ...
  ]
}
```

## Full Content Structure (scrape_full_content.json)

```json
{
  "https://www.sajhishiksha.in/home": {
    "url": "https://www.sajhishiksha.in/home",
    "title": "Sajhi Shiksha",
    "headings": [
      {
        "level": "h1",
        "text": "Sajhi Shiksha",
        "order": 0
      },
      {
        "level": "h2",
        "text": "Sharing Knowledge",
        "order": 1
      },
      {
        "level": "h1",
        "text": "What are you looking for?",
        "order": 2
      },
      {
        "level": "h2",
        "text": "Content for Classes 1 -5",
        "order": 3
      },
      {
        "level": "h2",
        "text": "Morning Assembly Formats",
        "order": 4
      },
      {
        "level": "h2",
        "text": "Government Employee Rules (GOI/KVS)",
        "order": 5
      },
      {
        "level": "h2",
        "text": "Question Paper and Resource Material(Class 6-12)",
        "order": 6
      },
      {
        "level": "h2",
        "text": "Office Related Formats",
        "order": 7
      },
      {
        "level": "h2",
        "text": "CBSE/NIOS Formats",
        "order": 8
      },
      {
        "level": "h2",
        "text": "Time Table",
        "order": 9
      },
      {
        "level": "h2",
        "text": "KVS Admission",
        "order": 10
      },
      {
        "level": "h2",
        "text": "Income Tax",
        "order": 11
      }
    ],
    "paragraphs": [
      "From you , For You"
    ],
    "lists": [
      "Cub and Bulbul",
      "Nipun / FLN",
      "Class 1",
      "Class 2",
      "Class 3",
      "Class 4",
      "Class 5",
      "CMP",
      "TBP",
      "Miscellaneous",
      "Morning Assembly Formats",
      "GOI/KVS Rules",
      "Hindi (6-10)",
      "Hindi (11-12)",
      "Maths (6-10)",
      "Maths (11-12)",
      "Science",
      "Social Science",
      "Sanskrit",
      "Physics",
      "Biology",
      "CS/IP",
      "Accountancy / B.St",
      "Office Formats",
      "CBSE/NIOS",
      "Time Table",
      "Admission",
      "Income Tax"
    ],
    "links": [
      {
        "text": "Content for Classes 1 -5",
        "url": "/home/classes-1-5-resource-material",
        "full_url": "https://www.sajhishiksha.in/home/classes-1-5-resource-material",
        "is_internal": true
      },
      {
        "text": "Morning Assembly Formats",
        "url": "/home/morning-assembly-formats",
        "full_url": "https://www.sajhishiksha.in/home/morning-assembly-formats",
        "is_internal": true
      },
      {
        "text": "Government Employee Rules (GOI/KVS)",
        "url": "/home/goikvs-rules",
        "full_url": "https://www.sajhishiksha.in/home/goikvs-rules",
        "is_internal": true
      },
      {
        "text": "Question Papers and Resource Material",
        "url": "/home/question-papers-and-resource-material",
        "full_url": "https://www.sajhishiksha.in/home/question-papers-and-resource-material",
        "is_internal": true
      },
      {
        "text": "Office Related Formats",
        "url": "/home/office-formats",
        "full_url": "https://www.sajhishiksha.in/home/office-formats",
        "is_internal": true
      },
      {
        "text": "CBSE/NIOS Formats",
        "url": "/home/cbsenios",
        "full_url": "https://www.sajhishiksha.in/home/cbsenios",
        "is_internal": true
      },
      {
        "text": "Time Table",
        "url": "/home/time-table",
        "full_url": "https://www.sajhishiksha.in/home/time-table",
        "is_internal": true
      },
      {
        "text": "KVS Admission",
        "url": "/home/admission",
        "full_url": "https://www.sajhishiksha.in/home/admission",
        "is_internal": true
      },
      {
        "text": "Income Tax",
        "url": "/home/income-tax",
        "full_url": "https://www.sajhishiksha.in/home/income-tax",
        "is_internal": true
      },
      {
        "text": "Feedback",
        "url": "/contribute/feedback",
        "full_url": "https://www.sajhishiksha.in/contribute/feedback",
        "is_internal": true
      },
      {
        "text": "Contribute",
        "url": "/contribute",
        "full_url": "https://www.sajhishiksha.in/contribute",
        "is_internal": true
      }
    ],
    "buttons": [],
    "forms": [],
    "images": [],
    "tables": [],
    "all_text": [
      "Sajhi Shiksha",
      "Sharing Knowledge",
      "What are you looking for?",
      "Content for Classes 1 -5",
      "Morning Assembly Formats",
      "Government Employee Rules (GOI/KVS)",
      "Question Paper and Resource Material(Class 6-12)",
      "Office Related Formats",
      "CBSE/NIOS Formats",
      "Time Table",
      "KVS Admission",
      "Income Tax",
      "From you , For You"
    ],
    "sections": []
  },
  "https://www.sajhishiksha.in/home/classes-1-5-resource-material": {
    "url": "https://www.sajhishiksha.in/home/classes-1-5-resource-material",
    "title": "Sajhi Shiksha - Classes 1-5 Resource Material",
    "headings": [
      {
        "level": "h1",
        "text": "Sajhi Shiksha",
        "order": 0
      },
      {
        "level": "h2",
        "text": "Content for Classes 1-5",
        "order": 1
      },
      {
        "level": "h2",
        "text": "Cub and Bulbul",
        "order": 2
      },
      {
        "level": "h2",
        "text": "Nipun / FLN",
        "order": 3
      },
      {
        "level": "h2",
        "text": "Class 1",
        "order": 4
      },
      {
        "level": "h2",
        "text": "Class 2",
        "order": 5
      },
      {
        "level": "h2",
        "text": "Class 3",
        "order": 6
      },
      {
        "level": "h2",
        "text": "Class 4",
        "order": 7
      },
      {
        "level": "h2",
        "text": "Class 5",
        "order": 8
      },
      {
        "level": "h2",
        "text": "Common Minimum Programme (C.M.P.)",
        "order": 9
      },
      {
        "level": "h2",
        "text": "Toy Based Pedagogy (T.B.P.)",
        "order": 10
      },
      {
        "level": "h2",
        "text": "Miscellaneous",
        "order": 11
      }
    ],
    "paragraphs": [
      "Home> For Classes 1-5",
      "This Section is managed by",
      "Ms. Jyoti,",
      "Head Mistress,",
      "KV Gorakhpur",
      "Heartfelt Thanks to our Contributors ❤️",
      "Mr. Ajit Yadav, Primary Teacher, KV Loktak",
      "Mr. Bhupesh Sharma, Primary Teacher, KV Loktak"
    ],
    "lists": [ ... ],
    "links": [ ... ],
    "buttons": [],
    "forms": [],
    "images": [],
    "tables": [],
    "all_text": [ ... ],
    "sections": []
  }
}
```

## API Endpoints Documented

### No Public API Found
The website does **NOT expose public REST API endpoints** for programmatic content access. Instead:

1. **HTML Pages:** Standard HTTP GET requests to URLs
2. **Google Drive:** Content embedded via iframes
3. **Contact:** Email-based submissions (Mamta07691@gmail.com)

## Data Access Methods

### Method 1: Direct HTTP Requests
```
GET https://www.sajhishiksha.in/home
GET https://www.sajhishiksha.in/home/classes-1-5-resource-material
GET https://www.sajhishiksha.in/home/question-papers-and-resource-material/hindi-6-10
```

### Method 2: Web Scraping (Used)
```python
import requests
from bs4 import BeautifulSoup

url = "https://www.sajhishiksha.in/home"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
# Extract content as needed
```

### Method 3: Google Drive API (For embedded content)
```
# Requires access token and folder ID
GET https://www.googleapis.com/drive/v3/files?q=parents='FOLDER_ID'
Authorization: Bearer ACCESS_TOKEN
```

## Content Format Standards

### URL Format
```
https://www.sajhishiksha.in/[path-slug]
https://www.sajhishiksha.in/home/[category-slug]
https://www.sajhishiksha.in/home/[category-slug]/[subcategory-slug]
```

### Link Format
```json
{
  "text": "Link Display Text",
  "url": "/relative/path",
  "full_url": "https://www.sajhishiksha.in/absolute/path",
  "is_internal": true
}
```

### Heading Format
```json
{
  "level": "h1|h2|h3|h4|h5|h6",
  "text": "Heading Text",
  "order": 0
}
```

## Complete Page URLs (20 Crawled)

```
1. https://www.sajhishiksha.in/home
2. https://www.sajhishiksha.in/home/classes-1-5-resource-material
3. https://www.sajhishiksha.in/home/classes-1-5-resource-material/cub-and-bulbul
4. https://www.sajhishiksha.in/home/classes-1-5-resource-material/nipun-fln
5. https://www.sajhishiksha.in/home/classes-1-5-resource-material/class-1
6. https://www.sajhishiksha.in/home/classes-1-5-resource-material/class-2
7. https://www.sajhishiksha.in/home/classes-1-5-resource-material/class-3
8. https://www.sajhishiksha.in/home/classes-1-5-resource-material/class-4
9. https://www.sajhishiksha.in/home/classes-1-5-resource-material/class-5
10. https://www.sajhishiksha.in/home/classes-1-5-resource-material/cmp
11. https://www.sajhishiksha.in/home/classes-1-5-resource-material/tbp
12. https://www.sajhishiksha.in/home/classes-1-5-resource-material/miscellaneous
13. https://www.sajhishiksha.in/home/morning-assembly-formats
14. https://www.sajhishiksha.in/home/goikvs-rules
15. https://www.sajhishiksha.in/home/question-papers-and-resource-material
16. https://www.sajhishiksha.in/home/question-papers-and-resource-material/hindi-6-10
17. https://www.sajhishiksha.in/home/question-papers-and-resource-material/hindi-11-12
18. https://www.sajhishiksha.in/home/question-papers-and-resource-material/maths-6-10
19. https://www.sajhishiksha.in/home/question-papers-and-resource-material/maths-11-12
20. https://www.sajhishiksha.in/home/question-papers-and-resource-material/science
```

## Export Formats Available

### JSON Export
- `scrape_structure.json` - Overview statistics
- `scrape_full_content.json` - Complete data dump

### Markdown Export
- `info.md` - Human-readable website structure
- `website_analysis.md` - Detailed page analysis
- `API_NETWORK_ANALYSIS.md` - Technical details
- `EXTRACTION_SUMMARY.md` - Complete summary
- `JSON_DATA_STRUCTURE.md` - This document

### Python Script
- `simple_scraper.py` - Reusable scraper for future updates
