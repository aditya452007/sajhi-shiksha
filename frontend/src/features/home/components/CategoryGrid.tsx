import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import { SquiggleDoodle } from '@/components/Doodles';
import type { CategoryCard as CategoryCardType } from '@/types';
import { MAX_CONTENT_WIDTH, FONT_HEADING } from '@/lib/constants';

interface CategoryGridProps {
    categories: CategoryCardType[];
    onCategoryClick: (route: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = React.memo(({ categories, onCategoryClick }) => {
    return (
        <Box
            sx={{
                py: { xs: 6, md: 8 },
                px: { xs: 2, md: 4 },
                position: 'relative',
            }}
        >
            <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT_HEADING,
                            fontWeight: 800,
                            fontSize: { xs: '1.75rem', md: '2.25rem' },
                            textAlign: 'center',
                            mb: 2,
                        }}
                    >
                        Pick Your Path
                    </Typography>
                </motion.div>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 6,
                    }}
                >
                    <SquiggleDoodle width={120} />
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr 1fr',
                            md: '1fr 1fr 1fr',
                            lg: '1fr 1fr 1fr 1fr',
                        },
                        gap: { xs: 3, md: 4 },
                    }}
                >
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={category.id}
                            title={category.title}
                            description={category.description}
                            icon={category.icon}
                            resourceCount={category.resourceCount}
                            onClick={() => onCategoryClick(category.route)}
                            index={index}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
});

CategoryGrid.displayName = 'CategoryGrid';

export default CategoryGrid;
