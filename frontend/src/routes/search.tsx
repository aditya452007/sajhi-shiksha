import { createRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import SearchPage from '@/features/search/components/SearchPage';
import { useSEO } from '@/hooks/useSEO';

function SearchRouteComponent(): React.ReactElement {
    const navigate = useNavigate();
    const search = useSearch({ from: Route.id });
    const query = typeof search.q === 'string' ? search.q : '';

    useSEO({
        title: query ? `Search: ${query}` : 'Search Resources',
        description: query ? `Search results for "${query}" across all KVS study materials.` : 'Search across all study materials, question papers, and resources for KVS students.',
        canonicalPath: query ? `/search?q=${encodeURIComponent(query)}` : '/search',
    });

    const handleViewResource = (id: string): void => {
        navigate({ to: '/view/$id', params: { id } });
    };

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    return (
        <SearchPage
            initialQuery={query}
            onViewResource={handleViewResource}
            onNavigate={handleNavigate}
        />
    );
}

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: 'search',
    validateSearch: (search: Record<string, unknown>): { q?: string } => ({
        q: typeof search.q === 'string' ? search.q : undefined,
    }),
    component: SearchRouteComponent,
});
