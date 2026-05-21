import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as resourcesRoute } from './resources';
import ResourceListPage from '@/features/resources/components/ResourceListPage';
import { useSEO } from '@/hooks/useSEO';

function FormatsResourcesPage(): React.ReactElement {
    useSEO({
        title: 'Formats & Rules',
        description: 'Assembly formats, GOI/KVS rules, office formats, and administrative templates for KVS schools.',
        canonicalPath: '/resources/formats',
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
            category="formats"
            title="Formats & Rules"
            description="Assembly formats, GOI/KVS rules, office formats, and administrative templates."
            onViewResource={handleViewResource}
            onNavigate={handleNavigate}
        />
    );
}

export const Route = createRoute({
    getParentRoute: () => resourcesRoute,
    path: 'formats',
    component: FormatsResourcesPage,
});
