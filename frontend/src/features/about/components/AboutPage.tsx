import { Box, Typography, Avatar, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import { useTheme } from '@/context/ThemeContext';
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

const TEAM_COLORS = ['var(--color-blue)', 'var(--color-green)', 'var(--color-orange)', 'var(--color-purple)', 'var(--color-red)'];

export default function AboutPage({ onNavigate }: AboutPageProps) {
    const [isDark] = useTheme();
    const email = contributorsData.email;
    const mailtoLink = `mailto:${email}?subject=Question about Sajhi Shiksha`;
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <button
                    onClick={() => onNavigate('/')}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        marginBottom: 8,
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

            <Box
                sx={{
                    p: { xs: 4, md: 8 },
                    textAlign: 'center',
                    bgcolor: isDark ? 'var(--color-bg-secondary)' : 'var(--color-blue)',
                    border: `3px solid ${borderColor}`,
                    boxShadow: `6px 6px 0px ${shadowColor}`,
                    mb: 6,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        mb: 2,
                    }}
                >
                    About Sajhi Shiksha
                </Typography>
                <Typography
                    sx={{
                        fontSize: '1.1rem',
                        color: 'var(--color-text-secondary)',
                        mb: 4,
                        maxWidth: 700,
                        mx: 'auto',
                        lineHeight: 1.7,
                    }}
                >
                    Sajhi Shiksha is a free, open educational platform built for KVS students and teachers. Our mission is to make quality study materials accessible to everyone — no login, no paywalls, no barriers.
                </Typography>
                <Typography
                    sx={{
                        fontStyle: 'italic',
                        color: 'var(--color-text)',
                        fontWeight: 700,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.25rem',
                    }}
                >
                    &ldquo;Sharing Knowledge — From You, For You&rdquo;
                </Typography>
            </Box>

            <Typography
                sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 4,
                }}
            >
                Our Mission
            </Typography>
            <Box
                sx={{
                    p: 4,
                    mb: 8,
                    bgcolor: 'var(--color-bg)',
                    border: `3px solid ${borderColor}`,
                    boxShadow: `4px 4px 0px ${shadowColor}`,
                }}
            >
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    {MISSION_POINTS.map((point) => (
                        <Box key={point} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <CheckCircleIcon sx={{ color: 'var(--color-green)' }} />
                            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>{point}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Typography
                sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 4,
                }}
            >
                Behind Sajhi Shiksha
            </Typography>
            <Box
                sx={{
                    p: 4,
                    mb: 8,
                    bgcolor: 'var(--color-bg)',
                    border: `3px solid ${borderColor}`,
                    boxShadow: `4px 4px 0px ${shadowColor}`,
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 3,
                    }}
                >
                    {contributorsData.contributors.map((member, index) => (
                        <Box
                            key={member.name}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                border: `2px solid ${borderColor}`,
                                boxShadow: `3px 3px 0px ${shadowColor}`,
                                transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                '&:hover': { transform: 'translate(-2px, -2px)' },
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: TEAM_COLORS[index % TEAM_COLORS.length],
                                    width: 64,
                                    height: 64,
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    mx: 'auto',
                                    mb: 2,
                                    border: `2px solid ${borderColor}`,
                                    fontFamily: "'Space Grotesk', sans-serif",
                                }}
                            >
                                {member.initials}
                            </Avatar>
                            <Typography
                                sx={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    mb: 0.5,
                                }}
                            >
                                {member.name}
                            </Typography>
                            <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', mb: 1 }}>
                                {member.role}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: '0.75rem',
                                    color: 'var(--color-yellow)',
                                    fontWeight: 700,
                                }}
                            >
                                {member.contribution}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Typography
                sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 4,
                }}
            >
                Get In Touch
            </Typography>
            <Box
                sx={{
                    p: 4,
                    bgcolor: 'var(--color-bg)',
                    border: `3px solid ${borderColor}`,
                    boxShadow: `4px 4px 0px ${shadowColor}`,
                }}
            >
                <Typography sx={{ color: 'var(--color-text-secondary)', mb: 3, fontSize: '1rem' }}>
                    Have questions or suggestions? We&apos;d love to hear from you.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <EmailIcon sx={{ color: 'var(--color-text)' }} />
                        <Link href={mailtoLink} sx={{ fontWeight: 700, color: 'var(--color-text)', fontFamily: "'Space Mono', monospace" }}>
                            {email}
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <PublicIcon sx={{ color: 'var(--color-text)' }} />
                        <Link
                            href="https://www.sajhishiksha.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ fontWeight: 700, color: 'var(--color-text)', fontFamily: "'Space Mono', monospace" }}
                        >
                            www.sajhishiksha.in
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
