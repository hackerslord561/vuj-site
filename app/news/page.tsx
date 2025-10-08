import { Metadata } from 'next';
import { getStoriesBySection } from '@/lib/firestore';
import StoryCard from '@/components/StoryCard';

export const metadata: Metadata = {
    title: 'News & Reports - VOK University JNAL',
    description: 'Coverage of university activities, student politics, administration updates, and national issues affecting higher education.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function NewsPage() {
    const stories = await getStoriesBySection('news');

    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">News & Reports</h1>
                <p className="text-lg text-gray-700 mb-12">
                    Coverage of university activities, student politics, administration updates, and national issues
                    affecting higher education.
                </p>

                {stories.length === 0 ? (
                    <p className="text-center text-gray-500">No stories available at this time.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map((story) => (
                            <StoryCard key={story.id} story={story}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}