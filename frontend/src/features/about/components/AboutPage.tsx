import { Box, Typography, Link } from '@mui/material';
import { CheckCircleIcon, EmailIcon, PublicIcon } from '@/components/Icons';
import { useTheme } from '@/context/ThemeContext';
import siteContent from '@/data/site-content.json';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { FONT_HEADING, FONT_MONO, MAX_CONTENT_WIDTH } from '@/lib/constants';

interface AboutPageProps {
    onNavigate: (route: string) => void;
}

const CONTACT_EMAIL = 'Mamta07691@gmail.com';

const MISSION_POINTS = [
    'Free access for all students',
    'Teacher-contributed resources',
    'No login, no barriers',
    'Always growing, always free',
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
    const [isDark] = useTheme();
    const email = siteContent.contact.email || CONTACT_EMAIL;
    const mailtoLink = `mailto:${email}?subject=Question about Sajhi Shiksha`;
    const borderColor = 'var(--color-border)';
    const shadowColor = 'var(--color-shadow)';

    return (
        <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Breadcrumb
                items={[{ label: 'About' }]}
                onNavigate={onNavigate}
            />

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
                        fontFamily: FONT_HEADING,
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
                        fontFamily: FONT_HEADING,
                        fontSize: '1.25rem',
                    }}
                >
                    &ldquo;Sharing Knowledge — From You, For You&rdquo;
                </Typography>
            </Box>

            <Typography
                sx={{
                    fontFamily: FONT_HEADING,
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
                    fontFamily: FONT_HEADING,
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
                        <Link href={mailtoLink} sx={{ fontWeight: 700, color: 'var(--color-text)', fontFamily: FONT_MONO }}>
                            {email}
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <PublicIcon sx={{ color: 'var(--color-text)' }} />
                        <Link
                            href="https://www.sajhishiksha.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ fontWeight: 700, color: 'var(--color-text)', fontFamily: FONT_MONO }}
                        >
                            www.sajhishiksha.in
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
