import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LinkIcon from '@mui/icons-material/Link';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@/context/ThemeContext';
import type { Resource } from '@/types';

interface ResourceCardProps {
    resource: Resource;
    viewMode?: 'grid' | 'list';
    onView: (id: string) => void;
    onDownload: (url: string) => void;
}

const typeIconMap: Record<string, React.ElementType> = {
    pdf: PictureAsPdfIcon,
    document: DescriptionIcon,
    link: LinkIcon,
    format: InsertDriveFileIcon,
};

const typeColorMap: Record<string, string> = {
    pdf: 'var(--color-red)',
    document: 'var(--color-blue)',
    link: 'var(--color-green)',
    format: 'var(--color-purple)',
};

const subjectColorMap: Record<string, string> = {
    Mathematics: 'var(--subject-math)',
    English: 'var(--subject-english)',
    Hindi: 'var(--subject-hindi)',
    Science: 'var(--subject-science)',
    'Social Science': 'var(--subject-social)',
    Sanskrit: 'var(--subject-general)',
    Physics: 'var(--subject-science)',
    Biology: 'var(--subject-science)',
    'CS/IP': 'var(--subject-math)',
    Accountancy: 'var(--subject-math)',
    EVS: 'var(--subject-science)',
    General: 'var(--subject-general)',
};

const ResourceCard: React.FC<ResourceCardProps> = React.memo(
    ({ resource, viewMode = 'grid', onView, onDownload }) => {
        const [isDark] = useTheme();
        const IconComponent = typeIconMap[resource.type] ?? DescriptionIcon;
        const iconColor = typeColorMap[resource.type] ?? 'var(--color-text-secondary)';
        const subjectColor = resource.subject ? (subjectColorMap[resource.subject] ?? 'var(--color-text-secondary)') : 'var(--color-text-secondary)';
        const borderColor = 'var(--color-border)';
        const shadowColor = 'var(--color-shadow)';

        if (viewMode === 'list') {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1.5, sm: 2 },
                        p: { xs: 2.5, sm: 2 },
                        bgcolor: 'var(--color-bg)',
                        border: `2px solid ${borderColor}`,
                        boxShadow: `3px 3px 0px ${shadowColor}`,
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        '&:hover': {
                            transform: 'translate(-2px, -2px)',
                            boxShadow: `5px 5px 0px ${shadowColor}`,
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0, width: { xs: '100%', sm: 'auto' } }}>
                        <Box
                            sx={{
                                p: 1,
                                bgcolor: `${iconColor}20`,
                                border: `2px solid ${borderColor}`,
                                display: 'flex',
                                flexShrink: 0,
                            }}
                        >
                            <IconComponent sx={{ fontSize: 24, color: iconColor }} />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                sx={{ fontWeight: 700, mb: 0.5, fontFamily: "'Space Grotesk', sans-serif", fontSize: { xs: '1rem', sm: 'inherit' } }}
                                noWrap
                            >
                                {resource.title}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}
                                noWrap
                            >
                                {resource.description}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: { xs: '100%', sm: 'auto' } }}>
                        {resource.class && (
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    bgcolor: 'var(--color-yellow)',
                                    border: `2px solid ${borderColor}`,
                                    borderRadius: '9999px',
                                    fontFamily: "'Space Mono', monospace",
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#1A1A1A',
                                    boxShadow: `2px 2px 0px ${shadowColor}`,
                                }}
                            >
                                Class {resource.class}
                            </Box>
                        )}
                        {resource.subject && (
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    bgcolor: `${subjectColor}30`,
                                    border: `2px solid ${borderColor}`,
                                    borderRadius: '9999px',
                                    fontFamily: "'Space Mono', monospace",
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: subjectColor,
                                    boxShadow: `2px 2px 0px ${shadowColor}`,
                                }}
                            >
                                {resource.subject}
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexShrink: 0, width: { xs: '100%', sm: 'auto' } }}>
                        <Button
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => onView(resource.id)}
                            sx={{
                                color: 'var(--color-text)',
                                border: `2px solid ${borderColor}`,
                                boxShadow: `2px 2px 0px ${shadowColor}`,
                                flex: { xs: 1, sm: 'none' },
                                justifyContent: 'center',
                                '&:hover': {
                                    transform: 'translate(-1px, -1px)',
                                    boxShadow: `3px 3px 0px ${shadowColor}`,
                                },
                            }}
                        >
                            View
                        </Button>
                        <Button
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => onDownload(resource.driveUrl)}
                            sx={{
                                color: 'var(--color-text)',
                                border: `2px solid ${borderColor}`,
                                boxShadow: `2px 2px 0px ${shadowColor}`,
                                flex: { xs: 1, sm: 'none' },
                                justifyContent: 'center',
                                '&:hover': {
                                    transform: 'translate(-1px, -1px)',
                                    boxShadow: `3px 3px 0px ${shadowColor}`,
                                },
                            }}
                        >
                            Download
                        </Button>
                    </Box>
                </Box>
            );
        }

        return (
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'var(--color-bg)',
                    border: `3px solid ${borderColor}`,
                    boxShadow: `4px 4px 0px ${shadowColor}`,
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    '&:hover': {
                        transform: 'translate(-2px, -2px) rotate(-0.5deg)',
                        boxShadow: `6px 6px 0px ${shadowColor}`,
                    },
                    cursor: 'pointer',
                }}
                onClick={() => onView(resource.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onView(resource.id);
                    }
                }}
            >
                <Box sx={{ flex: 1, p: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            bgcolor: `${iconColor}20`,
                            border: `2px solid ${borderColor}`,
                            display: 'inline-flex',
                            mb: 2,
                        }}
                    >
                        <IconComponent sx={{ fontSize: 32, color: iconColor }} />
                    </Box>
                    <Typography
                        sx={{ mb: 1, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem' }}
                        noWrap
                    >
                        {resource.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                        {resource.class && (
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    bgcolor: 'var(--color-yellow)',
                                    border: `2px solid ${borderColor}`,
                                    borderRadius: '9999px',
                                    fontFamily: "'Space Mono', monospace",
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#1A1A1A',
                                    boxShadow: `2px 2px 0px ${shadowColor}`,
                                }}
                            >
                                Class {resource.class}
                            </Box>
                        )}
                        {resource.subject && (
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    bgcolor: `${subjectColor}30`,
                                    border: `2px solid ${borderColor}`,
                                    borderRadius: '9999px',
                                    fontFamily: "'Space Mono', monospace",
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: subjectColor,
                                    boxShadow: `2px 2px 0px ${shadowColor}`,
                                }}
                            >
                                {resource.subject}
                            </Box>
                        )}
                    </Box>
                    <Typography
                        sx={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.9rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {resource.description}
                    </Typography>
                </Box>
                <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                        onClick={(e) => {
                            e.stopPropagation();
                            onView(resource.id);
                        }}
                        sx={{
                            bgcolor: 'var(--color-yellow)',
                            color: '#1A1A1A',
                            border: `2px solid ${borderColor}`,
                            boxShadow: `2px 2px 0px ${shadowColor}`,
                            '&:hover': {
                                bgcolor: 'var(--color-bg-secondary)',
                                color: '#1A1A1A',
                                transform: 'translate(-1px, -1px)',
                                boxShadow: `3px 3px 0px ${shadowColor}`,
                            },
                        }}
                    >
                        View
                    </Button>
                    <Button
                        size="small"
                        startIcon={<DownloadIcon />}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDownload(resource.driveUrl);
                        }}
                        sx={{
                            bgcolor: 'var(--color-bg)',
                            color: 'var(--color-text)',
                            border: `2px solid ${borderColor}`,
                            boxShadow: `2px 2px 0px ${shadowColor}`,
                            '&:hover': {
                                bgcolor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text)',
                                transform: 'translate(-1px, -1px)',
                                boxShadow: `3px 3px 0px ${shadowColor}`,
                            },
                        }}
                    >
                        Download
                    </Button>
                </Box>
            </Box>
        );
    }
);

ResourceCard.displayName = 'ResourceCard';

export default ResourceCard;
