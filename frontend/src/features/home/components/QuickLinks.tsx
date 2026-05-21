import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { SquiggleDoodle } from '@/components/Doodles';

interface QuickLinkItem {
    id: string;
    title: string;
    icon: React.ElementType;
}

const quickLinks: QuickLinkItem[] = [
    { id: '1', title: 'Morning Assembly Formats', icon: EventNoteIcon },
    { id: '2', title: 'GOI/KVS Rules', icon: GavelIcon },
    { id: '3', title: 'Office Formats', icon: DescriptionIcon },
    { id: '4', title: 'Time Table Templates', icon: TableChartIcon },
    { id: '5', title: 'Income Tax Guide', icon: ReceiptIcon },
];

const QuickLinks: React.FC = () => {
    const [isDark] = useTheme();
    const borderColor = isDark ? '#FFFFFF' : '#1A1A1A';
    const shadowColor = isDark ? '#000000' : '#1A1A1A';

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
                            fontFamily: "'Space Grotesk', sans-serif",
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
                            <ListItem
                                key={link.id}
                                sx={{
                                    borderBottom: i < quickLinks.length - 1 ? `2px solid ${borderColor}` : 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.15s ease',
                                    '&:hover': {
                                        bgcolor: 'var(--color-yellow)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <link.icon sx={{ color: 'var(--color-text)' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {link.title}
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
};

export default QuickLinks;
