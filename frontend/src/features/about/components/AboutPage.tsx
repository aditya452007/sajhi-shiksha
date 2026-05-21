import { Box, Typography, Paper, Grid, Avatar, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import contributorsData from '@/data/contributors.json';

interface AboutPageProps {
    onNavigate: (route: string) => void;
}

const MISSION_POINTS = [
    'Free access for all students',
    'Teacher-contributed resources',
    'No login, no barriers',
    'Always growing, always free',
];

const TEAM_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

export default function AboutPage({ onNavigate }: AboutPageProps) {
    const email = contributorsData.email;
    const mailtoLink = `mailto:${email}?subject=Question about Sajhi Shiksha`;

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
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                    mb: 6,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ fontWeight: 800, mb: 2, fontFamily: "'Nunito', sans-serif" }}
                >
                    About Sajhi Shiksha
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 700, mx: 'auto', lineHeight: 1.7 }}
                >
                    Sajhi Shiksha is a free, open educational platform built for KVS students
                    and teachers. Our mission is to make quality study materials accessible to
                    everyone — no login, no paywalls, no barriers.
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        fontStyle: 'italic',
                        color: 'primary.main',
                        fontWeight: 600,
                    }}
                >
                    &ldquo;Sharing Knowledge — From You, For You&rdquo;
                </Typography>
            </Paper>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, fontFamily: "'Nunito', sans-serif" }}
            >
                Our Mission
            </Typography>
            <Paper sx={{ p: 4, mb: 8 }}>
                <Grid container spacing={2}>
                    {MISSION_POINTS.map((point) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={point}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <CheckCircleIcon color="success" />
                                <Typography variant="body1">{point}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, fontFamily: "'Nunito', sans-serif" }}
            >
                Behind Sajhi Shiksha
            </Typography>
            <Paper sx={{ p: 4, mb: 8 }}>
                <Grid container spacing={3}>
                    {contributorsData.contributors.map((member, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.name}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    transition: 'transform 0.2s ease',
                                    '&:hover': { transform: 'translateY(-2px)' },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: TEAM_COLORS[index % TEAM_COLORS.length],
                                        width: 64,
                                        height: 64,
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        mx: 'auto',
                                        mb: 2,
                                    }}
                                >
                                    {member.initials}
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {member.role}
                                </Typography>
                                <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                                    {member.contribution}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, fontFamily: "'Nunito', sans-serif" }}
            >
                Get In Touch
            </Typography>
            <Paper sx={{ p: 4 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Have questions or suggestions? We&apos;d love to hear from you.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <EmailIcon color="action" />
                        <Link href={mailtoLink} sx={{ fontWeight: 500 }}>
                            {email}
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <PublicIcon color="action" />
                        <Link
                            href="https://www.sajhishiksha.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ fontWeight: 500 }}
                        >
                            www.sajhishiksha.in
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
