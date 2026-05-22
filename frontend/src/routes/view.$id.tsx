import { createRoute, useNavigate, useParams } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { Suspense, lazy, useMemo } from 'react';
import { ViewPageSkeleton } from '@/components/Skeletons';
import { useSEO } from '@/hooks/useSEO';
import resources from '@/data/resources.json';
import siteContent from '@/data/site-content.json';
import type { Resource } from '@/types';
import { findTeacherResourceById } from '@/lib/utils';

const ResourceViewPage = lazy(() => import('@/features/viewer/components/ResourceViewPage'));

function ViewResourcePage(): React.ReactElement {
    const navigate = useNavigate();
    const { id } = useParams({ from: Route.id });

    const resource = useMemo(() => {
        const fromResources = (resources as Resource[]).find((r) => r.id === id);
        if (fromResources) return fromResources;
        return findTeacherResourceById(id, siteContent);
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
        <Suspense fallback={<ViewPageSkeleton />}>
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
