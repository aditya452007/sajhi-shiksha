import { useState, useMemo } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@/context/ThemeContext';
import resources from '@/data/resources.json';
import FilterBar, { type FilterState } from '@/components/FilterBar/FilterBar';
import ResourceCard from '@/components/ResourceCard/ResourceCard';
import type { Resource } from '@/types';

interface ResourceListPageProps {
    category: string;
    title: string;
    description: string;
    onViewResource: (id: string) => void;
    onNavigate: (route: string) => void;
}

const DEFAULT_FILTERS: FilterState = { class: 'all', subject: 'all', type: 'all', search: '' };

export default function ResourceListPage({
    category,
    title,
    description,
    onViewResource,
    onNavigate,
}: ResourceListPageProps) {
    const [isDark] = useTheme();
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    const categoryResources = useMemo(() => {
        return (resources as Resource[]).filter((r) => r.category === category);
    }, [category]);

    const filteredResources = useMemo(() => {
        let result = categoryResources;

        if (filters.class !== 'all') {
            result = result.filter((r) => r.class === parseInt(filters.class, 10));
        }
        if (filters.subject !== 'all') {
            result = result.filter((r) => r.subject === filters.subject);
        }
        if (filters.type !== 'all') {
            result = result.filter((r) => r.type === filters.type);
        }
        if (filters.search) {
            const query = filters.search.toLowerCase();
            result = result.filter(
                (r) =>
                    r.title.toLowerCase().includes(query) ||
                    r.description.toLowerCase().includes(query)
            );
        }

        return result;
    }, [categoryResources, filters]);

    const handleDownload = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <button
                    onClick={() => onNavigate('/')}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text)',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        padding: 0,
                    }}
                >
                    <HomeIcon fontSize="small" />
                    Home
                </button>
            </Box>

            <Typography
                sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    mb: 1,
                }}
            >
                {title}
            </Typography>
            <Typography sx={{ color: 'var(--color-text-secondary)', mb: 4, fontSize: '1rem' }}>
                {description}
            </Typography>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 2 }}>
                <Typography
                    sx={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.85rem',
                        color: 'var(--color-text-secondary)',
                    }}
                >
                    {filteredResources.length === categoryResources.length
                        ? `${categoryResources.length} resources`
                        : `Showing ${filteredResources.length} of ${categoryResources.length} resources`}
                </Typography>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, val) => val && setViewMode(val)}
                    size="small"
                    sx={{
                        '& .MuiToggleButton-root': {
                            border: `2px solid ${borderColor}`,
                            color: 'var(--color-text)',
                            bgcolor: 'var(--color-bg)',
                            '&.Mui-selected': {
                                bgcolor: 'var(--color-yellow)',
                                color: '#1A1A1A',
                                boxShadow: `2px 2px 0px ${shadowColor}`,
                            },
                        },
                    }}
                >
                    <ToggleButton value="grid">
                        <GridViewIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="list">
                        <ViewListIcon fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {filteredResources.length === 0 ? (
                <Box
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        bgcolor: 'var(--color-bg)',
                        border: `3px solid ${borderColor}`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            mb: 1,
                        }}
                    >
                        No resources found
                    </Typography>
                    <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                        Try adjusting your filters or search terms.
                    </Typography>
                </Box>
            ) : viewMode === 'grid' ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 3,
                    }}
                >
                    {filteredResources.map((resource) => (
                        <ResourceCard
                            key={resource.id}
                            resource={resource}
                            viewMode="grid"
                            onView={onViewResource}
                            onDownload={handleDownload}
                        />
                    ))}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredResources.map((resource) => (
                        <ResourceCard
                            key={resource.id}
                            resource={resource}
                            viewMode="list"
                            onView={onViewResource}
                            onDownload={handleDownload}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}
