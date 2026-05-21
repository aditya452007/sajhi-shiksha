import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from '@tanstack/react-router';
import createAppTheme from '@/config/theme';
import { useTheme } from '@/hooks/useTheme';
import { createRouter } from './router';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { SnackbarProvider } from '@/components/Snackbar/Snackbar';

const router = createRouter();

const App: React.FC = () => {
    const [isDark] = useTheme();
    const theme = createAppTheme(isDark ? 'dark' : 'light');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
                <SnackbarProvider>
                    <RouterProvider router={router} />
                </SnackbarProvider>
            </ErrorBoundary>
        </ThemeProvider>
    );
};

export default App;
