'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, loginWithEmail, loginWithGoogle } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await getCurrentUser();
            if (!user) {
                setShowLogin(true);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoggingIn(true);

        try {
            await loginWithEmail(email, password);
            setShowLogin(false);
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoggingIn(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoggingIn(true);

        try {
            await loginWithGoogle();
            setShowLogin(false);
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to login with Google');
        } finally {
            setLoggingIn(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (showLogin) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-3xl font-bold text-primary mb-6 text-center">Dashboard Login</h1>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loggingIn}
                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50"
                        >
                            {loggingIn ? 'Logging in...' : 'Login with Email'}
                        </button>
                    </form>

                    <div className="my-4 text-center text-gray-500">or</div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loggingIn}
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                        Login with Google
                    </button>

                    <p className="mt-6 text-sm text-gray-600 text-center">
                        Contact admin to create an account
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}