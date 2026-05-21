import { useState, useMemo, useEffect, useCallback } from 'react';
import { Box, Typography, Grid, Breadcrumbs, Link, Paper, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import resources from '@/data/resources.json';
import SearchInput from '@/components/SearchBar/SearchInput';
import FilterBar, { type FilterState } from '@/components/FilterBar/FilterBar';
import ResourceCard from '@/components/ResourceCard/ResourceCard';
import type { Resource } from '@/types';

interface SearchPageProps {
    initialQuery?: string;
    onViewResource: (id: string) => void;
    onNavigate: (route: string) => void;
}

const DEFAULT_FILTERS: FilterState = { class: 'all', subject: 'all', type: 'all', search: '' };
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
    try {
        const stored = localStorage.getItem('recentSearches');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveRecentSearch(query: string): void {
    if (!query.trim()) return;
    const recent = getRecentSearches();
    const updated = [query, ...recent.filter((s: string) => s !== query)].slice(0, MAX_RECENT);
    try {
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch {
        // Storage full or unavailable
    }
}

function scoreResource(resource: Resource, query: string): number {
    const q = query.toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    let score = 0;

    for (const term of terms) {
        if (resource.title.toLowerCase().includes(term)) {
            score += resource.title.toLowerCase() === term ? 10 : 5;
        }
        if (resource.description.toLowerCase().includes(term)) {
            score += 3;
        }
        if (resource.category.toLowerCase().includes(term)) {
            score += 1;
        }
        if (resource.subject?.toLowerCase().includes(term)) {
            score += 1;
        }
    }

    return score;
}

export default function SearchPage({
    initialQuery = '',
    onViewResource,
    onNavigate,
}: SearchPageProps) {
    const [query, setQuery] = useState(initialQuery);
    const [filters, setFilters] = useState<FilterState>({
        ...DEFAULT_FILTERS,
        search: initialQuery,
    });
    const [hasSearched, setHasSearched] = useState(!!initialQuery);

    useEffect(() => {
        if (initialQuery) {
            setQuery(initialQuery);
            setFilters((prev) => ({ ...prev, search: initialQuery }));
            setHasSearched(true);
        }
    }, [initialQuery]);

    const allResources = useMemo(() => resources as Resource[], []);

    const results = useMemo(() => {
        if (!hasSearched) return [];

        let filtered = allResources;

        if (filters.search) {
            const q = filters.search.toLowerCase();
            filtered = filtered.filter(
                (r) =>
                    r.title.toLowerCase().includes(q) ||
                    r.description.toLowerCase().includes(q) ||
                    r.category.toLowerCase().includes(q) ||
                    r.subject?.toLowerCase().includes(q)
            );

            filtered = filtered
                .map((r) => ({ resource: r, score: scoreResource(r, filters.search) }))
                .filter(({ score }) => score > 0)
                .sort((a, b) => b.score - a.score)
                .map(({ resource }) => resource);
        }

        if (filters.class !== 'all') {
            filtered = filtered.filter((r) => r.class === parseInt(filters.class, 10));
        }
        if (filters.subject !== 'all') {
            filtered = filtered.filter((r) => r.subject === filters.subject);
        }
        if (filters.type !== 'all') {
            filtered = filtered.filter((r) => r.type === filters.type);
        }

        return filtered;
    }, [allResources, filters, hasSearched]);

    const handleSearch = useCallback((value: string) => {
        setQuery(value);
        setFilters((prev) => ({ ...prev, search: value }));
        setHasSearched(true);
        if (value.trim()) {
            saveRecentSearch(value.trim());
        }
    }, []);

    const handleDownload = (url: string) => {
        window.open(url, '_blank');
    };

    const recentSearches = getRecentSearches();

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
                <Typography color="text.primary">Search</Typography>
            </Breadcrumbs>

            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Nunito', sans-serif" }}>
                Search Resources
            </Typography>

            <Box sx={{ mb: 3 }}>
                <SearchInput
                    value={query}
                    onChange={setQuery}
                    onSearch={handleSearch}
                    autoFocus
                />
            </Box>

            {!hasSearched && recentSearches.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Recent Searches
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {recentSearches.map((search) => (
                            <Chip
                                key={search}
                                label={search}
                                onClick={() => handleSearch(search)}
                                clickable
                                variant="outlined"
                            />
                        ))}
                    </Box>
                </Box>
            )}

            {hasSearched && (
                <>
                    <FilterBar filters={filters} onFilterChange={setFilters} />

                    <Box sx={{ mt: 3, mb: 2 }}>
                        {filters.search ? (
                            <Typography variant="body2" color="text.secondary">
                                {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{filters.search}&quot;
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                {results.length} resource{results.length !== 1 ? 's' : ''}
                            </Typography>
                        )}
                    </Box>
                </>
            )}

            {!hasSearched ? (
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <SearchIcon sx={{ fontSize: 48, color: 'text.muted', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Search for study materials
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Type keywords like &quot;mathematics&quot;, &quot;class 3&quot;, or &quot;question papers&quot;
                    </Typography>
                </Paper>
            ) : results.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <SearchIcon sx={{ fontSize: 48, color: 'text.muted', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        No results found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Try different keywords or remove some filters
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Chip label="Mathematics" onClick={() => handleSearch('Mathematics')} clickable />
                        <Chip label="Class 3" onClick={() => handleSearch('Class 3')} clickable />
                        <Chip label="Question Papers" onClick={() => handleSearch('Question Papers')} clickable />
                    </Box>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {results.map((resource) => (
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
            )}
        </Box>
    );
}
