import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useTheme } from '@/context/ThemeContext';
import navigation from '@/data/navigation.json';
import siteConfig from '@/data/site-config.json';
import { StarDoodle, SquiggleDoodle } from '@/components/Doodles';
import { FONT_HEADING, FONT_MONO, MAX_CONTENT_WIDTH } from '@/lib/constants';

interface FooterLinkSectionProps {
    title: string;
    items: { label: string; route: string }[];
}

const FooterLinkSection: React.FC<FooterLinkSectionProps> = React.memo(({ title, items }) => {
    const navigate = useNavigate();
    const borderColor = 'var(--color-border)';

    const handleNavigate = useCallback((route: string) => {
        navigate({ to: route });
    }, [navigate]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent, route: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNavigate(route);
        }
    }, [handleNavigate]);

    return (
        <Box sx={{ mb: { xs: 3, md: 0 } }} aria-label={title}>
            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
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
                    role="link"
                    aria-label={`Navigate to ${item.label}`}
                    tabIndex={0}
                    onClick={() => handleNavigate(item.route)}
                    onKeyDown={(e) => handleKeyDown(e, item.route)}
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
                        outline: 'none',
                        '&:focus-visible': {
                            outline: '2px solid var(--color-yellow)',
                            outlineOffset: '2px',
                        },
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
});

FooterLinkSection.displayName = 'FooterLinkSection';

const Footer: React.FC = () => {
    const [isDark] = useTheme();
    const footerLinks = navigation.footerLinks;
    const borderColor = 'var(--color-border)';

    return (
        <Box
            component="footer"
            role="contentinfo"
            aria-label="Site footer"
            sx={{
                bgcolor: isDark ? 'var(--color-bg-secondary)' : 'var(--color-yellow)',
                borderTop: `3px solid ${borderColor}`,
                py: { xs: 6, md: 8 },
                pb: { xs: 10, md: 8 },
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
                aria-hidden="true"
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
                aria-hidden="true"
            >
                <StarDoodle size={32} rotation={-10} />
            </Box>

            <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', position: 'relative', zIndex: 1 }}>
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
                                fontFamily: FONT_HEADING,
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
                            fontFamily: FONT_MONO,
                            fontSize: '0.9rem',
                            color: 'var(--color-text-secondary)',
                            mb: 2,
                            }}
                        >
                            {siteConfig.tagline}
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }} aria-hidden="true">
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
                            <FooterLinkSection title="Quick Links" items={footerLinks.quickLinks} />
                        </Box>
                        <Box>
                            <FooterLinkSection title="Resources" items={footerLinks.resources} />
                        </Box>
                        <Box>
                            <FooterLinkSection title="About" items={footerLinks.about} />
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
                            fontFamily: FONT_MONO,
                            fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        &copy; {new Date().getFullYear()} {siteConfig.siteName}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: FONT_MONO,
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
