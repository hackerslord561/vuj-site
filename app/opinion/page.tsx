import { Metadata } from 'next';
import { getStoriesBySection } from '@/lib/firestore';
import StoryCard from '@/components/StoryCard';

export const metadata: Metadata = {
    title: 'Opinion & Editorial - VOK University JNAL',
    description: 'Student writers, thought leaders, and editorials.',
};

export const revalidate = 60;

export default async function OpinionPage() {
    const stories = await getStoriesBySection('opinion');

    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Opinion & Editorial</h1>
                <p className="text-lg text-gray-700 mb-12">
                    Student writers, thought leaders, and editorials.
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