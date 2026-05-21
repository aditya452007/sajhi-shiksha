import React, { useState, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import ClassSpotlight from './components/ClassSpotlight';
import SecondaryClassSpotlight from './components/SecondaryClassSpotlight';
import QuickLinks from './components/QuickLinks';
import ContributeCTA from './components/ContributeCTA';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import categories from '@/data/categories.json';
import type { CategoryCard as CategoryCardType } from '@/types';

interface HomePageProps {
    onNavigate: (route: string) => void;
}

const HomePage: React.FC<HomePageProps> = React.memo(({ onNavigate }) => {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const handleFilter = useCallback((filter: string): void => {
        setActiveFilter(filter);
    }, []);

    const handleCategoryClick = useCallback(
        (route: string): void => {
            onNavigate(route);
        },
        [onNavigate]
    );

    const filteredCategories: CategoryCardType[] = useMemo(
        () => activeFilter === 'all'
            ? categories
            : categories.filter((c) => {
                  if (activeFilter === 'primary') return c.id === 'primary';
                  if (activeFilter === 'secondary') return c.id === 'secondary';
                  if (activeFilter === 'formats') return c.id === 'formats';
                  if (activeFilter === 'rules') return c.id === 'formats';
                  return true;
              }),
        [activeFilter]
    );

    return (
        <Box component="main" aria-label="Home page content">
            <HeroSection onFilter={handleFilter} />
            <ScrollReveal>
                <CategoryGrid
                    categories={filteredCategories}
                    onCategoryClick={handleCategoryClick}
                />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <ClassSpotlight
                    title="Resources for Primary Classes"
                    classNumbers={[1, 2, 3, 4, 5]}
                />
            </ScrollReveal>
            <ScrollReveal delay={200}>
                <SecondaryClassSpotlight title="Resources for Secondary Classes" onNavigate={onNavigate} />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <QuickLinks onNavigate={onNavigate} />
            </ScrollReveal>
            <ScrollReveal delay={150}>
                <ContributeCTA />
            </ScrollReveal>
        </Box>
    );
});

HomePage.displayName = 'HomePage';

export default HomePage;
