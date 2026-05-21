import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as resourcesRoute } from './resources';
import ResourceListPage from '@/features/resources/components/ResourceListPage';
import { useSEO } from '@/hooks/useSEO';

function ProgramsResourcesPage(): React.ReactElement {
    useSEO({
        title: 'Programs',
        description: 'Nipun/FLN, CMP, TBP, Cub & Bulbul program resources for KVS schools.',
        canonicalPath: '/resources/programs',
    });

    const navigate = useNavigate();

    const handleViewResource = (id: string): void => {
        navigate({ to: '/view/$id', params: { id } });
    };

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    return (
        <ResourceListPage
            category="programs"
            title="Programs"
            description="Nipun/FLN, CMP, TBP, Cub & Bulbul program resources."
            onViewResource={handleViewResource}
            onNavigate={handleNavigate}
        />
    );
}

export const Route = createRoute({
    getParentRoute: () => resourcesRoute,
    path: 'programs',
    component: ProgramsResourcesPage,
});
