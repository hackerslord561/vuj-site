'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createStory } from '@/lib/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import RichTextEditor from '@/components/RichTextEditor';

interface StoryFormData {
    title: string;
    excerpt: string;
    author: string;
    section: string;
    published: boolean;
}

export default function NewStoryPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<StoryFormData>();
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: StoryFormData) => {
        setLoading(true);

        try {
            let imageUrl = 'https://placeholder-image-service.onrender.com/image/800x400?prompt=University campus news article featured image with academic buildings and students&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ';

            // Upload image if provided
            if (imageFile) {
                const storageRef = ref(storage, `stories/${Date.now()}_${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            // Generate slug from title
            const slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            await createStory({
                title: data.title,
                content,
                excerpt: data.excerpt,
                author: data.author,
                section: data.section as any,
                slug,
                imageUrl,
                published: data.published,
            });

            router.push('/dashboard/stories');
        } catch (error) {
            console.error('Error creating story:', error);
            alert('Failed to create story');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Create New Story</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <textarea
                        {...register('excerpt', { required: 'Excerpt is required' })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <RichTextEditor value={content} onChange={setContent} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Author</label>
                        <input
                            type="text"
                            {...register('author', { required: 'Author is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                        {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Section</label>
                        <select
                            {...register('section', { required: 'Section is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        >
                            <option value="">Select section</option>
                            <option value="news">News & Reports</option>
                            <option value="research">Research & Publications</option>
                            <option value="campus-life">Campus Life</option>
                            <option value="opinion">Opinion & Editorial</option>
                            <option value="multimedia">Multimedia</option>
                            <option value="special-features">Special Features</option>
                        </select>
                        {errors.section && <p className="text-red-600 text-sm mt-1">{errors.section.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Featured Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register('published')}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label className="ml-2 text-sm font-medium">Publish immediately</label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Story'}
                    </button>
                </div>
            </form>
        </div>
    );
}