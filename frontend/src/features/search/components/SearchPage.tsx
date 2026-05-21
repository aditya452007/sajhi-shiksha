import { useState, useMemo, useEffect, useCallback } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@/context/ThemeContext';
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
    const [isDark] = useTheme();
    const [query, setQuery] = useState(initialQuery);
    const [filters, setFilters] = useState<FilterState>({
        ...DEFAULT_FILTERS,
        search: initialQuery,
    });
    const [hasSearched, setHasSearched] = useState(!!initialQuery);
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

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
                    mb: 3,
                }}
            >
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
                    <Typography
                        sx={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                            mb: 1,
                        }}
                    >
                        Recent Searches
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {recentSearches.map((search) => (
                            <Chip
                                key={search}
                                label={search}
                                onClick={() => handleSearch(search)}
                                clickable
                                sx={{
                                    border: `2px solid ${borderColor}`,
                                    boxShadow: `2px 2px 0px ${shadowColor}`,
                                    fontFamily: "'Space Mono', monospace",
                                    fontWeight: 600,
                                    bgcolor: 'var(--color-bg)',
                                    color: 'var(--color-text)',
                                }}
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
                            <Typography
                                sx={{
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: '0.85rem',
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{filters.search}&quot;
                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: '0.85rem',
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                {results.length} resource{results.length !== 1 ? 's' : ''}
                            </Typography>
                        )}
                    </Box>
                </>
            )}

            {!hasSearched ? (
                <Box
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        bgcolor: 'var(--color-bg)',
                        border: `3px solid ${borderColor}`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                    }}
                >
                    <SearchIcon sx={{ fontSize: 48, color: 'var(--color-text-secondary)', mb: 2 }} />
                    <Typography
                        sx={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            mb: 1,
                        }}
                    >
                        Search for study materials
                    </Typography>
                    <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                        Type keywords like &quot;mathematics&quot;, &quot;class 3&quot;, or &quot;question papers&quot;
                    </Typography>
                </Box>
            ) : results.length === 0 ? (
                <Box
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        bgcolor: 'var(--color-bg)',
                        border: `3px solid ${borderColor}`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                    }}
                >
                    <SearchIcon sx={{ fontSize: 48, color: 'var(--color-text-secondary)', mb: 2 }} />
                    <Typography
                        sx={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            mb: 1,
                        }}
                    >
                        No results found
                    </Typography>
                    <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', mb: 3 }}>
                        Try different keywords or remove some filters
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['Mathematics', 'Class 3', 'Question Papers'].map((term) => (
                            <Chip
                                key={term}
                                label={term}
                                onClick={() => handleSearch(term)}
                                clickable
                                sx={{
                                    border: `2px solid ${borderColor}`,
                                    boxShadow: `2px 2px 0px ${shadowColor}`,
                                    fontFamily: "'Space Mono', monospace",
                                    fontWeight: 600,
                                    bgcolor: 'var(--color-bg)',
                                    color: 'var(--color-text)',
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 3,
                    }}
                >
                    {results.map((resource) => (
                        <ResourceCard
                            key={resource.id}
                            resource={resource}
                            viewMode="grid"
                            onView={onViewResource}
                            onDownload={handleDownload}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}
