export interface Resource {
    id: string;
    title: string;
    description: string;
    category: string;
    class: number | null;
    subject: string | null;
    type: 'pdf' | 'document' | 'format' | 'link';
    driveUrl: string;
    thumbnail: string | null;
    contributors: string[];
    lastUpdated: string;
}

export interface CategoryCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    resourceCount: number;
    route: string;
}
