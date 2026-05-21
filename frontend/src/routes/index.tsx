import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { Suspense } from 'react';
import HomePage from '@/features/home/HomePage';
import SuspenseLoader from '@/components/SuspenseLoader/SuspenseLoader';
import { useSEO, websiteSchema, organizationSchema } from '@/hooks/useSEO';

function IndexComponent(): React.ReactElement {
    useSEO({
        title: 'Sajhi Shiksha — Free Study Materials for KVS Students',
        description: 'Free educational resources, study materials, question papers, and formats for KVS students (Classes 1-12). No login required. Sharing Knowledge — From You, For You.',
        canonicalPath: '/',
        jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [websiteSchema, organizationSchema],
        },
    });

    const navigate = useNavigate();

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    return (
        <Suspense fallback={<SuspenseLoader message="Loading homepage..." />}>
            <HomePage onNavigate={handleNavigate} />
        </Suspense>
    );
}

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: IndexComponent,
});
