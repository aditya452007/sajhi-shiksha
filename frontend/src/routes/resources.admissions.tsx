import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as resourcesRoute } from './resources';
import ResourceListPage from '@/features/resources/components/ResourceListPage';
import { useSEO } from '@/hooks/useSEO';

function AdmissionsResourcesPage(): React.ReactElement {
    useSEO({
        title: 'Admissions',
        description: 'KVS admission guidelines, CBSE/NIOS formats, and enrollment information for students and parents.',
        canonicalPath: '/resources/admissions',
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
            category="admissions"
            title="Admissions"
            description="KVS admission guidelines, CBSE/NIOS formats, and enrollment information."
            onViewResource={handleViewResource}
            onNavigate={handleNavigate}
        />
    );
}

export const Route = createRoute({
    getParentRoute: () => resourcesRoute,
    path: 'admissions',
    component: AdmissionsResourcesPage,
});
