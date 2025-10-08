'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSubmission } from '@/lib/firestore';

interface SubmissionFormData {
    title: string;
    content: string;
    authorEmail: string;
}

export default function SubmissionForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SubmissionFormData>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: SubmissionFormData) => {
        setLoading(true);
        setSuccess(false);

        try {
            await createSubmission(data);
            setSuccess(true);
            reset();
        } catch (error) {
            console.error('Error submitting article:', error);
            alert('Failed to submit article. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow">
            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800">Thank you! Your submission has been received and will be reviewed by our team.</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Article Title</label>
                    <input
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        placeholder="Enter your article title"
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                        type="email"
                        {...register('authorEmail', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        placeholder="your.email@example.com"
                    />
                    {errors.authorEmail && <p className="text-red-600 text-sm mt-1">{errors.authorEmail.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Article Content</label>
                    <textarea
                        {...register('content', {
                            required: 'Content is required',
                            minLength: {
                                value: 100,
                                message: 'Article must be at least 100 characters'
                            }
                        })}
                        rows={10}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        placeholder="Write your article here..."
                    />
                    {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-90 disabled:opacity-50"
                >
                    {loading ? 'Submitting...' : 'Submit Article'}
                </button>
            </form>
        </div>
    );
}