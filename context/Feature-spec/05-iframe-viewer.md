# Feature Spec — Google Drive Iframe Viewer Design

## Overview

Google Drive iframes are the primary way users view PDF resources. Each iframe must have a dedicated section with proper height, width, centering, and loading states. No API calls — just iframe embeds.

## Iframe Embed Pattern

Google Drive URLs follow this pattern:
```
https://drive.google.com/file/d/{FILE_ID}/preview
```

Or for embedded view:
```
https://drive.google.com/embeddedfolderview?id={FOLDER_ID}
```

## Resource View Page Layout

```
┌──────────────────────────────────────────┐
│              Header                       │
├──────────────────────────────────────────┤
│  Breadcrumbs: Home > Class 3 > Math      │
│                                          │
│  H1: Mathematics — Class 3                │
│  Chapter-wise notes and practice questions│
│                                          │
│  [Class 3] [Mathematics] [PDF]            │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  │   ┌────────────────────────────┐   │  │
│  │   │                            │   │  │
│  │   │   Loading Skeleton         │   │  │
│  │   │   (while iframe loads)     │   │  │
│  │   │                            │   │  │
│  │   └────────────────────────────┘   │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌──────────┐ ┌──────┐ ┌──────────────┐ │
│  │ Download │ │ Share│ │ Open in Tab  │ │
│  └──────────┘ └──────┘ └──────────────┘ │
│                                          │
│  Contributors: Ms. Jyoti                  │
│  Last Updated: January 2026               │
├──────────────────────────────────────────┤
│              Footer                       │
└──────────────────────────────────────────┘
```

## Iframe Container Specifications

### Sizing

| Property | Value | Notes |
|----------|-------|-------|
| Width | 100% of parent (max 900px) | Responsive |
| Height | 70vh (minimum 500px) | Adequate for PDF viewing |
| Max Width | 900px | Prevents overly wide on large screens |
| Border Radius | 12px | Matches design system |
| Border | 1px solid var(--color-border) | Subtle definition |
| Box Shadow | 0 2px 8px rgba(0,0,0,0.1) | Depth |

### Centering

- Container centered with `margin: 0 auto`
- Parent uses flexbox: `display: flex; justify-content: center;`
- Responsive: on mobile, container takes full width minus padding

### Loading State

While iframe loads:
- Show skeleton placeholder (animated gradient)
- Same dimensions as iframe container
- "Loading document..." text below skeleton
- Skeleton fades out when iframe loads

### Error State

If iframe fails to load:
- Show error message: "Unable to load document"
- "Open in new tab" button as fallback
- "Try again" button to reload iframe
- Icon: `ErrorOutline`

## Iframe Component

```tsx
<IframeViewer
  driveUrl="https://drive.google.com/file/d/FILE_ID/preview"
  title="Mathematics - Class 3"
  height="70vh"
  minHeight="500px"
  maxWidth="900px"
/>
```

### Props

```typescript
interface IframeViewerProps {
  driveUrl: string;
  title: string; // For aria-label and iframe title
  height?: string; // Default: '70vh'
  minHeight?: string; // Default: '500px'
  maxWidth?: string; // Default: '900px'
  onLoad?: () => void;
  onError?: () => void;
}
```

### Implementation Details

**Generic Responsive Component:**
The component MUST receive responsive values. Do NOT hardcode `70vh`.

```tsx
import { useMemo } from 'react';

// Custom hook to separate concerns
const useResponsiveIframeConfig = () => {
  const isMobile = useMediaQuery('(max-width: 599px)');
  return useMemo(() => ({
    height: isMobile ? '60vh' : '70vh',
    minHeight: isMobile ? '400px' : '500px',
    maxWidth: isMobile ? '100%' : '900px', // Mobile: fill width minus padding
  }), [isMobile]);
};

// Inside IframeViewer component
const { height, minHeight, maxWidth } = useResponsiveIframeConfig();

return (
  <iframe
    src={driveUrl}
    title={title}
    style={{
      width: '100%',
      height: height,
      minHeight: minHeight,
      maxWidth: maxWidth,
      border: 'none',
      borderRadius: '12px',
    }}
    loading="lazy"
  />
);
```

**Security Note:** `allow="autoplay; encrypted-media"` has been removed as it is unnecessary for Google Drive previews and poses a potential security risk.

## Action Buttons

### Download Button

- Opens Google Drive URL in new tab (`window.open(url, '_blank')`)
- Icon: `Download`
- Label: "Download PDF"
- Primary button style

### Share Button

- Copies current page URL to clipboard
- Shows snackbar: "Link copied to clipboard!"
- Icon: `Share`
- Label: "Share"
- Secondary button style

### Open in New Tab Button

- Opens iframe URL directly in new tab
- Useful if iframe is blocked or slow
- Icon: `OpenInNew`
- Label: "Open in New Tab"
- Text button style

## Mobile Considerations

### Iframe on Mobile

- Height: 60vh (shorter on mobile)
- Min height: 400px
- Full width minus padding (16px each side)
- Horizontal scroll disabled
- Touch-friendly: users can scroll within iframe

### Action Buttons on Mobile

- Stacked vertically or in a row with wrapping
- Full-width buttons on very small screens
- Icons + labels always visible

### Google Drive Mobile Compatibility

- Google Drive iframes work on mobile browsers
- Users can scroll, zoom within the iframe
- Download button provides fallback for viewing issues

## Component Inventory

| Component | Type | Location |
|-----------|------|----------|
| `IframeViewer` | Reusable | `components/IframeViewer/IframeViewer.tsx` |
| `IframeSkeleton` | Reusable | `components/IframeViewer/IframeSkeleton.tsx` |
| `IframeError` | Reusable | `components/IframeViewer/IframeError.tsx` |
| `ResourceViewPage` | Feature entry | `features/viewer/components/ResourceViewPage.tsx` |
| `ActionButtons` | Reusable | `components/IframeViewer/ActionButtons.tsx` |

## Performance

- iframe `loading="lazy"` — only loads when visible
- Skeleton placeholder renders immediately
- No JavaScript execution inside iframe (Google Drive handles it)
- iframe sandbox attributes for security

## Accessibility

- iframe has descriptive `title` attribute
- Action buttons have aria-labels
- Error state is announced to screen readers
- Keyboard accessible: tab through action buttons
- Focus visible on all interactive elements

## Security

- **No `sandbox` attribute required:** Google Drive manages its own security context. Adding `sandbox` might block legitimate functionality.
- No user data passed to iframe
- Google Drive URLs are HTTPS only
- CSP headers allow `frame-src: https://drive.google.com`
