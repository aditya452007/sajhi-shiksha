import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, Chip, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LinkIcon from '@mui/icons-material/Link';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getSubjectColor } from '@/lib/utils';
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
    pdf: '#EF4444',
    document: '#3B82F6',
    link: '#10B981',
    format: '#8B5CF6',
};

const ResourceCard: React.FC<ResourceCardProps> = React.memo(
    ({ resource, viewMode = 'grid', onView, onDownload }) => {
        const IconComponent = typeIconMap[resource.type] ?? DescriptionIcon;
        const iconColor = typeColorMap[resource.type] ?? '#6B7280';
        const subjectColor = resource.subject ? getSubjectColor(resource.subject) : '#6B7280';

        if (viewMode === 'list') {
            return (
                <Card
                    sx={{
                        transition: 'box-shadow 0.2s ease',
                        '&:hover': {
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        },
                    }}
                >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                        <Box
                            sx={{
                                p: 1,
                                borderRadius: 2,
                                bgcolor: `${iconColor}15`,
                                display: 'flex',
                            }}
                        >
                            <IconComponent sx={{ fontSize: 24, color: iconColor }} />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, mb: 0.5 }}
                                noWrap
                            >
                                {resource.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                            >
                                {resource.description}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                            {resource.class && (
                                <Chip
                                    label={`Class ${resource.class}`}
                                    size="small"
                                    sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                                />
                            )}
                            {resource.subject && (
                                <Chip
                                    label={resource.subject}
                                    size="small"
                                    sx={{
                                        bgcolor: `${subjectColor}20`,
                                        color: subjectColor,
                                        fontWeight: 500,
                                    }}
                                />
                            )}
                        </Box>
                        <CardActions sx={{ p: 0, flexShrink: 0 }}>
                            <Button
                                size="small"
                                startIcon={<VisibilityIcon />}
                                onClick={() => onView(resource.id)}
                            >
                                View
                            </Button>
                            <Button
                                size="small"
                                startIcon={<DownloadIcon />}
                                onClick={() => onDownload(resource.driveUrl)}
                            >
                                Download
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
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
                <CardContent sx={{ flex: 1, p: 3 }}>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: `${iconColor}15`,
                            display: 'inline-flex',
                            mb: 2,
                        }}
                    >
                        <IconComponent sx={{ fontSize: 32, color: iconColor }} />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}
                        noWrap
                    >
                        {resource.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                        {resource.class && (
                            <Chip
                                label={`Class ${resource.class}`}
                                size="small"
                                sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                            />
                        )}
                        {resource.subject && (
                            <Chip
                                label={resource.subject}
                                size="small"
                                sx={{
                                    bgcolor: `${subjectColor}20`,
                                    color: subjectColor,
                                    fontWeight: 500,
                                }}
                            />
                        )}
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {resource.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                        onClick={(e) => {
                            e.stopPropagation();
                            onView(resource.id);
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
                    >
                        Download
                    </Button>
                </CardActions>
            </Card>
        );
    }
);

ResourceCard.displayName = 'ResourceCard';

export default ResourceCard;
