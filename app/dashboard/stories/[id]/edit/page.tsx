'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { getStoryById, updateStory } from '@/lib/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import RichTextEditor from '@/components/RichTextEditor';

interface StoryFormData {
    title: string;
    excerpt: string;
    author: string;
    section: 'news' | 'research' | 'campus-life' | 'opinion' | 'multimedia' | 'special-features';
    published: boolean;
}

export default function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<StoryFormData>();
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadStory = async () => {
            try {
                const story = await getStoryById(id); // ✅ Use id directly
                if (story) {
                    setValue('title' as const, story.title);
                    setValue('excerpt' as const, story.excerpt);
                    setValue('author' as const, story.author);
                    setValue('section' as const, story.section);
                    setValue('published' as const, story.published);
                    setContent(story.content);
                    setCurrentImageUrl(story.imageUrl);
                }
            } catch (error) {
                console.error('Error loading story:', error);
            } finally {
                setLoading(false);
            }
        };
        void loadStory();
    }, [id, setValue]); // ✅ Use id in dependency

    const onSubmit = async (data: StoryFormData) => {
        setSubmitting(true);

        try {
            console.log('Starting story update...', data);

            let imageUrl = currentImageUrl;

            if (imageFile) {
                console.log('Uploading new image...');
                const storageRef = ref(storage, `stories/${Date.now()}_${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
                console.log('Image uploaded:', imageUrl);
            }

            const slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            console.log('Updating story with slug:', slug);

            await updateStory(id, { // ✅ Use id directly
                title: data.title,
                content,
                excerpt: data.excerpt,
                author: data.author,
                section: data.section,
                slug,
                imageUrl,
                published: data.published,
            });

            console.log('Story updated successfully!');
            router.push('/dashboard/stories');
        } catch (error: any) {
            console.error('Error updating story:', error);
            alert(`Failed to update story: ${error.message || 'Unknown error'}`);
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading story...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Edit Story</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        {...register('title' as const, { required: 'Title is required' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <textarea
                        {...register('excerpt' as const, { required: 'Excerpt is required' })}
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
                            {...register('author' as const, { required: 'Author is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                        {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Section</label>
                        <select
                            {...register('section' as const, { required: 'Section is required' })}
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
                    <label className="block text-sm font-medium mb-2">Current Image</label>
                    {currentImageUrl && (
                        <img src={currentImageUrl} alt="Current story featured image" className="w-48 h-32 object-cover rounded-md mb-2" />
                    )}
                    <label className="block text-sm font-medium mb-2">Upload New Image (optional)</label>
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
                        {...register('published' as const)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label className="ml-2 text-sm font-medium">Published</label>
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
                        disabled={submitting}
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
                    >
                        {submitting ? 'Updating...' : 'Update Story'}
                    </button>
                </div>
            </form>
        </div>
    );
}