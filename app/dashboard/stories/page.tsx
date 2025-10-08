'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllStories, deleteStory } from '@/lib/firestore';
import { Story } from '@/types';
import { format } from 'date-fns';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function StoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        const data = await getAllStories();
        setStories(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this story?')) {
            await deleteStory(id);
            loadStories();
        }
    };

    if (loading) {
        return <div>Loading stories...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Stories</h1>
                <Link
                    href="/dashboard/stories/new"
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90"
                >
                    <Plus size={20} />
                    <span>New Story</span>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {stories.map((story) => (
                        <tr key={story.id}>
                            <td className="px-6 py-4">{story.title}</td>
                            <td className="px-6 py-4 capitalize">{story.section.replace('-', ' ')}</td>
                            <td className="px-6 py-4">{story.author}</td>
                            <td className="px-6 py-4">
                                {story.published ? (
                                    <span className="text-green-600">Yes</span>
                                ) : (
                                    <span className="text-gray-400">Draft</span>
                                )}
                            </td>
                            <td className="px-6 py-4">{story.views}</td>
                            <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/dashboard/stories/${story.id}/edit`}
                                        className="text-primary hover:text-opacity-80"
                                    >
                                        <Pencil size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(story.id)}
                                        className="text-red-600 hover:text-opacity-80"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}