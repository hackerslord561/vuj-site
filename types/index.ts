import { Timestamp } from 'firebase/firestore';

export interface Story {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    section: 'news' | 'research' | 'campus-life' | 'opinion' | 'multimedia' | 'special-features';
    slug: string;
    imageUrl: string;
    published: boolean;
    views: number;
    publishedDate: Timestamp;
}

export interface Submission {
    id: string;
    title: string;
    content: string;
    authorEmail: string;
    submittedDate: Timestamp;
}

export interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
    category: 'editorial' | 'contributor' | 'advisory';
}