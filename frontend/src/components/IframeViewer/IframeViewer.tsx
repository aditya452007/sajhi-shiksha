import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import Error from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Skeleton from '@/components/Skeleton/Skeleton';
import { getDriveEmbedUrl } from '@/lib/utils';

export interface IframeViewerProps {
    driveUrl: string;
    title: string;
    height?: string;
    minHeight?: string;
    maxWidth?: string;
    onLoad?: () => void;
    onError?: () => void;
}

export default function IframeViewer({
    driveUrl,
    title,
    height = '70vh',
    minHeight = '500px',
    maxWidth = '900px',
    onLoad,
    onError,
}: IframeViewerProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const embedUrl = getDriveEmbedUrl(driveUrl);

    const handleLoad = useCallback(() => {
        setLoading(false);
        onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
        setLoading(false);
        setError(true);
        onError?.();
    }, [onError]);

    const handleRetry = () => {
        setLoading(true);
        setError(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                setLoading(false);
            }
        }, 8000);
        return () => clearTimeout(timer);
    }, [loading]);

    if (error) {
        return (
            <Paper
                sx={{
                    p: 4,
                    textAlign: 'center',
                    maxWidth,
                    mx: 'auto',
                    minHeight,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <Error sx={{ fontSize: 48, color: 'error.main' }} />
                <Typography variant="h6">Unable to load document</Typography>
                <Typography variant="body2" color="text.secondary">
                    The document could not be displayed in the viewer.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<OpenInNewIcon />}
                        onClick={() => window.open(driveUrl, '_blank')}
                    >
                        Open in New Tab
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={handleRetry}
                    >
                        Try Again
                    </Button>
                </Box>
            </Paper>
        );
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth,
                mx: 'auto',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'background.default',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        zIndex: 1,
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        width="80%"
                        height="60%"
                        sx={{ borderRadius: 2 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        Loading document...
                    </Typography>
                </Box>
            )}
            <iframe
                src={embedUrl}
                title={title}
                style={{
                    width: '100%',
                    height,
                    minHeight,
                    border: 'none',
                    display: 'block',
                }}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
            />
        </Box>
    );
}
