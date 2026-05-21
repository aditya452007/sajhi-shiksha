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
        mathematics: '#3B82F6',
        english: '#8B5CF6',
        hindi: '#F59E0B',
        science: '#10B981',
        'social science': '#EF4444',
        evs: '#10B981',
        general: '#6B7280',
    };
    return colors[subject.toLowerCase()] ?? '#6B7280';
}

