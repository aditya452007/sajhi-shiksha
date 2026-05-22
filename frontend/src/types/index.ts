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

export interface NavLink {
    label: string;
    route: string;
}

export interface SectionConfig {
    enabled: boolean;
    title: string;
    subtitle: string;
    icon: string;
    buttonColor: string;
    redirectRoute: string;
}

export interface ContentBlock {
    id: string;
    title: string;
    description: string;
    driveUrl: string;
    lastUpdated: string;
}

export interface SiteContent {
    site: {
        name: string;
        tagline: string;
        contactEmail: string;
        whatsappGroupUrl: string;
        whatsappNumber: string;
    };
    homepage: {
        heroTitle: string;
        heroHighlightWord: string;
        heroSubtitle: string;
    };
    sections: {
        students: SectionConfig & { filterParams: { class: string[]; subject: string[] } };
        teachers: SectionConfig & { categoryFilters: string[] };
        mathLovers: SectionConfig & { blocks: ContentBlock[] };
    };
    navigation: {
        headerLinks: NavLink[];
        footerGroups: { heading: string; links: NavLink[] }[];
    };
    contact: {
        showProfessorNames: boolean;
        email: string;
        showContributors: boolean;
    };
}
