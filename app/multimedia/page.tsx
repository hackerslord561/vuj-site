import { Metadata } from 'next';
import { getStoriesBySection } from '@/lib/firestore';
import StoryCard from '@/components/StoryCard';

export const metadata: Metadata = {
    title: 'Multimedia - VOK University JNAL',
    description: 'Photo stories, podcasts, videos, and live coverage.',
};

export const revalidate = 60;

export default async function MultimediaPage() {
    const stories = await getStoriesBySection('multimedia');

    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Multimedia</h1>
                <p className="text-lg text-gray-700 mb-12">
                    Photo stories, podcasts, videos, and live coverage.
                </p>

                {stories.length === 0 ? (
                    <p className="text-center text-gray-500">No stories available at this time.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map((story) => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}