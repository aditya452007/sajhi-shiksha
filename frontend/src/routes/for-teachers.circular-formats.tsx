import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as forTeachersRoute } from './for-teachers';
import { useState, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
    OpenInNewIcon, ChevronRightIcon,
    ArrowBackIcon, SearchOffIcon, DownloadIcon
} from '@/components/Icons';
import { FONT_HEADING, FONT_MONO, MAX_CONTENT_WIDTH } from '@/lib/constants';
import IframeViewer from '@/components/IframeViewer/IframeViewer';
import ResourceCard from '@/components/ResourceCard/ResourceCard';
import { teacherCardToResource } from '@/lib/utils';
import siteContent from '@/data/site-content.json';

const BORDER = 'var(--color-border)';
const SHADOW = 'var(--color-shadow)';

function CircularFormatsPage(): React.ReactElement {
    const navigate = useNavigate();
    const mainCard = siteContent.teacherCards.mainCards.find((c) => c.id === 'circular-formats');
    const parentLabel = siteContent.navigation.headerLinks.find((l) => l.route === '/for-teachers')?.label ?? 'For Teachers';
    const pageTitle = mainCard?.title ?? '';

    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleBack = useCallback(() => {
        if (selectedItem) {
            setSelectedItem(null);
        } else {
            navigate({ to: '/for-teachers' });
        }
    }, [selectedItem, navigate]);

    const handleOpenLink = useCallback((url?: string) => {
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    const allSubCards = mainCard?.subCards ?? [];
    const currentItem = selectedItem ? allSubCards.find((s) => s.id === selectedItem) : null;

    const breadcrumbSx = {
        display: 'inline-flex', alignItems: 'center', gap: 0.5, cursor: 'pointer',
        color: 'var(--color-text-secondary)', fontFamily: FONT_MONO, fontSize: '0.8rem',
        fontWeight: 600, '&:hover': { color: 'var(--color-text)' },
    };

    function Breadcrumbs({ leafTitle }: { leafTitle?: string }) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3, flexWrap: 'wrap' }}>
                <Box component="span" onClick={() => navigate({ to: '/for-teachers' })}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate({ to: '/for-teachers' }); } }}
                    sx={breadcrumbSx} role="link" tabIndex={0}>{parentLabel}</Box>
                <ChevronRightIcon sx={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }} aria-hidden="true" />
                <Box component="span" onClick={() => setSelectedItem(null)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedItem(null); } }}
                    sx={breadcrumbSx} role="link" tabIndex={0}>{pageTitle}</Box>
                {leafTitle && (
                    <>
                        <ChevronRightIcon sx={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }} aria-hidden="true" />
                        <Typography component="span" sx={{ fontFamily: FONT_HEADING, fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)' }} aria-current="page">
                            {leafTitle}
                        </Typography>
                    </>
                )}
            </Box>
        );
    }

    if (selectedItem && currentItem) {
        return (
            <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
                <Breadcrumbs leafTitle={currentItem.title} />
                <Box component="span" onClick={handleBack} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBack(); } }}
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: 'var(--color-text-secondary)', fontFamily: FONT_MONO, fontSize: '0.85rem', fontWeight: 600, mb: 2, '&:hover': { color: 'var(--color-text)' } }}
                    role="link" tabIndex={0} aria-label="Go back"><ArrowBackIcon fontSize="small" /> Back</Box>
                <Typography sx={{ fontFamily: FONT_HEADING, fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, mb: 1 }}>
                    {currentItem.title}
                </Typography>
                <Typography sx={{ fontFamily: FONT_MONO, fontSize: '0.9rem', color: 'var(--color-text-secondary)', mb: 4 }}>
                    {currentItem.description}
                </Typography>
                {currentItem.driveUrl ? (
                    <>
                        <IframeViewer driveUrl={currentItem.driveUrl} title={currentItem.title} height="75vh" minHeight="500px" />
                        <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                            <Button variant="contained" startIcon={<OpenInNewIcon />}
                                onClick={() => handleOpenLink(currentItem.driveUrl)}
                                sx={{ bgcolor: 'var(--color-yellow)', color: '#1A1A1A', border: `3px solid ${BORDER}`, boxShadow: `3px 3px 0px ${SHADOW}`, fontFamily: FONT_MONO, fontWeight: 700, fontSize: '0.95rem', px: 3, py: 1.5, transition: 'transform 0.12s ease, box-shadow 0.12s ease', '&:hover': { bgcolor: 'var(--color-yellow)', transform: 'translate(-2px, -2px)', boxShadow: `5px 5px 0px ${SHADOW}` }, '&:active': { transform: 'translate(2px, 2px)', boxShadow: `1px 1px 0px ${SHADOW}` } }}>
                                <OpenInNewIcon sx={{ mr: 1.5 }} /> View in New Tab
                            </Button>
                            <Button variant="outlined" startIcon={<DownloadIcon />}
                                onClick={() => handleOpenLink(currentItem.driveUrl)}
                                sx={{ border: `3px solid ${BORDER}`, color: 'var(--color-text)', boxShadow: `3px 3px 0px ${SHADOW}`, fontFamily: FONT_MONO, fontWeight: 700, fontSize: '0.95rem', px: 3, py: 1.5, transition: 'transform 0.12s ease, box-shadow 0.12s ease', '&:hover': { transform: 'translate(-2px, -2px)', boxShadow: `5px 5px 0px ${SHADOW}` }, '&:active': { transform: 'translate(2px, 2px)', boxShadow: `1px 1px 0px ${SHADOW}` } }}>
                                <DownloadIcon sx={{ mr: 1.5 }} /> Download
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ p: 4, textAlign: 'center', border: `3px solid ${BORDER}`, boxShadow: `4px 4px 0px ${SHADOW}` }}>
                        <SearchOffIcon sx={{ fontSize: 48, color: 'var(--color-text-secondary)', mb: 2 }} />
                        <Typography sx={{ fontFamily: FONT_HEADING, fontWeight: 700, mb: 1 }}>Content Coming Soon</Typography>
                        <Typography sx={{ color: 'var(--color-text-secondary)', fontFamily: FONT_MONO, fontSize: '0.85rem' }}>The document URL will be added soon.</Typography>
                    </Box>
                )}
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Breadcrumbs />
            <Box component="span" onClick={handleBack} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBack(); } }}
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: 'var(--color-text-secondary)', fontFamily: FONT_MONO, fontSize: '0.85rem', fontWeight: 600, mb: 2, '&:hover': { color: 'var(--color-text)' } }}
                role="link" tabIndex={0} aria-label="Go back"><ArrowBackIcon fontSize="small" /> Back</Box>
            <Typography sx={{ fontFamily: FONT_HEADING, fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, mb: 1 }}>
                {pageTitle}
            </Typography>
            <Typography sx={{ fontFamily: FONT_MONO, fontSize: '0.9rem', color: 'var(--color-text-secondary)', mb: 4 }}>
                {mainCard?.description ?? ''}
            </Typography>
            {allSubCards.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center', border: `3px solid ${BORDER}`, boxShadow: `4px 4px 0px ${SHADOW}` }}>
                    <SearchOffIcon sx={{ fontSize: 48, color: 'var(--color-text-secondary)', mb: 2 }} />
                    <Typography sx={{ fontFamily: FONT_HEADING, fontWeight: 700, mb: 1 }}>No resources yet</Typography>
                    <Typography sx={{ color: 'var(--color-text-secondary)', fontFamily: FONT_MONO, fontSize: '0.85rem' }}>Resources will appear here once added.</Typography>
                </Box>
            ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                    {allSubCards.map((subCard) => (
                        <ResourceCard
                            key={subCard.id}
                            resource={teacherCardToResource(subCard, pageTitle)}
                            viewMode="grid"
                            onView={(id) => navigate({ to: '/view/$id', params: { id } })}
                            onDownload={(url) => window.open(url, '_blank')}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export const Route = createRoute({
    getParentRoute: () => forTeachersRoute,
    path: 'circular-formats',
    component: CircularFormatsPage,
});
