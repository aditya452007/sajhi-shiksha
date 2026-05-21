import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounce hook for search inputs.
 * Returns a debounced callback that delays execution by `delay` ms.
 * Automatically cancels pending calls on unmount or when dependencies change.
 */
export function useDebounceCallback<T extends (...args: Parameters<T>) => void>(
    callback: T,
    delay: number
): T {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return useCallback(
        ((...args: Parameters<T>) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        }) as T,
        [callback, delay]
    );
}

/**
 * Debounce hook for values.
 * Returns the debounced value after `delay` ms of inactivity.
 */
export function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
