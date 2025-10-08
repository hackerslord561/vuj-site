'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await getCurrentUser();
            if (!user) {
                router.push('/dashboard/login');
            } else {
                setLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
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