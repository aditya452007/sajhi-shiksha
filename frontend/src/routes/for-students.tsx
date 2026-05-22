import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { Suspense, lazy, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import {
    OpenInNewIcon, ArticleIcon, AutoStoriesIcon, MenuBookIcon,
    SearchOffIcon, DescriptionIcon, AssignmentIcon, ArrowForwardIcon
} from '@/components/Icons';
import { SearchPageSkeleton } from '@/components/Skeletons';
import { useSEO } from '@/hooks/useSEO';
import { FONT_HEADING, FONT_MONO, MAX_CONTENT_WIDTH } from '@/lib/constants';
import siteContent from '@/data/site-content.json';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import type { FilterState } from '@/components/FilterBar/FilterBar';

const SearchPage = lazy(() => import('@/features/search/components/SearchPage'));

const initialFilters: FilterState = {
    class: 'all',
    subject: 'Mathematics',
    type: 'all',
    search: '',
};

const iconMap: Record<string, React.ElementType> = {
    Article: ArticleIcon,
    AutoStories: AutoStoriesIcon,
    MenuBook: MenuBookIcon,
    Description: DescriptionIcon,
    Assignment: AssignmentIcon,
};

const cardColors = [
    'var(--color-yellow)', 'var(--color-pink)', 'var(--color-blue)',
    'var(--color-green)', 'var(--color-purple)', 'var(--color-orange)',
    'var(--color-yellow)', 'var(--color-pink)', 'var(--color-blue)',
];

const BORDER = 'var(--color-border)';
const SHADOW = 'var(--color-shadow)';

function ForStudentsPage(): React.ReactElement {
    const navigate = useNavigate();
    const officialLinks = siteContent.forStudents.officialLinks;

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

    const handleOpenLink = useCallback((url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    return (
        <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Breadcrumb
                items={[{ label: 'For Students' }]}
                onNavigate={handleNavigate}
            />

            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    mb: 1,
                }}
            >
                For Students
            </Typography>
            <Typography
                sx={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.95rem',
                    color: 'var(--color-text-secondary)',
                    mb: 4,
                }}
            >
                Official resources and study materials for Classes 6 to 12
            </Typography>

            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 700,
                    fontSize: { xs: '1.15rem', md: '1.35rem' },
                    mb: 2,
                }}
            >
                Official Resources
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                    gap: 3,
                    mb: 6,
                }}
            >
                {officialLinks.map((link, index) => {
                    const IconComponent = iconMap[link.icon] ?? SearchOffIcon;
                    const bgColor = cardColors[index % cardColors.length];

                    return (
                        <Box
                            key={link.id}
                            onClick={() => handleOpenLink(link.url)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleOpenLink(link.url);
                                }
                            }}
                            sx={{
                                cursor: 'pointer',
                                bgcolor: bgColor,
                                border: `3px solid ${BORDER}`,
                                boxShadow: `4px 4px 0px ${SHADOW}`,
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                                '&:hover': {
                                    transform: 'translate(-3px, -3px)',
                                    boxShadow: `7px 7px 0px ${SHADOW}`,
                                },
                                '&:active': {
                                    transform: 'translate(1px, 1px)',
                                    boxShadow: `2px 2px 0px ${SHADOW}`,
                                },
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Open ${link.title} in new tab`}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        p: 1,
                                        bgcolor: 'var(--color-bg)',
                                        border: `2px solid ${BORDER}`,
                                    }}
                                >
                                    <IconComponent sx={{ fontSize: 28, color: 'var(--color-text)' }} />
                                </Box>
                                <OpenInNewIcon
                                    sx={{ fontSize: 18, color: 'rgba(26,26,26,0.5)' }}
                                    aria-hidden="true"
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontFamily: FONT_HEADING,
                                    fontWeight: 800,
                                    fontSize: '1.05rem',
                                    mb: 0.5,
                                    color: '#1A1A1A',
                                }}
                            >
                                {link.title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '0.85rem',
                                    color: 'rgba(26, 26, 26, 0.75)',
                                    mb: 1.5,
                                    flex: 1,
                                }}
                            >
                                {link.description}
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    fontFamily: FONT_MONO,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: 'rgba(26,26,26,0.6)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                Visit Site <ArrowForwardIcon sx={{ fontSize: 14 }} />
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 700,
                    fontSize: { xs: '1.15rem', md: '1.35rem' },
                    mb: 2,
                }}
            >
                Class 6-12 Mathematics Resources
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
    path: 'for-students',
    component: ForStudentsPage,
});