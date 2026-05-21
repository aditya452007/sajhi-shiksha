import React from 'react';
import { Box, Typography, List, ListItemText, ListItemIcon } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { SquiggleDoodle } from '@/components/Doodles';
import { FONT_HEADING, COLOR_TEXT_LIGHT } from '@/lib/constants';

interface QuickLinkItem {
    id: string;
    title: string;
    icon: React.ElementType;
    route: string;
}

const quickLinks: QuickLinkItem[] = [
    { id: '1', title: 'Morning Assembly Formats', icon: EventNoteIcon, route: '/resources/formats' },
    { id: '2', title: 'GOI/KVS Rules', icon: GavelIcon, route: '/resources/formats' },
    { id: '3', title: 'Office Formats', icon: DescriptionIcon, route: '/resources/formats' },
    { id: '4', title: 'Time Table Templates', icon: TableChartIcon, route: '/resources/formats' },
    { id: '5', title: 'Income Tax Guide', icon: ReceiptIcon, route: '/resources/formats' },
];

interface QuickLinksProps {
    onNavigate?: (route: string) => void;
}

const QuickLinks: React.FC<QuickLinksProps> = React.memo(({ onNavigate }) => {
    const [_isDark] = useTheme();
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    return (
        <Box
            sx={{
                py: { xs: 6, md: 8 },
                px: { xs: 2, md: 4 },
                bgcolor: 'var(--color-bg-secondary)',
                borderTop: `3px solid ${borderColor}`,
                borderBottom: `3px solid ${borderColor}`,
            }}
        >
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
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
                    Quick Links
                    </Typography>
                </motion.div>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <SquiggleDoodle width={100} />
                </Box>

                <Box
                    sx={{
                        border: `3px solid ${borderColor}`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                        bgcolor: 'var(--color-bg)',
                    }}
                >
                    <List disablePadding>
                        {quickLinks.map((link, i) => (
         <Box
                                key={link.id}
                                role="button"
                                tabIndex={0}
                                aria-label={link.title}
                                onClick={() => onNavigate?.(link.route)}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate?.(link.route); }}
                                sx={{
                                    borderBottom: i < quickLinks.length - 1 ? `2px solid ${borderColor}` : 'none',
                                    cursor: onNavigate ? 'pointer' : 'default',
                                    transition: 'background-color 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 2,
                                    py: 1.5,
                                    outline: 'none',
                                    '&:focus-visible': {
                                        outline: '2px solid var(--color-yellow)',
                                        outlineOffset: '-2px',
                                    },
                                        '&:hover': onNavigate ? {
                                        bgcolor: 'var(--color-yellow)',
                                        '& .quick-link-title': {
                                            color: COLOR_TEXT_LIGHT,
                                        },
                                        '& .quick-link-chevron': {
                                            color: COLOR_TEXT_LIGHT,
                                        },
                                    } : {},
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <link.icon sx={{ color: 'var(--color-text)' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            className="quick-link-title"
                                            sx={{
                                                fontFamily: FONT_HEADING,
                                                fontWeight: 700,
                                                color: 'var(--color-text)',
                                                transition: 'color 0.15s ease',
                                            }}
                                        >
                                            {link.title}
                                        </Typography>
                                    }
                                />
                                <ChevronRightIcon
                                    className="quick-link-chevron"
                                    aria-hidden="true"
                                    sx={{
                                        color: 'var(--color-text-secondary)',
                                        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease',
                                    }}
                                />
                            </Box>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
});

QuickLinks.displayName = 'QuickLinks';

export default QuickLinks;
