import { createRoute, useNavigate, useParams } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { Suspense, lazy, useMemo } from 'react';
import SuspenseLoader from '@/components/SuspenseLoader/SuspenseLoader';
import { useSEO } from '@/hooks/useSEO';
import resources from '@/data/resources.json';
import type { Resource } from '@/types';

const ResourceViewPage = lazy(() => import('@/features/viewer/components/ResourceViewPage'));

function ViewResourcePage(): React.ReactElement {
    const navigate = useNavigate();
    const { id } = useParams({ from: Route.id });

    const resource = useMemo(() => {
        return (resources as Resource[]).find((r) => r.id === id);
    }, [id]);

    useSEO({
        title: resource ? resource.title : 'Resource Not Found',
        description: resource ? `View and download ${resource.title}. ${resource.description}` : 'The requested resource could not be found.',
        canonicalPath: `/view/${id}`,
    });

    const handleBack = (): void => {
        navigate({ to: '/' });
    };

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    return (
        <Suspense fallback={<SuspenseLoader message="Loading resource..." />}>
            <ResourceViewPage
                resourceId={id}
                onBack={handleBack}
                onNavigate={handleNavigate}
            />
        </Suspense>
    );
}

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: 'view/$id',
    component: ViewResourcePage,
});
