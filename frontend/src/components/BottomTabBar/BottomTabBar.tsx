import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from '@tanstack/react-router';

interface TabConfig {
    label: string;
    route: string;
    icon: React.ReactElement;
}

const tabs: TabConfig[] = [
    { label: 'Home', route: '/', icon: <HomeIcon /> },
    { label: 'Class 1-5', route: '/resources/primary', icon: <SchoolIcon /> },
    { label: 'Class 6-12', route: '/resources/secondary', icon: <MenuBookIcon /> },
    { label: 'Programs', route: '/resources/programs', icon: <AutoAwesomeIcon /> },
    { label: 'Search', route: '/search', icon: <SearchIcon /> },
];

const BottomTabBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const activeIndex = tabs.findIndex((tab) => {
        if (tab.route === '/') return location.pathname === '/';
        return location.pathname.startsWith(tab.route);
    });

    return (
        <Box
            component="nav"
            sx={{
                display: { xs: 'flex', md: 'none' },
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
            aria-label="Mobile navigation"
        >
            <BottomNavigation
                value={activeIndex >= 0 ? activeIndex : false}
                onChange={(_event: React.SyntheticEvent, newValue: number): void => {
                    const tab = tabs[newValue];
                    if (tab) navigate({ to: tab.route });
                }}
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    '& .MuiBottomNavigationAction-root': {
                        minHeight: '48px',
                        minWidth: 0,
                        padding: '6px 4px 8px',
                        '& .MuiBottomNavigationAction-label': {
                            fontSize: '0.675rem',
                            lineHeight: 1.2,
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '1.3rem',
                        },
                    },
                }}
            >
                {tabs.map((tab) => (
                    <BottomNavigationAction
                        key={tab.route}
                        label={tab.label}
                        icon={tab.icon}
                        aria-label={tab.label}
                    />
                ))}
            </BottomNavigation>
        </Box>
    );
};

export default React.memo(BottomTabBar);
