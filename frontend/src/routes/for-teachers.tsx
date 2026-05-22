import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { Suspense, lazy } from 'react';
import { Box, Typography, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { EventNoteIcon, GavelIcon, DescriptionIcon, TableChartIcon, ReceiptIcon, ChevronRightIcon } from '@/components/Icons';
import { SearchPageSkeleton } from '@/components/Skeletons';
import { useSEO } from '@/hooks/useSEO';
import { FONT_HEADING, FONT_MONO, MAX_CONTENT_WIDTH } from '@/lib/constants';
import type { FilterState } from '@/components/FilterBar/FilterBar';

const SearchPage = lazy(() => import('@/features/search/components/SearchPage'));

const initialFilters: FilterState = {
    class: 'all',
    subject: 'all',
    type: 'all',
    search: '',
};

const quickLinks = [
    { id: '1', title: 'Morning Assembly Formats', icon: EventNoteIcon, route: '/resources/formats' },
    { id: '2', title: 'GOI/KVS Rules', icon: GavelIcon, route: '/resources/formats' },
    { id: '3', title: 'Office Formats', icon: DescriptionIcon, route: '/resources/formats' },
    { id: '4', title: 'Time Table Templates', icon: TableChartIcon, route: '/resources/formats' },
    { id: '5', title: 'Income Tax Guide', icon: ReceiptIcon, route: '/resources/formats' },
];

function ForTeachersPage(): React.ReactElement {
    const navigate = useNavigate();

    useSEO({
        title: 'For Teachers — Programs, Formats & Admissions',
        description: 'Teacher resources including programs, formats & rules, and admissions information for KVS teachers.',
        canonicalPath: '/for-teachers',
    });

    const handleViewResource = (id: string): void => {
        navigate({ to: '/view/$id', params: { id } });
    };

    const handleNavigate = (route: string): void => {
        navigate({ to: route });
    };

    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    return (
        <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    mb: 1,
                }}
            >
                For Teachers
            </Typography>
            <Typography
                sx={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.95rem',
                    color: 'var(--color-text-secondary)',
                    mb: 4,
                }}
            >
                Quick access to formats, rules, and templates
            </Typography>

            <Box
                sx={{
                    mb: 6,
                    border: `3px solid ${borderColor}`,
                    boxShadow: `4px 4px 0px ${shadowColor}`,
                    bgcolor: 'var(--color-bg)',
                }}
            >
                <List disablePadding>
                    {quickLinks.map((link) => (
                        <ListItemButton
                            key={link.id}
                            onClick={() => handleNavigate(link.route)}
                            sx={{
                                borderBottom: '1px solid var(--color-border)',
                                transition: 'background-color 0.15s ease',
                                '&:last-child': { borderBottom: 'none' },
                                '&:hover': { bgcolor: 'var(--color-yellow)' },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <link.icon sx={{ color: 'var(--color-text)' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography sx={{ fontFamily: FONT_HEADING, fontWeight: 700 }}>
                                        {link.title}
                                    </Typography>
                                }
                            />
                            <ChevronRightIcon
                                aria-hidden="true"
                                sx={{ color: 'var(--color-text-secondary)' }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>

            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 800,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    mb: 3,
                }}
            >
                All Resources
            </Typography>

            <Suspense fallback={<SearchPageSkeleton />}>
                <SearchPage
                    initialFilters={initialFilters}
                    onViewResource={handleViewResource}
                    onNavigate={handleNavigate}
                />
            </Suspense>
        </Box>
    );
}

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: 'for-teachers',
    component: ForTeachersPage,
});
