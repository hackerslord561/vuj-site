import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStoryBySlug, incrementStoryViews } from '@/lib/firestore';
import { format } from 'date-fns';
import React from 'react';

interface StoryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const story = await getStoryBySlug(slug);

    if (!story) {
        return {
            title: 'Story Not Found',
        };
    }

    return {
        title: `${story.title} - VOK University JNAL`,
        description: story.excerpt,
    };
}

export default async function StoryPage({ params }: StoryPageProps) {
    const { slug } = await params;
    const story = await getStoryBySlug(slug);

    if (!story) {
        notFound();
    }

    incrementStoryViews(story.id).catch(console.error);

    return (
        <article className="bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-sm text-secondary font-semibold mb-4 uppercase">
                    {story.section.replace('-', ' ')}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {story.title}
                </h1>

                <div className="flex items-center justify-between mb-8 text-gray-600">
                    <span>By {story.author}</span>
                    <span>{format(story.publishedDate.toDate(), 'MMMM dd, yyyy')}</span>
                </div>

                <img
                    src={story.imageUrl}
                    alt={`Featured image illustrating the article about ${story.title}`}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                />

                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: story.content }}
                />

                <div className="mt-8 text-sm text-gray-500">
                    Views: {story.views}
                </div>
            </div>
        </article>
    );
}