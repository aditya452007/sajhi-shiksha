import type { Resource } from '@/types';

export function getDriveEmbedUrl(driveUrl: string): string {
    if (!driveUrl || driveUrl.trim() === '') return '';

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

export function teacherCardToResource(item: any, subject: string): Resource {
    return {
        id: item.id,
        title: item.title,
        description: item.description,
        category: 'teacher',
        class: null,
        subject,
        type: 'pdf',
        driveUrl: item.driveUrl ?? '',
        thumbnail: null,
        contributors: ['Sajhi Shiksha Team'],
        lastUpdated: new Date().toISOString().split('T')[0] ?? '',
    };
}

export function findTeacherResourceById(id: string, siteContent: any): Resource | null {
    if (!siteContent?.teacherCards?.mainCards) return null;
    for (const mainCard of siteContent.teacherCards.mainCards) {
        const subject = mainCard.id === 'tgt-pgt' ? 'Mathematics' : 'General';
        for (const subCard of mainCard.subCards ?? []) {
            if (subCard.id === id) return teacherCardToResource(subCard, subject);
            if (subCard.hasSubCards && subCard.subCards) {
                const leaf = subCard.subCards.find((l: any) => l.id === id);
                if (leaf) return teacherCardToResource(leaf, subject);
            }
        }
    }
    return null;
}

