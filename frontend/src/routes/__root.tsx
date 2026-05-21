import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { Box } from '@mui/material';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BottomTabBar from '@/components/BottomTabBar/BottomTabBar';
import PageTransition from '@/components/PageTransition/PageTransition';
import { useAnalytics } from '@/hooks/useAnalytics';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent(): React.ReactElement {
    useAnalytics();
    const navigate = useNavigate();

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header onNavigate={handleNavigate} />
            <Box
                sx={{
                    flex: 1,
                    pb: { xs: 8, md: 0 },
                }}
            >
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </Box>
            <Footer onNavigate={handleNavigate} />
            <BottomTabBar />
            <TanStackRouterDevtools />
        </Box>
    );
}
