import React, { useState, useMemo, useCallback } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { DescriptionIcon, ChevronRightIcon } from '@/components/Icons';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { CLASS_RANGES, MAX_CONTENT_WIDTH, FONT_HEADING, FONT_MONO, BORDER_RADIUS_PILL } from '@/lib/constants';
import { SquiggleDoodle } from '@/components/Doodles';
import resources from '@/data/resources.json';
import type { Resource } from '@/types';

interface SecondaryClassSpotlightProps {
    title: string;
    onNavigate?: (route: string) => void;
}

const SecondaryClassSpotlight: React.FC<SecondaryClassSpotlightProps> = React.memo(({ title, onNavigate }) => {
    const [_isDark] = useTheme();
    const [activeFilter, setActiveFilter] = useState('6-8');
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    const filters = [
        { label: 'Class 6-8', value: '6-8', range: CLASS_RANGES.middle },
        { label: 'Class 9-10', value: '9-10', range: CLASS_RANGES.secondary },
        { label: 'Class 11-12', value: '11-12', range: CLASS_RANGES.senior },
    ];

    const allResources = resources as Resource[];
    const secondaryResources = useMemo(() => {
        return allResources.filter((r) => r.category === 'secondary');
    }, [allResources]);

    const filteredResources = useMemo(() => {
        const active = filters.find((f) => f.value === activeFilter);
        if (!active) return secondaryResources;
        const range = active.range as readonly number[];
        return secondaryResources.filter((r) => r.class !== null && range.includes(r.class));
    }, [secondaryResources, activeFilter]);

    const displayResources = filteredResources.length > 0 ? filteredResources.slice(0, 5) : secondaryResources.slice(0, 5);

    const handleFilterClick = useCallback((value: string) => {
        setActiveFilter(value);
    }, []);

    const handleResourceClick = useCallback((id: string) => {
        onNavigate?.(`/view/${id}`);
    }, [onNavigate]);

    return (
        <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}>
            <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <Typography
                        sx={{
                        fontFamily: FONT_HEADING,
                        fontWeight: 800,
                        fontSize: { xs: '1.75rem', md: '2.25rem' },
                        textAlign: 'center',
                        mb: 2,
                    }}
                >
                    {title}
                </Typography>
            </motion.div>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <SquiggleDoodle width={100} />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: 1.5,
                    justifyContent: 'center',
                    mb: 4,
                    flexWrap: 'wrap',
                }}
            >
                {filters.map((filter) => (
                    <motion.button
                        key={filter.value}
                        onClick={() => handleFilterClick(filter.value)}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 1 }}
                        style={{
                            background: activeFilter === filter.value ? 'var(--color-pink)' : 'var(--color-bg)',
                            border: `2px solid ${borderColor}`,
                            boxShadow: activeFilter === filter.value
                                ? `1px 1px 0px ${shadowColor}`
                                : `2px 2px 0px ${shadowColor}`,
                            borderRadius: BORDER_RADIUS_PILL,
                            padding: '6px 16px',
                            fontFamily: FONT_MONO,
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                transform: activeFilter === filter.value ? 'translate(1px, 1px)' : 'translate(0, 0)',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {filter.label}
                        </motion.button>
                    ))}
                </Box>

                <Box
                    sx={{
                        border: `3px solid ${borderColor}`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                        bgcolor: 'var(--color-bg)',
                    }}
                >
                    <List disablePadding>
                        {displayResources.map((resource, i) => (
                            <ListItem
                                key={resource.id}
                                onClick={() => handleResourceClick(resource.id)}
                                sx={{
                                    borderBottom: i < displayResources.length - 1 ? `2px solid ${borderColor}` : 'none',
                                    cursor: onNavigate ? 'pointer' : 'default',
                                    transition: 'background-color 0.15s ease',
                                    '&:hover': onNavigate ? {
                                        bgcolor: 'var(--color-bg-secondary)',
                                    } : {},
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <DescriptionIcon sx={{ color: 'var(--color-text)' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                fontFamily: FONT_HEADING,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {resource.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{
                                                fontFamily: FONT_MONO,
                                                fontSize: '0.75rem',
                                                color: 'var(--color-text-secondary)',
                                            }}
                                        >
                                            Class {resource.class} &middot; {resource.subject}
                                        </Typography>
                                    }
                                />
                                <ChevronRightIcon
                                    sx={{
                                        color: 'var(--color-text-secondary)',
                                        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
});

SecondaryClassSpotlight.displayName = 'SecondaryClassSpotlight';

export default SecondaryClassSpotlight;
