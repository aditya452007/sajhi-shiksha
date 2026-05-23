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

/**
 * Creates a structured resource object from teacher card data.
 * Correctly maps `item.driveUrl` and sets the `type` dynamically.
 */
export function teacherCardToResource(item: any, subject: string): Resource {
    return {
        id: item.id,
        title: item.title,
        description: item.description,
        category: 'teacher',
        class: null,
        subject,
        type: item.driveUrl ? 'pdf' : 'document',
        driveUrl: item.driveUrl ?? '',
        thumbnail: null,
        contributors: item.contributors || ['Sajhi Shiksha Team'],
        lastUpdated: item.lastUpdated ?? new Date().toISOString().split('T')[0],
    };
}

// --- CRITICAL FIX: Robust recursive lookup for teacher cards ---

function findResourceDeep(id: string, cards: any[], subject: string): Resource | null {
    for (const card of cards) {
        if (card.id === id) return teacherCardToResource(card, subject);
        if (card.subCards?.length) {
            const found = findResourceDeep(id, card.subCards, subject);
            if (found) return found;
        }
    }
    return null;
}

export function findTeacherResourceById(id: string, siteContent: any): Resource | null {
    if (!siteContent?.teacherCards?.mainCards) return null;
    for (const mainCard of siteContent.teacherCards.mainCards) {
        const subject = mainCard.id === 'tgt-pgt' ? 'Mathematics' : 'General';
        const found = findResourceDeep(id, mainCard.subCards ?? [], subject);
        if (found) return found;
    }
    return null;
}
