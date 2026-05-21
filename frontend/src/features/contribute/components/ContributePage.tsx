import { Box, Typography, Paper, Button, Grid, Avatar, Divider, Link } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HomeIcon from '@mui/icons-material/Home';
import contributorsData from '@/data/contributors.json';

interface ContributePageProps {
    onNavigate: (route: string) => void;
}

const STEPS = [
    {
        number: 1,
        icon: <DescriptionIcon sx={{ fontSize: 32 }} />,
        title: 'Prepare',
        description: 'Gather your study materials, notes, or resources in PDF or document format.',
    },
    {
        number: 2,
        icon: <EmailIcon sx={{ fontSize: 32 }} />,
        title: 'Email',
        description: 'Send us an email with the resource, subject, class, and a brief description.',
    },
    {
        number: 3,
        icon: <CheckCircleIcon sx={{ fontSize: 32 }} />,
        title: 'Credit',
        description: 'We\'ll add it to the site with your name credited as the contributor.',
    },
];

const SHARE_TYPES = [
    { icon: <DescriptionIcon />, title: 'Study materials and notes', description: 'Chapter-wise notes, practice questions, and study guides.' },
    { icon: <ArticleIcon />, title: 'Question papers and answer keys', description: 'Board exam papers, unit tests, and solved papers.' },
    { icon: <InsertDriveFileIcon />, title: 'Formats and templates', description: 'Official formats, timetables, and administrative templates.' },
    { icon: <LinkIcon />, title: 'Useful educational links', description: 'Links to helpful websites, videos, and online resources.' },
    { icon: <FavoriteIcon />, title: 'Monetary contributions', description: 'Support the platform to keep it free for everyone.' },
];

const CONTRIBUTOR_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

export default function ContributePage({ onNavigate }: ContributePageProps) {
    const email = contributorsData.email;
    const mailtoLink = `mailto:${email}?subject=Resource Contribution to Sajhi Shiksha`;

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Link
                    component="button"
                    onClick={() => onNavigate('/')}
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mb: 2 }}
                >
                    <HomeIcon fontSize="small" />
                    Home
                </Link>
            </Box>

            <Paper
                sx={{
                    p: { xs: 4, md: 8 },
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
                    mb: 6,
                }}
            >
                <VolunteerActivismIcon
                    sx={{ fontSize: 64, color: '#F59E0B', mb: 2 }}
                />
                <Typography
                    variant="h2"
                    sx={{ fontWeight: 800, mb: 2, fontFamily: "'Nunito', sans-serif" }}
                >
                    Share Your Knowledge
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                >
                    Help fellow teachers and students by sharing your study materials,
                    question papers, and resources.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    href={mailtoLink}
                    startIcon={<EmailIcon />}
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        transition: 'transform 0.2s ease',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                >
                    Email Us
                </Button>
            </Paper>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, fontFamily: "'Nunito', sans-serif" }}
            >
                How It Works
            </Typography>
            <Grid container spacing={4} sx={{ mb: 8 }}>
                {STEPS.map((step) => (
                    <Grid size={{ xs: 12, md: 4 }} key={step.number}>
                        <Paper
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                height: '100%',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                },
                                position: 'relative',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -16,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.875rem',
                                }}
                            >
                                {step.number}
                            </Box>
                            <Box sx={{ color: 'primary.main', mt: 1, mb: 2 }}>
                                {step.icon}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {step.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {step.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, fontFamily: "'Nunito', sans-serif" }}
            >
                What You Can Share
            </Typography>
            <Paper sx={{ p: 4, mb: 8 }}>
                <Grid container spacing={3}>
                    {SHARE_TYPES.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                <Box
                                    sx={{
                                        color: 'primary.main',
                                        flexShrink: 0,
                                        mt: 0.5,
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, fontFamily: "'Nunito', sans-serif" }}
            >
                Current Contributors
            </Typography>
            <Paper sx={{ p: 4, mb: 8 }}>
                <Grid container spacing={3}>
                    {contributorsData.contributors.map((contributor, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={contributor.name}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Avatar
                                    sx={{
                                        bgcolor: CONTRIBUTOR_COLORS[index % CONTRIBUTOR_COLORS.length],
                                        width: 48,
                                        height: 48,
                                        fontWeight: 700,
                                    }}
                                >
                                    {contributor.initials}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {contributor.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {contributor.role}
                                    </Typography>
                                    <Typography variant="caption" color="primary">
                                        {contributor.contribution}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Want to be listed here?{' '}
                    <Link href={mailtoLink} sx={{ fontWeight: 600 }}>
                        Share your resources
                    </Link>
                </Typography>
            </Paper>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, fontFamily: "'Nunito', sans-serif" }}
            >
                Contact Information
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <EmailIcon color="action" />
                        <Link href={mailtoLink} sx={{ fontWeight: 500 }}>
                            {email}
                        </Link>
                    </Box>
                    {contributorsData.whatsapp && (
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <WhatsAppIcon color="action" />
                            <Typography>{contributorsData.whatsapp}</Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
