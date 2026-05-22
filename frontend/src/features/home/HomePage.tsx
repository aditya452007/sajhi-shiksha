import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './components/HeroSection';
import DoorwayCards from './components/DoorwayCards';
import BrainBoost from './components/BrainBoost';
import ContributeCTA from './components/ContributeCTA';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';

const HomePage: React.FC = React.memo(() => {
    return (
        <Box component="main" aria-label="Home page content">
            <HeroSection />
            <ScrollReveal>
                <DoorwayCards />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <BrainBoost />
            </ScrollReveal>
            <ScrollReveal delay={150}>
                <ContributeCTA />
            </ScrollReveal>
        </Box>
    );
});

HomePage.displayName = 'HomePage';

export default HomePage;
