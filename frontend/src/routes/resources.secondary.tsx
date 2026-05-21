import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as resourcesRoute } from './resources';
import ResourceListPage from '@/features/resources/components/ResourceListPage';
import { useSEO } from '@/hooks/useSEO';

function SecondaryResourcesPage(): React.ReactElement {
    useSEO({
        title: 'Classes 6-12 Resources',
        description: 'Question papers, study materials, and exam preparation resources for secondary and senior secondary classes (6-12).',
        canonicalPath: '/resources/secondary',
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
            category="classes-6-12"
            title="Classes 6-12 Resources"
            description="Question papers, study materials, and exam preparation resources."
            onViewResource={handleViewResource}
            onNavigate={handleNavigate}
        />
    );
}

export const Route = createRoute({
    getParentRoute: () => resourcesRoute,
    path: 'secondary',
    component: SecondaryResourcesPage,
});
