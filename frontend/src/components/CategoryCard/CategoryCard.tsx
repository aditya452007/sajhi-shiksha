import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { MenuBook, School, LocalLibraryIcon, GavelIcon, AssignmentIcon, VolunteerActivismIcon, InfoIcon, HelpOutlinedIcon } from '@/components/Icons';
import { motion } from 'framer-motion';
import { formatResourceCount } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { FONT_HEADING, FONT_MONO, COLOR_TEXT_LIGHT, BORDER_RADIUS_PILL } from '@/lib/constants';

interface CategoryCardProps {
    title: string;
    description: string;
    icon: string;
    resourceCount: number;
    onClick: () => void;
    index?: number;
}

const iconMap: Record<string, React.ElementType> = {
    MenuBook,
    School,
    LocalLibrary: LocalLibraryIcon,
    Gavel: GavelIcon,
    Assignment: AssignmentIcon,
    VolunteerActivism: VolunteerActivismIcon,
    Info: InfoIcon,
};

const bgColors = [
    'var(--color-yellow)',
    'var(--color-pink)',
    'var(--color-blue)',
    'var(--color-green)',
    'var(--color-purple)',
    'var(--color-orange)',
];

const CategoryCard: React.FC<CategoryCardProps> = React.memo(
    ({ title, description, icon, resourceCount, onClick, index = 0 }) => {
        const [_isDark] = useTheme();
        const IconComponent = iconMap[icon] ?? HelpOutlinedIcon;
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

        const rotation = useMemo(() => {
            const seed = (index * 7 + 3) % 11;
            return (seed - 5) * 0.4;
        }, [index]);

        const bgColor = bgColors[index % bgColors.length];

        return (
            <motion.div
                whileHover={{
                    y: -4,
                    rotate: rotation - 1,
                    transition: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                whileTap={{
                    y: 2,
                    transition: { duration: 0.1 },
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                }}
                style={{
                    transform: `rotate(${rotation}deg)`,
                }}
            >
                <Box
                    onClick={onClick}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onClick();
                        }
                    }}
                    sx={{
                        cursor: 'pointer',
                        height: '100%',
                        bgcolor: bgColor,
                        border: `3px solid ${borderColor}`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Navigate to ${title}`}
                >
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            p: 1.5,
                            bgcolor: 'var(--color-bg)',
                            border: `2px solid ${borderColor}`,
                            borderRadius: 0,
                        }}
                    >
                        <IconComponent sx={{ fontSize: 36, color: 'var(--color-text)' }} />
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: FONT_HEADING,
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            mb: 1,
                            lineHeight: 1.2,
                            color: COLOR_TEXT_LIGHT,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '0.95rem',
                            color: 'rgba(26, 26, 26, 0.75)',
                            mb: 1.5,
                            flex: 1,
                        }}
                    >
                        {description}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: FONT_MONO,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: 'var(--color-text)',
                            bgcolor: 'var(--color-bg)',
                            border: `2px solid ${borderColor}`,
                            px: 2,
                            py: 0.5,
                            borderRadius: BORDER_RADIUS_PILL,
                            boxShadow: `2px 2px 0px ${shadowColor}`,
                        }}
                    >
                        {formatResourceCount(resourceCount)}
                    </Typography>
                </Box>
            </motion.div>
        );
    }
);

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
