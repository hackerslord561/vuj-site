'use client';

import { useEffect, useState } from 'react';
import { getAllStories } from '@/lib/firestore';
import { Story } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStories = async () => {
            try {
                const data = await getAllStories();
                setStories(data.slice(0, 5));
                setLoading(false);
            } catch (error) {
                console.error('Error loading stories:', error);
                setLoading(false);
            }
        };
        loadStories();
    }, []);

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Stories</h3>
                    <p className="text-3xl font-bold text-primary">{stories.length}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-semibold mb-2">Published</h3>
                    <p className="text-3xl font-bold text-green-600">
                        {stories.filter(s => s.published).length}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-semibold mb-2">Drafts</h3>
                    <p className="text-3xl font-bold text-gray-600">
                        {stories.filter(s => !s.published).length}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Recent Stories</h2>
                </div>
                <div className="p-6">
                    {stories.length === 0 ? (
                        <p className="text-gray-500">No stories yet. Create your first story!</p>
                    ) : (
                        <ul className="space-y-3">
                            {stories.map((story) => (
                                <li key={story.id} className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{story.title}</h3>
                                        <p className="text-sm text-gray-500">By {story.author}</p>
                                    </div>
                                    <Link
                                        href={`/dashboard/stories/${story.id}/edit`}
                                        className="text-primary hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link
                        href="/dashboard/stories"
                        className="inline-block mt-4 text-primary hover:underline"
                    >
                        View all stories →
                    </Link>
                </div>
            </div>
        </div>
    );
}