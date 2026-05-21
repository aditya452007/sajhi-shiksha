import { useState, useMemo } from 'react';
import { Box, Typography, Grid, Breadcrumbs, Link, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
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
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    component="button"
                    onClick={() => onNavigate('/')}
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                    <HomeIcon fontSize="small" />
                    Home
                </Link>
                <Typography color="text.primary">{title}</Typography>
            </Breadcrumbs>

            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontFamily: "'Nunito', sans-serif" }}>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {description}
            </Typography>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    {filteredResources.length === categoryResources.length
                        ? `${categoryResources.length} resources`
                        : `Showing ${filteredResources.length} of ${categoryResources.length} resources`}
                </Typography>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, val) => val && setViewMode(val)}
                    size="small"
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
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        No resources found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try adjusting your filters or search terms.
                    </Typography>
                </Paper>
            ) : viewMode === 'grid' ? (
                <Grid container spacing={3}>
                    {filteredResources.map((resource) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resource.id}>
                            <ResourceCard
                                resource={resource}
                                viewMode="grid"
                                onView={onViewResource}
                                onDownload={handleDownload}
                            />
                        </Grid>
                    ))}
                </Grid>
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
