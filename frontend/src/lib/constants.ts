export const SUBJECTS_PRIMARY = ['Mathematics', 'English', 'Hindi', 'EVS', 'General'] as const;

export const CLASS_RANGES = {
    primary: [1, 2, 3, 4, 5],
    middle: [6, 7, 8],
    secondary: [9, 10],
    senior: [11, 12],
} as const;

export const FILTER_CHIPS = [
    { label: 'All', value: 'all' },
    { label: 'Classes 1-5', value: 'primary' },
    { label: 'Classes 6-12', value: 'secondary' },
    { label: 'Formats', value: 'formats' },
    { label: 'Rules', value: 'rules' },
] as const;
