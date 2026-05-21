import { useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Chip,
    IconButton,
    Drawer,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ClearAllIcon from '@mui/icons-material/ClearAll';

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

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
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={filters.class}
                        label="Class"
                        onChange={(e) => updateFilter('class', e.target.value)}
                    >
                        {classOptions.map((cls) => (
                            <MenuItem key={cls} value={cls}>
                                {cls === 'all' ? 'All Classes' : `Class ${cls}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Subject</InputLabel>
                    <Select
                        value={filters.subject}
                        label="Subject"
                        onChange={(e) => updateFilter('subject', e.target.value)}
                    >
                        {subjectOptions.map((sub) => (
                            <MenuItem key={sub} value={sub}>
                                {sub === 'all' ? 'All Subjects' : sub}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={filters.type}
                        label="Type"
                        onChange={(e) => updateFilter('type', e.target.value)}
                    >
                        {typeOptions.map((type) => (
                            <MenuItem key={type} value={type}>
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
                    sx={{ minWidth: 200, flex: 1 }}
                />

                {hasActiveFilters && (
                    <Button
                        size="small"
                        startIcon={<ClearAllIcon />}
                        onClick={handleClearAll}
                        color="secondary"
                    >
                        Clear All
                    </Button>
                )}
            </Box>

            {activeFilterChips.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {activeFilterChips.map((chip) => (
                        <Chip
                            key={chip.key}
                            label={chip.label}
                            onDelete={() => updateFilter(chip.key, chip.key === 'class' ? 'all' : 'all')}
                            size="small"
                            variant="outlined"
                        />
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
                    >
                        Filters {hasActiveFilters && `(${activeFilterChips.length})`}
                    </Button>
                </Box>

                {activeFilterChips.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {activeFilterChips.map((chip) => (
                            <Chip
                                key={chip.key}
                                label={chip.label}
                                onDelete={() => updateFilter(chip.key, 'all')}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                        <Chip
                            label="Clear All"
                            onDelete={handleClearAll}
                            size="small"
                            color="secondary"
                            variant="outlined"
                        />
                    </Box>
                )}

                <Drawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">Filters</Typography>
                            <IconButton onClick={() => setDrawerOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        {filterContent}
                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => setDrawerOpen(false)}
                            >
                                Apply Filters
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={handleClearAll}
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
