export const CLASS_RANGES = {
    middle: [6, 7, 8],
    secondary: [9, 10],
    senior: [11, 12],
} as const;

export const FILTER_CHIPS = [
    { label: 'All', value: 'all' },
    { label: 'Classes 6-12', value: 'secondary' },
    { label: 'Formats', value: 'formats' },
    { label: 'Rules', value: 'rules' },
] as const;

export const FONT_HEADING = "'Space Grotesk', system-ui, sans-serif";
export const FONT_MONO = "'Space Mono', monospace";
export const FONT_BODY = "'Inter', system-ui, sans-serif";

export const MAX_CONTENT_WIDTH = '1200px';

export const BORDER_RADIUS_PILL = '9999px';

export const COLOR_TEXT_LIGHT = '#1A1A1A';
export const COLOR_TEXT_DARK = '#FFFFFF';
export const COLOR_SHADOW_DARK = '#000000';
