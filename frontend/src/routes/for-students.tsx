import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { Suspense, lazy } from 'react';
import { SearchPageSkeleton } from '@/components/Skeletons';
import { useSEO } from '@/hooks/useSEO';
import type { FilterState } from '@/components/FilterBar/FilterBar';

const SearchPage = lazy(() => import('@/features/search/components/SearchPage'));

const initialFilters: FilterState = {
    class: 'all',
    subject: 'Mathematics',
    type: 'all',
    search: '',
};

function ForStudentsPage(): React.ReactElement {
    const navigate = useNavigate();

    useSEO({
        title: 'For Students — Mathematics Resources',
        description: 'Mathematics study materials for Classes 6 to 12. Free question papers, notes, and resources for KVS students.',
        canonicalPath: '/for-students',
    });

    const handleViewResource = (id: string): void => {
        navigate({ to: '/view/$id', params: { id } });
    };

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    return (
        <Suspense fallback={<SearchPageSkeleton />}>
            <SearchPage
                initialFilters={initialFilters}
                onViewResource={handleViewResource}
                onNavigate={handleNavigate}
            />
        </Suspense>
    );
}

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: 'for-students',
    component: ForStudentsPage,
});
