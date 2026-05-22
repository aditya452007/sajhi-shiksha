import React from 'react';
import { Box, Typography } from '@mui/material';
import IframeViewer from '@/components/IframeViewer/IframeViewer';
import { FONT_HEADING, FONT_MONO } from '@/lib/constants';

interface ContentBlockProps {
    title: string;
    description: string;
    driveUrl: string;
    lastUpdated: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, description, driveUrl, lastUpdated }) => {
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    return (
        <Box
            sx={{
                p: { xs: 3, md: 4 },
                mb: 6,
                bgcolor: 'var(--color-bg)',
                border: `3px solid ${borderColor}`,
                boxShadow: `4px 4px 0px ${shadowColor}`,
            }}
        >
            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 800,
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                    mb: 1,
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '1rem',
                    mb: 3,
                }}
            >
                {description}
            </Typography>
            {driveUrl ? (
                <IframeViewer
                    driveUrl={driveUrl}
                    title={title}
                    height="60vh"
                    minHeight="400px"
                />
            ) : (
                <Box
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        bgcolor: 'var(--color-bg-secondary)',
                        border: `2px solid ${borderColor}`,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT_MONO,
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.95rem',
                        }}
                    >
                        No content yet — check back soon!
                    </Typography>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Typography
                    sx={{
                        fontFamily: FONT_MONO,
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                    }}
                >
                    Last updated: {lastUpdated}
                </Typography>
            </Box>
        </Box>
    );
};

export default ContentBlock;
