import { createRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { Route as resourcesRoute } from './resources';
import { Suspense, lazy } from 'react';
import SuspenseLoader from '@/components/SuspenseLoader/SuspenseLoader';
import { useSEO } from '@/hooks/useSEO';
import { searchParamsToFilters } from '@/lib/filterUtils';

const ResourceListPage = lazy(() => import('@/features/resources/components/ResourceListPage'));

function AdmissionsResourcesPage(): React.ReactElement {
    const navigate = useNavigate();
    const search = useSearch({ from: Route.id });

    const filters = searchParamsToFilters(new URLSearchParams(
        `class=${search.class || ''}&subject=${search.subject || ''}&type=${search.type || ''}&q=${search.q || ''}`
    ));

    useSEO({
        title: 'Admissions',
        description: 'CBSE/NIOS guidelines, KVS admission procedures, and eligibility criteria.',
        canonicalPath: '/resources/admissions',
    });

    const handleViewResource = (id: string): void => {
        navigate({ to: '/view/$id', params: { id } });
    };

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    return (
        <Suspense fallback={<SuspenseLoader message="Loading resources..." />}>
            <ResourceListPage
                category="admissions"
                title="Admissions"
                description="CBSE/NIOS guidelines, KVS admission procedures, and eligibility criteria."
                initialFilters={filters}
                onViewResource={handleViewResource}
                onNavigate={handleNavigate}
            />
        </Suspense>
    );
}

export const Route = createRoute({
    getParentRoute: () => resourcesRoute,
    path: 'admissions',
    validateSearch: (search: Record<string, unknown>): { class?: string; subject?: string; type?: string; q?: string } => ({
        class: typeof search.class === 'string' ? search.class : undefined,
        subject: typeof search.subject === 'string' ? search.subject : undefined,
        type: typeof search.type === 'string' ? search.type : undefined,
        q: typeof search.q === 'string' ? search.q : undefined,
    }),
    component: AdmissionsResourcesPage,
});
