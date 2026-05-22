import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as forTeachersRoute } from './for-teachers';
import { useState, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
    OpenInNewIcon, ChevronRightIcon, ArrowBackIcon,
    SearchOffIcon, ArrowForwardIcon, PictureAsPdfIcon, DownloadIcon
} from '@/components/Icons';
import { FONT_HEADING, FONT_MONO, MAX_CONTENT_WIDTH } from '@/lib/constants';
import IframeViewer from '@/components/IframeViewer/IframeViewer';
import ResourceCard from '@/components/ResourceCard/ResourceCard';
import { teacherCardToResource } from '@/lib/utils';
import siteContent from '@/data/site-content.json';

const BORDER = 'var(--color-border)';
const SHADOW = 'var(--color-shadow)';

function TgtPgtPage(): React.ReactElement {
    const navigate = useNavigate();
    const mainCard = siteContent.teacherCards.mainCards.find((c) => c.id === 'tgt-pgt');
    const parentLabel = siteContent.navigation.headerLinks.find((l) => l.route === '/for-teachers')?.label ?? 'For Teachers';
    const pageTitle = mainCard?.title ?? '';

    const [selectedSubCard, setSelectedSubCard] = useState<string | null>(null);
    const [selectedLeaf, setSelectedLeaf] = useState<string | null>(null);

    const handleBack = useCallback(() => {
        if (selectedLeaf) {
            setSelectedLeaf(null);
        } else if (selectedSubCard) {
            setSelectedSubCard(null);
        } else {
            navigate({ to: '/for-teachers' });
        }
    }, [selectedLeaf, selectedSubCard, navigate]);

    const handleOpenLink = useCallback((url?: string) => {
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    const allSubCards = mainCard?.subCards ?? [];
    const currentSubCard = allSubCards.find((s) => s.id === selectedSubCard) ?? null;
    const hasSubCards = currentSubCard?.hasSubCards && !!currentSubCard?.subCards?.length;
    const leafItems: any[] = hasSubCards ? (currentSubCard?.subCards ?? []) : [];
    const currentLeaf = (hasSubCards ? leafItems : allSubCards).find((l: any) => l.id === (hasSubCards ? selectedLeaf : selectedSubCard)) ?? null;

    const breadcrumbSx = {
        display: 'inline-flex', alignItems: 'center', gap: 0.5, cursor: 'pointer',
        color: 'var(--color-text-secondary)', fontFamily: FONT_MONO, fontSize: '0.8rem',
        fontWeight: 600, '&:hover': { color: 'var(--color-text)' },
    };

    function Breadcrumbs({ leafTitle, subCardTitle }: { leafTitle?: string; subCardTitle?: string }) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3, flexWrap: 'wrap' }}>
                <Box component="span" onClick={() => navigate({ to: '/for-teachers' })}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate({ to: '/for-teachers' }); } }}
                    sx={breadcrumbSx} role="link" tabIndex={0}>{parentLabel}</Box>
                <ChevronRightIcon sx={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }} aria-hidden="true" />
                <Box component="span" onClick={() => { setSelectedSubCard(null); setSelectedLeaf(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSubCard(null); setSelectedLeaf(null); } }}
                    sx={breadcrumbSx} role="link" tabIndex={0}>{pageTitle}</Box>
                {subCardTitle && (
                    <>
                        <ChevronRightIcon sx={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }} aria-hidden="true" />
                        <Box component="span" onClick={() => { setSelectedLeaf(null); }}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedLeaf(null); } }}
                            sx={breadcrumbSx} role="link" tabIndex={0}>{subCardTitle}</Box>
                    </>
                )}
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

    if (selectedLeaf && currentLeaf) {
        return (
            <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
                <Breadcrumbs
                    leafTitle={currentLeaf.title}
                    subCardTitle={selectedSubCard && currentSubCard ? currentSubCard.title : undefined}
                />
                <Box component="span" onClick={handleBack} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBack(); } }}
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: 'var(--color-text-secondary)', fontFamily: FONT_MONO, fontSize: '0.85rem', fontWeight: 600, mb: 2, '&:hover': { color: 'var(--color-text)' } }}
                    role="link" tabIndex={0} aria-label="Go back"><ArrowBackIcon fontSize="small" /> Back</Box>
                <Typography sx={{ fontFamily: FONT_HEADING, fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, mb: 1 }}>
                    {currentLeaf.title}
                </Typography>
                <Typography sx={{ fontFamily: FONT_MONO, fontSize: '0.9rem', color: 'var(--color-text-secondary)', mb: 4 }}>
                    {currentLeaf.description}
                </Typography>
                {currentLeaf.driveUrl ? (
                    <>
                        <IframeViewer driveUrl={currentLeaf.driveUrl} title={currentLeaf.title} height="75vh" minHeight="500px" />
                        <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                            <Button variant="contained" startIcon={<OpenInNewIcon />}
                                onClick={() => handleOpenLink(currentLeaf.driveUrl)}
                                sx={{ bgcolor: 'var(--color-yellow)', color: '#1A1A1A', border: `3px solid ${BORDER}`, boxShadow: `3px 3px 0px ${SHADOW}`, fontFamily: FONT_MONO, fontWeight: 700, fontSize: '0.95rem', px: 3, py: 1.5, transition: 'transform 0.12s ease, box-shadow 0.12s ease', '&:hover': { bgcolor: 'var(--color-yellow)', transform: 'translate(-2px, -2px)', boxShadow: `5px 5px 0px ${SHADOW}` }, '&:active': { transform: 'translate(2px, 2px)', boxShadow: `1px 1px 0px ${SHADOW}` } }}>
                                <OpenInNewIcon sx={{ mr: 1.5 }} /> View in New Tab
                            </Button>
                            <Button variant="outlined" startIcon={<DownloadIcon />}
                                onClick={() => handleOpenLink(currentLeaf.driveUrl)}
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

    if (selectedSubCard && hasSubCards) {
        return (
            <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
                <Breadcrumbs subCardTitle={currentSubCard.title} />
                <Box component="span" onClick={handleBack} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBack(); } }}
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: 'var(--color-text-secondary)', fontFamily: FONT_MONO, fontSize: '0.85rem', fontWeight: 600, mb: 2, '&:hover': { color: 'var(--color-text)' } }}
                    role="link" tabIndex={0} aria-label="Go back"><ArrowBackIcon fontSize="small" /> Back</Box>
                <Typography sx={{ fontFamily: FONT_HEADING, fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, mb: 1 }}>
                    {currentSubCard.title}
                </Typography>
                <Typography sx={{ fontFamily: FONT_MONO, fontSize: '0.9rem', color: 'var(--color-text-secondary)', mb: 4 }}>
                    {currentSubCard.description}
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                    {leafItems.map((leaf) => (
                        <ResourceCard
                            key={leaf.id}
                            resource={teacherCardToResource(leaf, currentSubCard.title)}
                            viewMode="grid"
                            onView={(id) => navigate({ to: '/view/$id', params: { id } })}
                            onDownload={(url) => window.open(url, '_blank')}
                        />
                    ))}
                </Box>
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
                    {allSubCards.map((subCard) => {
                        const hasChildren = subCard.hasSubCards && !!subCard.subCards?.length;
                        return hasChildren ? (
                            <Box
                                key={subCard.id}
                                onClick={() => setSelectedSubCard(subCard.id)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSubCard(subCard.id); } }}
                                sx={{
                                    border: `3px solid ${BORDER}`,
                                    boxShadow: `4px 4px 0px ${SHADOW}`,
                                    p: 3,
                                    bgcolor: 'var(--color-bg)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                                    '&:hover': { transform: 'translate(-2px, -2px)', boxShadow: `6px 6px 0px ${SHADOW}` },
                                }}
                                role="button" tabIndex={0}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <Box sx={{ p: 1.5, border: `2px solid ${BORDER}`, bgcolor: 'var(--color-yellow)', display: 'inline-flex', flexShrink: 0 }}>
                                        <PictureAsPdfIcon sx={{ fontSize: 32, color: 'var(--color-text)' }} />
                                    </Box>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography sx={{ fontFamily: FONT_HEADING, fontWeight: 800, fontSize: '1.05rem', mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {subCard.title}
                                        </Typography>
                                        <Box sx={{ display: 'inline-flex', px: 1.5, py: 0.3, bgcolor: 'var(--color-pink)', border: `2px solid ${BORDER}`, fontFamily: FONT_MONO, fontWeight: 700, fontSize: '0.75rem', mb: 1 }}>
                                            {pageTitle}
                                        </Box>
                                        <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                            {subCard.description}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontFamily: FONT_MONO, fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Browse <ArrowForwardIcon sx={{ fontSize: 14 }} />
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <ResourceCard
                                key={subCard.id}
                                resource={teacherCardToResource(subCard, pageTitle)}
                                viewMode="grid"
                                onView={(id) => navigate({ to: '/view/$id', params: { id } })}
                                onDownload={(url) => window.open(url, '_blank')}
                            />
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}

export const Route = createRoute({
    getParentRoute: () => forTeachersRoute,
    path: 'tgt-pgt',
    component: TgtPgtPage,
});
