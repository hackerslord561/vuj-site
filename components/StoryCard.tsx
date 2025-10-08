import Link from 'next/link';
import { format } from 'date-fns';
import { Story } from '@/types';

interface StoryCardProps {
    story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <img
                src={story.imageUrl}
                alt={`Featured image for article titled ${story.title}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <div className="text-sm text-secondary font-semibold mb-2 uppercase">
                    {story.section.replace('-', ' ')}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                    <Link href={`/${story.section}/${story.slug}`} className="hover:text-primary">
                        {story.title}
                    </Link>
                </h3>
                <p className="text-gray-600 mb-4">{story.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {story.author}</span>
                    <span>{format(story.publishedDate.toDate(), 'MMM dd, yyyy')}</span>
                </div>
                <Link
                    href={`/${story.section}/${story.slug}`}
                    className="inline-block mt-4 text-primary font-semibold hover:underline"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
}