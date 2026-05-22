import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { FONT_HEADING, FONT_MONO } from '@/lib/constants';
import type { LinkItem } from '@/types';

interface ContentBlockProps {
    title: string;
    description: string;
    links?: LinkItem[];
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, description, links }) => {
    return (
        <Box
            sx={{
                p: { xs: 3, md: 4 },
                mb: 6,
                bgcolor: 'var(--color-bg)',
                border: '3px solid var(--color-border)',
                boxShadow: '4px 4px 0px var(--color-shadow)',
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
                    mb: 4,
                }}
            >
                {description}
            </Typography>
            {links && links.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {links.map((link, index) => (
                        link.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="none"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    px: 2.5,
                                    py: 1.75,
                                    bgcolor: 'var(--color-bg-secondary)',
                                    border: '2px solid var(--color-border)',
                                    boxShadow: '3px 3px 0px var(--color-shadow)',
                                    fontFamily: FONT_MONO,
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text)',
                                    transition: 'all 0.15s ease',
                                    '&:hover': {
                                        boxShadow: '1px 1px 0px var(--color-shadow)',
                                        transform: 'translate(2px, 2px)',
                                        bgcolor: 'var(--color-accent-bg)',
                                    },
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        minWidth: 6,
                                        borderRadius: '50%',
                                        bgcolor: 'var(--color-purple)',
                                        display: 'inline-block',
                                    }}
                                />
                                <Box component="span" sx={{ flex: 1 }}>
                                    {link.title}
                                </Box>
                                <Box
                                    component="span"
                                    sx={{
                                        fontSize: '0.75rem',
                                        color: 'var(--color-text-muted)',
                                        fontFamily: FONT_MONO,
                                    }}
                                >
                                    ↗
                                </Box>
                            </Link>
                        ) : (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    px: 2.5,
                                    py: 1.75,
                                    bgcolor: 'var(--color-bg-secondary)',
                                    border: '2px dashed var(--color-border)',
                                    fontFamily: FONT_MONO,
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-muted)',
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        minWidth: 6,
                                        borderRadius: '50%',
                                        bgcolor: 'var(--color-text-muted)',
                                        display: 'inline-block',
                                    }}
                                />
                                <Box component="span" sx={{ flex: 1 }}>
                                    {link.title} — <em>link not available yet</em>
                                </Box>
                            </Box>
                        )
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ContentBlock;
