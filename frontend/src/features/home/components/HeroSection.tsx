import React, { useState } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { FILTER_CHIPS } from '@/lib/constants';
import { StarDoodle, PencilDoodle, BookDoodle } from '@/components/Doodles';

interface HeroSectionProps {
    onFilter: (filter: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onFilter }) => {
    const [isDark] = useTheme();
    const [activeFilter, setActiveFilter] = useState('all');
    const borderColor = isDark ? '#FFFFFF' : '#1A1A1A';
    const shadowColor = isDark ? '#000000' : '#1A1A1A';

    const handleFilterClick = (value: string) => {
        setActiveFilter(value);
        onFilter(value);
    };

    const chipColors = [
        'var(--color-yellow)',
        'var(--color-pink)',
        'var(--color-blue)',
        'var(--color-green)',
        'var(--color-purple)',
    ];

    return (
        <Box
            sx={{
                position: 'relative',
                py: { xs: 6, md: 10 },
                px: { xs: 2, md: 4 },
                overflow: 'hidden',
                bgcolor: 'var(--color-bg)',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 24,
                    right: { xs: 16, md: 48 },
                    opacity: 0.7,
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <StarDoodle size={48} rotation={12} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 32,
                    left: { xs: 16, md: 32 },
                    opacity: 0.5,
                }}
            >
                <StarDoodle size={32} rotation={-8} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: { xs: 'auto', md: '10%' },
                    transform: 'translateY(-50%)',
                    opacity: 0.4,
                    display: { xs: 'none', lg: 'block' },
                }}
            >
                <PencilDoodle size={64} />
            </Box>

            <Box
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    position: 'relative',
                    zIndex: 1,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
                    gap: { xs: 4, md: 6 },
                    alignItems: 'center',
                }}
            >
                <Box>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 800,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                                lineHeight: 1.05,
                                mb: 3,
                            }}
                        >
                            What do you want to{' '}
                            <Box
                                component="span"
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 2,
                                        left: 0,
                                        right: 0,
                                        height: '8px',
                                        bgcolor: 'var(--color-yellow)',
                                        zIndex: -1,
                                        transform: 'rotate(-1deg)',
                                    },
                                }}
                            >
                                learn
                            </Box>{' '}
                            today?
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '1.1rem', md: '1.25rem' },
                                color: 'var(--color-text-secondary)',
                                mb: 4,
                                maxWidth: '540px',
                            }}
                        >
                            Free study materials, question papers, and resources for KVS students. No login needed.
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Search resources, subjects, classes..."
                            onClick={() => window.location.href = '/search'}
                            sx={{
                                maxWidth: { xs: '100%', md: '480px' },
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 0,
                                    bgcolor: 'var(--color-bg)',
                                    border: `3px solid ${borderColor}`,
                                    boxShadow: `3px 3px 0px ${shadowColor}`,
                                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                                    '&:hover': {
                                        bgcolor: 'var(--color-bg-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        borderColor: 'var(--color-yellow)',
                                        borderWidth: '4px',
                                        boxShadow: `4px 4px 0px ${shadowColor}`,
                                    },
                                },
                            }}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: 'var(--color-text)' }} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            aria-label="Search resources"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1.5,
                            }}
                        >
                            {FILTER_CHIPS.map((chip, i) => (
                                <motion.button
                                    key={chip.value}
                                    onClick={() => handleFilterClick(chip.value)}
                                    whileHover={{
                                        y: -2,
                                        boxShadow: `4px 4px 0px ${shadowColor}`,
                                    }}
                                    whileTap={{
                                        y: 1,
                                        boxShadow: `1px 1px 0px ${shadowColor}`,
                                    }}
                                    style={{
                                        background: activeFilter === chip.value
                                            ? chipColors[i % chipColors.length]
                                            : 'var(--color-bg)',
                                        border: `2px solid ${borderColor}`,
                                        boxShadow: activeFilter === chip.value
                                            ? `1px 1px 0px ${shadowColor}`
                                            : `2px 2px 0px ${shadowColor}`,
                                        borderRadius: '9999px',
                                        padding: '6px 16px',
                                        fontFamily: "'Space Mono', monospace",
                                        fontWeight: 700,
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        transform: activeFilter === chip.value ? 'translate(1px, 1px)' : 'translate(0, 0)',
                                    }}
                                >
                                    {chip.label}
                                </motion.button>
                            ))}
                        </Box>
                    </motion.div>
                </Box>

                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        minHeight: { md: '200px', lg: '280px' },
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
                        style={{ position: 'relative' }}
                    >
                        <Box
                            sx={{
                                width: { md: 180, lg: 220 },
                                height: { md: 180, lg: 220 },
                                bgcolor: 'var(--color-yellow)',
                                border: `3px solid ${borderColor}`,
                                boxShadow: `6px 6px 0px ${shadowColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: 'rotate(3deg)',
                            }}
                        >
                            <BookDoodle size={80} />
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -16,
                                right: -24,
                                transform: 'rotate(12deg)',
                            }}
                        >
                            <StarDoodle size={40} color="var(--color-pink)" />
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -12,
                                left: -20,
                                transform: 'rotate(-15deg)',
                            }}
                        >
                            <StarDoodle size={32} color="var(--color-blue)" />
                        </Box>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroSection;
