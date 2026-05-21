import { useMemo } from 'react';
import { Box, Typography, Breadcrumbs, Link, Chip, Button, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import resources from '@/data/resources.json';
import IframeViewer from '@/components/IframeViewer/IframeViewer';
import type { Resource } from '@/types';

interface ResourceViewPageProps {
    resourceId: string;
    onBack: () => void;
    onNavigate: (route: string) => void;
}

export default function ResourceViewPage({ resourceId, onBack, onNavigate }: ResourceViewPageProps) {
    const resource = useMemo(() => {
        return (resources as Resource[]).find((r) => r.id === resourceId);
    }, [resourceId]);

    if (!resource) {
        return (
            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, py: 8, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Resource not found
                </Typography>
                <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={onBack}>
                    Go Back
                </Button>
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
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    component="button"
                    onClick={() => onNavigate('/')}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                    Home
                </Link>
                {resource.class && (
                    <Link component="button" onClick={onBack}>
                        Class {resource.class}
                    </Link>
                )}
                <Typography color="text.primary">{resource.title}</Typography>
            </Breadcrumbs>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Nunito', sans-serif" }}>
                    {resource.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {resource.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                    {resource.class && (
                        <Chip
                            label={`Class ${resource.class}`}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {resource.subject && (
                        <Chip
                            label={resource.subject}
                            variant="outlined"
                        />
                    )}
                    <Chip
                        label={resource.type.toUpperCase()}
                        variant="outlined"
                        color="secondary"
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        onClick={handleShare}
                    >
                        Share
                    </Button>
                    <Button
                        variant="text"
                        startIcon={<OpenInNewIcon />}
                        onClick={handleOpenInTab}
                    >
                        Open in New Tab
                    </Button>
                </Box>
            </Box>

            <IframeViewer
                driveUrl={resource.driveUrl}
                title={resource.title}
            />

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Contributors: {resource.contributors.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
                >
                    Back to Resources
                </Button>
            </Box>
        </Box>
    );
}
