import { useEffect } from 'react';

declare global {
    interface Window {
        gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
        dataLayer: unknown[];
    }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export function useAnalytics(): void {
    useEffect(() => {
        if (!GA_ID) return;

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(): void {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date().toISOString());
        window.gtag('config', GA_ID, { send_page_view: false });
    }, []);

    useEffect(() => {
        if (!GA_ID || !window.gtag) return;

        window.gtag('config', GA_ID, {
            page_path: window.location.pathname + window.location.search,
        });
    });
}
