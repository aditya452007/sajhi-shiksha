import { useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    IconButton,
    Drawer,
    Typography,
    useMediaQuery,
    useTheme as useMuiTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useTheme } from '@/context/ThemeContext';

export interface FilterState {
    class: string;
    subject: string;
    type: string;
    search: string;
}

interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    classes?: string[];
    subjects?: string[];
    types?: string[];
}

const CLASS_OPTIONS = ['all', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const SUBJECT_OPTIONS = ['all', 'Mathematics', 'English', 'Hindi', 'Science', 'Social Science', 'Sanskrit', 'Physics', 'Biology', 'CS/IP', 'Accountancy', 'General'];
const TYPE_OPTIONS = ['all', 'pdf', 'document', 'link', 'format'];

export default function FilterBar({
    filters,
    onFilterChange,
    classes: classOptions = CLASS_OPTIONS,
    subjects: subjectOptions = SUBJECT_OPTIONS,
    types: typeOptions = TYPE_OPTIONS,
}: FilterBarProps) {
    const [isDark] = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    const hasActiveFilters =
        filters.class !== 'all' ||
        filters.subject !== 'all' ||
        filters.type !== 'all' ||
        filters.search !== '';

    const handleClearAll = () => {
        onFilterChange({ class: 'all', subject: 'all', type: 'all', search: '' });
    };

    const updateFilter = (key: keyof FilterState, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const activeFilterChips = [
        filters.class !== 'all' && { label: `Class ${filters.class}`, key: 'class' as const },
        filters.subject !== 'all' && { label: filters.subject, key: 'subject' as const },
        filters.type !== 'all' && { label: filters.type.toUpperCase(), key: 'type' as const },
    ].filter(Boolean) as { label: string; key: keyof FilterState }[];

    const filterContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                }}
            >
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'var(--color-text-secondary)' }}>Class</InputLabel>
                    <Select
                        value={filters.class}
                        label="Class"
                        onChange={(e) => updateFilter('class', e.target.value)}
                        sx={{
                            bgcolor: 'var(--color-bg)',
                            color: 'var(--color-text)',
                            '& .MuiSelect-select': { color: 'var(--color-text)' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-yellow)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: 'var(--color-yellow)' },
                        }}
                    >
                        {classOptions.map((cls) => (
                            <MenuItem key={cls} value={cls} sx={{ color: 'var(--color-text)' }}>
                                {cls === 'all' ? 'All Classes' : `Class ${cls}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel sx={{ color: 'var(--color-text-secondary)' }}>Subject</InputLabel>
                    <Select
                        value={filters.subject}
                        label="Subject"
                        onChange={(e) => updateFilter('subject', e.target.value)}
                        sx={{
                            bgcolor: 'var(--color-bg)',
                            color: 'var(--color-text)',
                            '& .MuiSelect-select': { color: 'var(--color-text)' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-yellow)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: 'var(--color-yellow)' },
                        }}
                    >
                        {subjectOptions.map((sub) => (
                            <MenuItem key={sub} value={sub} sx={{ color: 'var(--color-text)' }}>
                                {sub === 'all' ? 'All Subjects' : sub}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'var(--color-text-secondary)' }}>Type</InputLabel>
                    <Select
                        value={filters.type}
                        label="Type"
                        onChange={(e) => updateFilter('type', e.target.value)}
                        sx={{
                            bgcolor: 'var(--color-bg)',
                            color: 'var(--color-text)',
                            '& .MuiSelect-select': { color: 'var(--color-text)' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-yellow)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: 'var(--color-yellow)' },
                        }}
                    >
                        {typeOptions.map((type) => (
                            <MenuItem key={type} value={type} sx={{ color: 'var(--color-text)' }}>
                                {type === 'all' ? 'All Types' : type.toUpperCase()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    size="small"
                    placeholder="Search within results..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    sx={{
                        minWidth: 200,
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'var(--color-bg)',
                            '& input': { color: 'var(--color-text)' },
                            '& fieldset': { borderColor },
                            '&:hover fieldset': { borderColor: 'var(--color-yellow)' },
                            '&.Mui-focused fieldset': { borderWidth: 2, borderColor: 'var(--color-yellow)' },
                        },
                    }}
                />

                {hasActiveFilters && (
                    <Button
                        size="small"
                        startIcon={<ClearAllIcon />}
                        onClick={handleClearAll}
                        sx={{
                            color: 'var(--color-red)',
                            border: `2px solid var(--color-red)`,
                            '&:hover': { bgcolor: 'var(--color-red)', color: 'var(--color-bg)' },
                        }}
                    >
                        Clear All
                    </Button>
                )}
            </Box>

            {activeFilterChips.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {activeFilterChips.map((chip) => (
                        <Box
                            key={chip.key}
                            onClick={() => updateFilter(chip.key, 'all')}
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                bgcolor: 'var(--color-pink)',
                                border: `2px solid ${borderColor}`,
                                borderRadius: '9999px',
                                fontFamily: "'Space Mono', monospace",
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                boxShadow: `2px 2px 0px ${shadowColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                '&:hover': {
                                    transform: 'translate(-1px, -1px)',
                                    boxShadow: `3px 3px 0px ${shadowColor}`,
                                },
                                '&::after': {
                                    content: '"✕"',
                                    fontSize: '0.6rem',
                                },
                            }}
                        >
                            {chip.label}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );

    if (isMobile) {
        return (
            <>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={() => setDrawerOpen(true)}
                        fullWidth
                        sx={{
                            border: `3px solid ${borderColor}`,
                            boxShadow: `3px 3px 0px ${shadowColor}`,
                            bgcolor: 'var(--color-bg)',
                            color: 'var(--color-text)',
                            '&:hover': {
                                bgcolor: 'var(--color-bg-secondary)',
                                transform: 'translate(-1px, -1px)',
                                boxShadow: `4px 4px 0px ${shadowColor}`,
                            },
                        }}
                    >
                        Filters {hasActiveFilters && `(${activeFilterChips.length})`}
                    </Button>
                </Box>

                {activeFilterChips.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {activeFilterChips.map((chip) => (
                            <Box
                                key={chip.key}
                                onClick={() => updateFilter(chip.key, 'all')}
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    bgcolor: 'var(--color-pink)',
                                    border: `2px solid ${borderColor}`,
                                    borderRadius: '9999px',
                                    fontFamily: "'Space Mono', monospace",
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    boxShadow: `2px 2px 0px ${shadowColor}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    '&::after': {
                                        content: '"✕"',
                                        fontSize: '0.6rem',
                                    },
                                }}
                            >
                                {chip.label}
                            </Box>
                        ))}
                        <Box
                            onClick={handleClearAll}
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                bgcolor: 'var(--color-bg)',
                                border: `2px solid var(--color-red)`,
                                borderRadius: '9999px',
                                fontFamily: "'Space Mono', monospace",
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                color: 'var(--color-red)',
                            }}
                        >
                            Clear All
                        </Box>
                    </Box>
                )}

                <Drawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <Box sx={{ bgcolor: 'var(--color-bg)', borderTop: `3px solid ${borderColor}`, p: 3, maxWidth: 500, mx: 'auto' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.25rem' }}>Filters</Typography>
                        <IconButton onClick={() => setDrawerOpen(false)} sx={{ border: `2px solid ${borderColor}`, borderRadius: 0 }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {filterContent}
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => setDrawerOpen(false)}
                            sx={{
                                bgcolor: 'var(--color-yellow)',
                                color: '#1A1A1A',
                                border: `3px solid ${borderColor}`,
                                boxShadow: `3px 3px 0px ${shadowColor}`,
                            }}
                        >
                            Apply Filters
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleClearAll}
                            sx={{
                                border: `3px solid ${borderColor}`,
                                color: 'var(--color-text)',
                            }}
                        >
                            Clear All
                        </Button>
                    </Box>
                    </Box>
                </Drawer>
            </>
        );
    }

    return filterContent;
}
