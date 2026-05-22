import React from 'react';
import { Box, Typography } from '@mui/material';
import siteContent from '@/data/site-content.json';
import ContentBlock from './components/ContentBlock';
import { FONT_HEADING, FONT_MONO, MAX_CONTENT_WIDTH } from '@/lib/constants';

const MathLoversPage: React.FC = () => {
    const { mathLovers } = siteContent.sections;
    const blocks = mathLovers.blocks || [];

    return (
        <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    mb: 1,
                }}
            >
                {mathLovers.title}
            </Typography>
            <Typography
                sx={{
                    fontFamily: FONT_MONO,
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    mb: 6,
                }}
            >
                {mathLovers.subtitle}
            </Typography>

            {blocks.length === 0 ? (
                <Box
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        bgcolor: 'var(--color-bg)',
                        border: `3px solid var(--color-border)`,
                        boxShadow: `4px 4px 0px var(--color-shadow)`,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: FONT_HEADING,
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            mb: 1,
                        }}
                    >
                        No content blocks yet
                    </Typography>
                    <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                        Content will appear here once added to the configuration.
                    </Typography>
                </Box>
            ) : (
                blocks.map((block) => (
                    <ContentBlock
                        key={block.id}
                        title={block.title}
                        description={block.description}
                        driveUrl={block.driveUrl}
                        lastUpdated={block.lastUpdated}
                    />
                ))
            )}
        </Box>
    );
};

export default MathLoversPage;
