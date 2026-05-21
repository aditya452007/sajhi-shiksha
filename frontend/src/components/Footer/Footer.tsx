import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@/context/ThemeContext';
import navigation from '@/data/navigation.json';
import siteConfig from '@/data/site-config.json';
import { StarDoodle, SquiggleDoodle } from '@/components/Doodles';

interface FooterProps {
    onNavigate: (route: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const isDark = useTheme()[0];
    const footerLinks = navigation.footerLinks;
    const borderColor = 'var(--color-border)';

    const linkSection = (
        title: string,
        items: { label: string; route: string }[]
    ) => (
        <Box sx={{ mb: { xs: 3, md: 0 } }}>
            <Typography
                sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    mb: 2,
                    pb: 1,
                    borderBottom: `3px solid ${borderColor}`,
                    display: 'inline-block',
                }}
            >
                {title}
            </Typography>
            {items.map((item) => (
                <Typography
                    key={item.label}
                    component="button"
                    onClick={() => onNavigate(item.route)}
                    sx={{
                        display: 'block',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        mb: 1,
                        fontSize: '1rem',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        textAlign: 'left',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -2,
                            left: 0,
                            width: 0,
                            height: '3px',
                            bgcolor: borderColor,
                            transition: 'width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        },
                        '&:hover': {
                            color: 'var(--color-text)',
                        },
                        '&:hover::after': {
                            width: '100%',
                        },
                    }}
                >
                    {item.label}
                </Typography>
            ))}
        </Box>
    );

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: isDark ? 'var(--color-bg-secondary)' : 'var(--color-yellow)',
                borderTop: `3px solid ${borderColor}`,
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
                    opacity: 0.6,
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <StarDoodle size={48} rotation={15} />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 48,
                    left: 16,
                    opacity: 0.4,
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <StarDoodle size={32} rotation={-10} />
            </Box>

            <Box sx={{ maxWidth: '1200px', mx: 'auto', position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 4, md: 6 },
                        mb: 6,
                    }}
                >
                    <Box sx={{ flex: { xs: 'unset', md: '1.2' } }}>
                        <Typography
                            sx={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 800,
                                fontSize: '1.5rem',
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            {siteConfig.siteName}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: '0.9rem',
                                color: 'var(--color-text-secondary)',
                                mb: 2,
                            }}
                        >
                            {siteConfig.tagline}
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <SquiggleDoodle width={120} />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' },
                            gap: { xs: 3, md: 4 },
                        }}
                    >
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            {linkSection('Quick Links', footerLinks.quickLinks)}
                        </Box>
                        <Box>
                            {linkSection('Resources', footerLinks.resources)}
                        </Box>
                        <Box>
                            {linkSection('About', footerLinks.about)}
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        borderTop: `3px solid ${borderColor}`,
                        pt: 4,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        &copy; {new Date().getFullYear()} {siteConfig.siteName}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        Made with &hearts; by students, for students
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
