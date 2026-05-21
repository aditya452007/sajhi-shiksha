import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as resourcesRoute } from './resources';
import ResourceListPage from '@/features/resources/components/ResourceListPage';
import { useSEO } from '@/hooks/useSEO';

function PrimaryResourcesPage(): React.ReactElement {
    useSEO({
        title: 'Classes 1-5 Resources',
        description: 'Study materials, notes, and learning resources for primary classes (1-5). Math, English, Hindi, EVS resources for KVS students.',
        canonicalPath: '/resources/primary',
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
            category="classes-1-5"
            title="Classes 1-5 Resources"
            description="Study materials, notes, and learning resources for primary classes."
            onViewResource={handleViewResource}
            onNavigate={handleNavigate}
        />
    );
}

export const Route = createRoute({
    getParentRoute: () => resourcesRoute,
    path: 'primary',
    component: PrimaryResourcesPage,
});
