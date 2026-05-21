# ERROR-HANDLING.md

> **Purpose:** Defines every possible error state, how to catch it, how to render it, and how to recover from it. Prevents the AI from creating a "broken" app that crashes or shows blank screens.
> **Target Audience:** AI Agents, QA Engineers.

---

## 1. The Golden Rule of Error Handling

**"If the user sees a blank screen or a stack trace, we have failed."**

Every error in the app MUST be caught and MUST show a user-friendly message or fallback UI. No unhandled exceptions should ever reach the user.

---

## 2. Error Taxonomy (How things break)

| Category | Cause | User Impact | Recovery |
| :--- | :--- | :--- | :--- |
| **Render Error** | Bug in code (TypeError, ReferenceError) | Blank screen or half-rendered page | Reload page (Error Boundary fallback) |
| **Data Loading Error** | `resources.json` missing or malformed | "No resources found" or crash | Show "Data unavailable" error, prompt reload |
| **Resource Not Found** | User navigates to `/:resourceId` that doesn't exist | "Page not found" | Show `404` page, suggest browsing |
| **Iframe Load Error** | Google Drive link broken, blocked, or network failure | Empty iframe or broken preview | Show retry button, "Open in new tab" fallback |
| **Search Error** | Search algorithm throws (rare, but possible) | Search results don't update | Clear search input, show "Something went wrong" |
| **Network Error** | Assets (images, fonts) fail to load | Broken images, text fallback | Use system fonts, show placeholder images |

---

## 3. The Fallback UI (The "Offline Paper" Pattern)

For a student on a slow 2G connection or a teacher on a low-end device, the app must feel reliable even when things break.
**The Pattern:** Instead of a generic "Error" text, show a friendly, localized, and actionable fallback.

**Example (Iframe Error):**
```
┌──────────────────────────────────┐
│                                  │
│   [Document Icon]                │
│                                  │
│   Oops! We can't preview this.   │
│                                  │
│   The file might be unavailable  │
│   or your connection is slow.    │
│                                  │
│   [Try Again]  [Open in New Tab] │
│                                  │
└──────────────────────────────────┘
```

---

## 4. Implementation by Category

### 4.1. Render Errors (The "Safety Net")
**Tool:** React Error Boundaries.
**Rule:** Wrap every page-level component (`HomePage`, `ResourcesPage`, `AboutPage`, etc.) in a `PageErrorBoundary`. Wrap the entire app in a `RootErrorBoundary`.

**`src/components/error/PageErrorBoundary.tsx`:**
```tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class PageErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to our internal logger (not console!)
    logger.error("Uncaught error in Page:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h1 className="text-xl font-bold text-red-600">Something went wrong.</h1>
          <p className="mt-2 text-gray-600">We are working on it. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**`src/components/error/RootErrorBoundary.tsx`:**
(More severe. Shows a static, unstyled fallback if even the styled components fail).

### 4.2. Data Loading Errors
**Cause:** `resources.json` is missing, has a syntax error, or doesn't match the `Resource` interface.
**Strategy:** Validate the data on app initialization.

**`src/utils/validateData.ts`:**
```typescript
import resources from '@data/resources.json';
import { Resource, ResourceSchema } from '@types/resource'; // Assuming you use Zod or similar for runtime validation
import { logger } from '@utils/logger';

export function validateResources(): Resource[] {
  try {
    // Basic runtime check
    if (!Array.isArray(resources)) {
      throw new Error("resources.json is not an array.");
    }
    // ... more robust validation here ...
    return resources as Resource[];
  } catch (error) {
    logger.error("Failed to validate resources.json:", error);
    // Return empty array to prevent app crash
    return [];
  }
}
```

**UI Fallback (in `App.tsx` or a Data Provider):**
```tsx
const validResources = validateResources();

if (!validResources.length) {
  return <DataErrorFallback />; // Renders the "Offline Paper" UI
}
```

### 4.3. Resource Not Found (404)
**Cause:** User types a bad URL or follows a broken link.
**Strategy:**
1.  Router catches the unmatched route.
2.  Render `NotFoundPage`.

**`src/features/not-found/NotFoundPage.tsx`:**
```tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Or your router

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go Back Home
      </Link>
    </div>
  );
};
```

### 4.4. Iframe Load Errors
**Cause:** Google Drive link is private, deleted, or the network is down.
**Strategy:** Listen for the iframe's `onError` event (which is tricky for iframes). Use a timeout-based fallback or check the iframe's `contentWindow` state.
**Robust Approach:**
1.  Show a `Skeleton` loader immediately.
2.  Start a timeout (e.g., 10 seconds).
3.  If the `iframe` hasn't fired its `load` event in 10 seconds, show the error fallback UI.
4.  If the `iframe` loads, hide the skeleton.

**`src/components/IframeViewer.tsx`:**
```tsx
import React, { useState, useEffect } from 'react';

interface IframeViewerProps {
  url: string;
  title: string;
}

export const IframeViewer: React.FC<IframeViewerProps> = ({ url, title }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'loading') {
        setStatus('error');
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden border">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Skeleton or Spinner */}
          <div className="animate-pulse bg-gray-200 w-full h-full" />
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-white z-20">
          <p className="text-gray-700 font-medium">Unable to load preview.</p>
          <p className="text-sm text-gray-500">The file might be unavailable or the link is broken.</p>
          <div className="mt-4 flex gap-4">
            <button onClick={() => setStatus('loading')} className="px-4 py-2 bg-blue-500 text-white rounded">Try Again</button>
            <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-blue-500 text-blue-500 rounded">Open in New Tab</a>
          </div>
        </div>
      )}
      <iframe
        src={url}
        title={title}
        className="w-full h-full border-0"
        onLoad={() => setStatus('loaded')}
        // Note: onError for iframes is unreliable across browsers.
        // The timeout approach above is more robust.
      />
    </div>
  );
};
```

### 4.5. Search Errors
**Cause:** Search logic ( regex, indexing ) throws an exception.
**Strategy:** Wrap the search logic in a `try...catch` block.

**`src/utils/searchAlgorithm.ts`:**
```typescript
import { Resource } from '@types/resource';
import { logger } from '@utils/logger';

export function searchResources(query: string, data: Resource[]): Resource[] {
  try {
    // ... logic ...
    // e.g., const regex = new RegExp(query, 'i');
    return data.filter(item => regex.test(item.title));
  } catch (error) {
    logger.error("Search algorithm failed:", error);
    // Return the full dataset so the user isn't stuck with a broken search
    return data;
  }
}
```

### 4.6. Network Errors (Assets)
**Cause:** Images fail to load.
**Strategy:** Use `onError` on `<img>` tags to swap in a placeholder.

```tsx
const [hasError, setHasError] = useState(false);

<img 
  src={src} 
  alt={alt} 
  onError={() => setHasError(true)}
  className={hasError ? 'bg-gray-200' : ''}
/> 
// Use CSS to replace the broken image with a generic document icon
```

---

## 5. Global Error Handling Strategy

### 5.1. The `logger` Utility
**Purpose:** Centralized error reporting (can be hooked up to Sentry in the future).
**Implementation:**
```typescript
// src/utils/logger.ts
const isDev = process.env.NODE_ENV === 'development';
export const logger = {
  log: (...args: any[]) => { if (isDev) console.log(...args); },
  warn: (...args: any[]) => { if (isDev) console.warn(...args); },
  error: (...args: any[]) => { 
    if (isDev) console.error(...args); 
    // In production, send to error tracking service
    // e.g., Sentry.captureException(args[0]);
  },
};
```

### 5.2. The `useErrorHandler` Hook
**Purpose:** Provide a consistent way to handle errors in functional components.
**Implementation:**
```typescript
import { useState, useCallback } from 'react';
import { logger } from '@utils/logger';

interface UseErrorHandlerReturn {
  error: Error | null;
  handleError: (error: Error) => void;
  resetError: () => void;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((err: Error) => {
    logger.error(err);
    setError(err);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, resetError };
};
```

---

## 6. Accessibility in Error States

*   **Focus Management:** When an error modal or alert appears, focus MUST move to the error message (use `aria-live="assertive"` or `role="alert"`).
*   **Color:** Do NOT use red color alone to indicate an error. Always pair it with an icon and text message ("⚠️ Error: ...").
*   **Screen Readers:** Error messages MUST be announced immediately. Use `aria-live="polite"` for less critical errors and `aria-live="assertive"` for critical ones.

---

**Last Updated:** 2026-05-20
