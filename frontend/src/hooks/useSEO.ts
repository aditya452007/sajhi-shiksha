import { useEffect } from 'react';

interface SEOConfig {
    title: string;
    description: string;
    canonicalPath?: string;
    ogImage?: string;
    noIndex?: boolean;
    jsonLd?: Record<string, unknown>;
}

const SITE_URL = 'https://www.sajhishiksha.in';
const DEFAULT_TITLE = 'Sajhi Shiksha — Free Study Materials for KVS Students';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;

function setMeta(name: string, content: string, attr = 'name'): void {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

export function useSEO({ title, description, canonicalPath, ogImage, noIndex, jsonLd }: SEOConfig): void {
    useEffect(() => {
        const fullTitle = title === DEFAULT_TITLE ? title : `${title} — Sajhi Shiksha`;
        document.title = fullTitle;

        setMeta('description', description);
        setMeta('keywords', 'KVS, Kendriya Vidyalaya, study materials, question papers, class 1-5, class 6-12, education, free resources, India');
        setMeta('author', 'Sajhi Shiksha');
        setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
        setMeta('language', 'English');

        const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL;
        let canonicalEl = document.querySelector('link[rel="canonical"]');
        if (!canonicalEl) {
            canonicalEl = document.createElement('link');
            canonicalEl.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalEl);
        }
        canonicalEl.setAttribute('href', canonical);

        setMeta('og:type', 'website', 'property');
        setMeta('og:url', canonical, 'property');
        setMeta('og:title', fullTitle, 'property');
        setMeta('og:description', description, 'property');
        setMeta('og:image', ogImage || DEFAULT_OG_IMAGE, 'property');
        setMeta('og:image:width', '1200', 'property');
        setMeta('og:image:height', '630', 'property');
        setMeta('og:site_name', 'Sajhi Shiksha', 'property');
        setMeta('og:locale', 'en_US', 'property');

        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', fullTitle, 'name');
        setMeta('twitter:description', description, 'name');
        setMeta('twitter:image', ogImage || DEFAULT_OG_IMAGE, 'name');

        let jsonLdEl = document.querySelector('script[type="application/ld+json"]');
        if (jsonLd) {
            if (!jsonLdEl) {
                jsonLdEl = document.createElement('script');
                jsonLdEl.setAttribute('type', 'application/ld+json');
                document.head.appendChild(jsonLdEl);
            }
            jsonLdEl.textContent = JSON.stringify(jsonLd);
        } else if (jsonLdEl) {
            jsonLdEl.textContent = '';
        }

        return () => {
            if (jsonLdEl) {
                jsonLdEl.textContent = '';
            }
        };
    }, [title, description, canonicalPath, ogImage, noIndex, jsonLd]);
}

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sajhi Shiksha',
    url: SITE_URL,
    description: 'Free educational resources for KVS students',
    sameAs: [],
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sajhi Shiksha',
    url: SITE_URL,
    potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
    },
};

export const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Sajhi Shiksha',
    description: 'Free educational resource-sharing platform for KVS students and teachers',
    url: SITE_URL,
    audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'KVS students Classes 1-12',
    },
};
