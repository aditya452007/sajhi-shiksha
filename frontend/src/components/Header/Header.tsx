import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, Drawer, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@/context/ThemeContext';
import navigation from '@/data/navigation.json';
import siteConfig from '@/data/site-config.json';
import { BookDoodle } from '@/components/Doodles';

interface HeaderProps {
    onNavigate: (route: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isDark, toggleTheme] = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavClick = (route: string) => {
        onNavigate(route);
        setMobileOpen(false);
    };

    const navItems = navigation.navItems.slice(0, 5);
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    const drawerContent = (
        <Box
            sx={{
                width: 280,
                height: '100%',
                bgcolor: 'var(--color-bg)',
                borderRight: `3px solid ${borderColor}`,
                display: 'flex',
                flexDirection: 'column',
            }}
            role="presentation"
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: `3px solid ${borderColor}`,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        color: 'var(--color-text)',
                    }}
                >
                    {siteConfig.siteName}
                </Typography>
                <IconButton
                    onClick={() => setMobileOpen(false)}
                    sx={{
                        border: `2px solid ${borderColor}`,
                        borderRadius: 0,
                        boxShadow: `2px 2px 0px ${shadowColor}`,
                        color: 'var(--color-text)',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <List sx={{ flex: 1, p: 2 }}>
                {navItems.map((item) => (
                    <ListItem
                        key={item.label}
                        onClick={() => handleNavClick(item.route)}
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 0,
                            mb: 1,
                            '&:hover': {
                                bgcolor: 'var(--color-yellow)',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                color: 'var(--color-text)',
                            }}
                        >
                            {item.label}
                        </Typography>
                    </ListItem>
                ))}
                {['Contribute', 'About'].map((label) => (
                    <ListItem
                        key={label}
                        onClick={() => handleNavClick(`/${label.toLowerCase()}`)}
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 0,
                            mb: 1,
                            '&:hover': {
                                bgcolor: 'var(--color-yellow)',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                color: 'var(--color-text)',
                            }}
                        >
                            {label}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <Box
                component="header"
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1100,
                    bgcolor: 'var(--color-bg)',
                    borderBottom: `3px solid ${borderColor}`,
                    py: 1.5,
                    px: { xs: 2, md: 4 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            cursor: 'pointer',
                        }}
                        onClick={() => handleNavClick('/')}
                    >
                        <BookDoodle size={32} />
                        <Typography
                            sx={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 800,
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                lineHeight: 1,
                                color: 'var(--color-text)',
                            }}
                        >
                            {siteConfig.siteName}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 2,
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                onClick={() => handleNavClick(item.route)}
                                sx={{
                                    color: 'var(--color-text)',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    border: 'none',
                                    boxShadow: 'none',
                                    borderRadius: 0,
                                    px: 2,
                                    py: 1,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: '50%',
                                        width: 0,
                                        height: '3px',
                                        bgcolor: borderColor,
                                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        transform: 'translateX(-50%)',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    },
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                    onClick={toggleTheme}
                    sx={{
                        border: `2px solid ${borderColor}`,
                        borderRadius: '9999px',
                        boxShadow: `2px 2px 0px ${shadowColor}`,
                                bgcolor: 'var(--color-bg)',
                        color: 'var(--color-text)',
                        transition: 'transform 100ms ease, box-shadow 100ms ease',
                        '&:active': {
                            transform: 'translate(2px, 2px)',
                            boxShadow: `1px 1px 0px ${shadowColor}`,
                        },
                    }}
                >
                    {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>

                        <Button
                            onClick={() => setMobileOpen(true)}
                            startIcon={<MenuIcon />}
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                border: `2px solid ${borderColor}`,
                                borderRadius: 0,
                                boxShadow: `2px 2px 0px ${shadowColor}`,
                                bgcolor: 'var(--color-yellow)',
                                color: '#1A1A1A',
                                fontFamily: "'Space Mono', monospace",
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                px: 2,
                                '& .MuiButton-startIcon': {
                                    color: '#1A1A1A',
                                },
                                '&:active': {
                                    transform: 'translate(2px, 2px)',
                                    boxShadow: `1px 1px 0px ${shadowColor}`,
                                },
                            }}
                        >
                            MENU
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{ keepMounted: true }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Header;
