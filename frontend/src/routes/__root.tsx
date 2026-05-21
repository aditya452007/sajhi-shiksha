import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box } from '@mui/material';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BottomTabBar from '@/components/BottomTabBar/BottomTabBar';
import PageTransition from '@/components/PageTransition/PageTransition';
import CookieConsent from '@/components/CookieConsent/CookieConsent';
import { useAnalytics } from '@/hooks/useAnalytics';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent(): React.ReactElement {
    useAnalytics();

    const isDev = import.meta.env.DEV;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <Header />
            <Box
                id="main-content"
                sx={{
                    flex: 1,
                    pb: { xs: 8, md: 0 },
                }}
            >
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </Box>
            <Footer />
            <BottomTabBar />
            <CookieConsent />
            {isDev && <div aria-hidden="true"><TanStackRouterDevtools /></div>}
        </Box>
    );
}
