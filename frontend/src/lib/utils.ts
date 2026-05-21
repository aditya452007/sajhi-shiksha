export function getDriveEmbedUrl(driveUrl: string): string {
    const fileIdMatch = driveUrl.match(/\/d\/([^/]+)/);
    if (fileIdMatch?.[1]) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    if (driveUrl.includes('preview')) {
        return driveUrl;
    }
    return driveUrl;
}

export function formatResourceCount(count: number): string {
    if (count === 0) return 'No resources';
    if (count === 1) return '1 resource';
    return `${count} resources`;
}

export function getSubjectColor(subject: string): string {
    const colors: Record<string, string> = {
        mathematics: 'var(--subject-math)',
        english: 'var(--subject-english)',
        hindi: 'var(--subject-hindi)',
        science: 'var(--subject-science)',
        'social science': 'var(--subject-social)',
        evs: 'var(--subject-science)',
        general: 'var(--subject-general)',
    };
    return colors[subject.toLowerCase()] ?? 'var(--subject-general)';
}

