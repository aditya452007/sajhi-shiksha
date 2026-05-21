import React, { useState, useCallback } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { SUBJECTS_PRIMARY, MAX_CONTENT_WIDTH, FONT_HEADING, FONT_MONO, COLOR_TEXT_LIGHT, BORDER_RADIUS_PILL } from '@/lib/constants';
import { SquiggleDoodle } from '@/components/Doodles';

interface ClassSpotlightProps {
    title: string;
    classNumbers: number[];
}

const ClassSpotlight: React.FC<ClassSpotlightProps> = ({ title, classNumbers }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    const activeClass = classNumbers[activeTab] ?? 1;

    const subjectColors: Record<string, string> = {
        Mathematics: 'var(--subject-math)',
        English: 'var(--subject-english)',
        Hindi: 'var(--subject-hindi)',
        EVS: 'var(--subject-science)',
        General: 'var(--subject-general)',
    };

    const handleSubjectClick = useCallback((subject: string) => {
        navigate({
            to: '/search',
            search: { class: String(activeClass), subject },
        });
    }, [navigate, activeClass]);

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
                        color: 'var(--color-text)',
                    }}
                >
                    {title}
                </Typography>
            </motion.div>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <SquiggleDoodle width={100} />
            </Box>

            <Tabs
                value={activeTab}
                onChange={(_event, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 4,
                    '& .MuiTabs-indicator': {
                        display: 'none',
                    },
                    '& .MuiTab-root': {
                        border: `2px solid ${borderColor}`,
                        borderRadius: BORDER_RADIUS_PILL,
                        boxShadow: `2px 2px 0px ${shadowColor}`,
                        mx: 0.5,
                        fontFamily: FONT_MONO,
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            minHeight: '40px',
                            minWidth: 'auto',
                            px: 2,
                            color: 'var(--color-text)',
                            transition: 'all 0.15s ease',
                            '&.Mui-selected': {
                                bgcolor: 'var(--color-yellow)',
                                color: '#1A1A1A',
                                boxShadow: `1px 1px 0px ${shadowColor}`,
                                transform: 'translate(1px, 1px)',
                            },
                        },
                    }}
                >
                    {classNumbers.map((cls) => (
                        <Tab key={cls} label={`Class ${cls}`} />
                    ))}
                </Tabs>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr 1fr',
                            sm: 'repeat(5, 1fr)',
                        },
                        gap: 2,
                    }}
                >
                    {SUBJECTS_PRIMARY.map((subject, i) => (
                        <motion.div
                            key={subject}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                                delay: i * 0.05,
                            }}
                        >
                            <Box
                                onClick={() => handleSubjectClick(subject)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleSubjectClick(subject);
                                    }
                                }}
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: subjectColors[subject] || 'var(--color-bg)',
                                    border: `3px solid ${borderColor}`,
                                    boxShadow: `3px 3px 0px ${shadowColor}`,
                                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                    '&:hover': {
                                        transform: 'translate(-2px, -2px)',
                                        boxShadow: `5px 5px 0px ${shadowColor}`,
                                    },
                                    '&:active': {
                                        transform: 'translate(2px, 2px)',
                                        boxShadow: `1px 1px 0px ${shadowColor}`,
                                    },
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label={`${subject} Class ${activeClass}`}
                            >
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: 'var(--color-bg)',
                                        border: `2px solid ${borderColor}`,
                                        borderRadius: 0,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: FONT_HEADING,
                                            fontWeight: 800,
                                            color: subjectColors[subject] || 'var(--color-text)',
                                        }}
                                    >
                                        {subject[0]}
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        fontFamily: FONT_HEADING,
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        mb: 0.5,
                                color: COLOR_TEXT_LIGHT,
                                    }}
                                >
                                    {subject}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: FONT_MONO,
                                        fontSize: '0.7rem',
                                        color: 'rgba(26, 26, 26, 0.7)',
                                    }}
                                >
                                    Class {activeClass}
                                </Typography>
                            </Box>
                        </motion.div>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default React.memo(ClassSpotlight);
