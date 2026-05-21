import { useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTheme } from '@/context/ThemeContext';
import resources from '@/data/resources.json';
import IframeViewer from '@/components/IframeViewer/IframeViewer';
import type { Resource } from '@/types';

interface ResourceViewPageProps {
    resourceId: string;
    onBack: () => void;
    onNavigate: (route: string) => void;
}

export default function ResourceViewPage({ resourceId, onBack, onNavigate }: ResourceViewPageProps) {
    const [isDark] = useTheme();
    const resource = useMemo(() => {
        return (resources as Resource[]).find((r) => r.id === resourceId);
    }, [resourceId]);
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    if (!resource) {
        return (
            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, py: 8, textAlign: 'center' }}>
                <Box
                    sx={{
                        p: 6,
                        bgcolor: 'var(--color-bg)',
                        border: `3px solid ${borderColor}`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 800,
                            fontSize: '1.75rem',
                            mb: 2,
                        }}
                    >
                        Resource not found
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={onBack}
                        sx={{
                            bgcolor: 'var(--color-yellow)',
                            color: '#1A1A1A',
                            border: `3px solid ${borderColor}`,
                            boxShadow: `3px 3px 0px ${shadowColor}`,
                        }}
                    >
                        Go Back
                    </Button>
                </Box>
            </Box>
        );
    }

    const handleDownload = () => {
        window.open(resource.driveUrl, '_blank');
    };

    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            // Fallback: select the URL
        }
    };

    const handleOpenInTab = () => {
        window.open(resource.driveUrl, '_blank');
    };

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <button
                    onClick={() => onNavigate('/')}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text)',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        padding: 0,
                    }}
                >
                    <ArrowBackIcon fontSize="small" />
                    Home
                </button>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography
                    sx={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: '1.75rem', md: '2.25rem' },
                        mb: 1,
                    }}
                >
                    {resource.title}
                </Typography>
                <Typography sx={{ color: 'var(--color-text-secondary)', mb: 2, fontSize: '1rem' }}>
                    {resource.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
                    {resource.class && (
                        <Box
                            sx={{
                                px: 2,
                                py: 0.5,
                                bgcolor: 'var(--color-yellow)',
                                border: `2px solid ${borderColor}`,
                                borderRadius: '9999px',
                                fontFamily: "'Space Mono', monospace",
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                color: '#1A1A1A',
                                boxShadow: `2px 2px 0px ${shadowColor}`,
                            }}
                        >
                            Class {resource.class}
                        </Box>
                    )}
                    {resource.subject && (
                        <Box
                            sx={{
                                px: 2,
                                py: 0.5,
                                bgcolor: 'var(--color-bg)',
                                border: `2px solid ${borderColor}`,
                                borderRadius: '9999px',
                                fontFamily: "'Space Mono', monospace",
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                boxShadow: `2px 2px 0px ${shadowColor}`,
                            }}
                        >
                            {resource.subject}
                        </Box>
                    )}
                    <Box
                        sx={{
                            px: 2,
                            py: 0.5,
                            bgcolor: 'var(--color-pink)',
                            border: `2px solid ${borderColor}`,
                            borderRadius: '9999px',
                            fontFamily: "'Space Mono', monospace",
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            boxShadow: `2px 2px 0px ${shadowColor}`,
                        }}
                    >
                        {resource.type.toUpperCase()}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                        sx={{
                            bgcolor: 'var(--color-yellow)',
                            color: '#1A1A1A',
                            border: `3px solid ${borderColor}`,
                            boxShadow: `3px 3px 0px ${shadowColor}`,
                            '&:hover': {
                                bgcolor: 'var(--color-bg-secondary)',
                                color: '#1A1A1A',
                                transform: 'translate(-2px, -2px)',
                                boxShadow: `5px 5px 0px ${shadowColor}`,
                            },
                        }}
                    >
                        Download
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        onClick={handleShare}
                        sx={{
                            border: `3px solid ${borderColor}`,
                            color: 'var(--color-text)',
                            boxShadow: `3px 3px 0px ${shadowColor}`,
                            '&:hover': {
                                bgcolor: 'var(--color-bg-secondary)',
                                transform: 'translate(-2px, -2px)',
                                boxShadow: `5px 5px 0px ${shadowColor}`,
                            },
                        }}
                    >
                        Share
                    </Button>
                    <Button
                        startIcon={<OpenInNewIcon />}
                        onClick={handleOpenInTab}
                        sx={{
                            bgcolor: 'transparent',
                            color: 'var(--color-text)',
                            border: 'none',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: 'transparent' },
                        }}
                    >
                        Open in New Tab
                    </Button>
                </Box>
            </Box>

            <IframeViewer
                driveUrl={resource.driveUrl}
                title={resource.title}
            />

            <Box
                sx={{
                    my: 4,
                    borderTop: `2px solid ${borderColor}`,
                }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        Contributors: {resource.contributors.join(', ')}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        Last Updated: {new Date(resource.lastUpdated).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                        })}
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    sx={{
                        border: `3px solid ${borderColor}`,
                        color: 'var(--color-text)',
                        boxShadow: `3px 3px 0px ${shadowColor}`,
                    }}
                >
                    Back to Resources
                </Button>
            </Box>
        </Box>
    );
}
