import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import ContributePage from '@/features/contribute/components/ContributePage';
import { useSEO } from '@/hooks/useSEO';

function ContributeRouteComponent(): React.ReactElement {
    useSEO({
        title: 'Contribute',
        description: 'Share your knowledge with fellow teachers. Contribute study materials, question papers, and resources to help KVS students.',
        canonicalPath: '/contribute',
    });

    const navigate = useNavigate();

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    return <ContributePage onNavigate={handleNavigate} />;
}

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: 'contribute',
    component: ContributeRouteComponent,
});
