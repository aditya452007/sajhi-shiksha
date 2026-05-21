import { useState, useEffect, useCallback } from 'react';

export function useTheme(): [boolean, () => void] {
    const [isDark, setIsDark] = useState<boolean>(() => {
        try {
            const stored = localStorage.getItem('theme');
            if (stored) return stored === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch {
            return false;
        }
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch {
            // localStorage not available
        }
    }, [isDark]);

    const toggle = useCallback(() => {
        setIsDark((prev) => !prev);
    }, []);

    return [isDark, toggle];
}
