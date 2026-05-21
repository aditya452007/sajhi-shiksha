import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import siteConfig from '@/data/site-config.json';
import { ArrowDoodle, StarDoodle } from '@/components/Doodles';

const ContributeCTA: React.FC = () => {
    const [isDark] = useTheme();
    const borderColor = isDark ? '#FFFFFF' : '#1A1A1A';
    const shadowColor = isDark ? '#000000' : '#1A1A1A';

    return (
        <Box
            sx={{
                py: { xs: 6, md: 8 },
                px: { xs: 2, md: 4 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 24,
                    opacity: 0.5,
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <StarDoodle size={40} color="var(--color-yellow)" rotation={15} />
            </Box>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        p: { xs: 4, md: 6 },
                        textAlign: 'center',
                        bgcolor: isDark ? '#222240' : 'var(--color-yellow)',
                        border: `3px solid ${borderColor}`,
                        boxShadow: `6px 6px 0px ${shadowColor}`,
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -16,
                            left: { xs: '50%', md: '20%' },
                            transform: 'translateX(-50%) rotate(-10deg)',
                        }}
                    >
                        <ArrowDoodle size={48} direction="down" />
                    </Box>

                    <VolunteerActivismIcon
                        sx={{
                            fontSize: 48,
                            mb: 2,
                            color: 'var(--color-text)',
                        }}
                    />
                    <Typography
                        sx={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 800,
                            fontSize: { xs: '1.75rem', md: '2.25rem' },
                            mb: 2,
                        }}
                    >
                        Got Resources to Share?
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            color: 'var(--color-text-secondary)',
                            mb: 3,
                            maxWidth: '600px',
                            mx: 'auto',
                        }}
                    >
                        Help fellow students and teachers. Email us your study materials, notes, or formats — every contribution counts!
                    </Typography>
                    <motion.div
                        whileHover={{
                            y: -2,
                            boxShadow: `6px 6px 0px ${shadowColor}`,
                        }}
                        whileTap={{
                            y: 2,
                            boxShadow: `1px 1px 0px ${shadowColor}`,
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            href={`mailto:${siteConfig.contactEmail}`}
                            sx={{
                                bgcolor: 'var(--color-bg)',
                                color: 'var(--color-text)',
                                border: `3px solid ${borderColor}`,
                                boxShadow: `4px 4px 0px ${shadowColor}`,
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    bgcolor: 'var(--color-bg-secondary)',
                                },
                            }}
                        >
                            Email Us
                        </Button>
                    </motion.div>
                </Box>
            </motion.div>
        </Box>
    );
};

export default ContributeCTA;
