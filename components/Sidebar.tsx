'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, BarChart3, LogOut } from 'lucide-react';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const menuItems = [
        { label: 'Stories', href: '/dashboard/stories', icon: FileText },
        { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ];

    return (
        <aside className="w-64 bg-primary text-white p-6">
            <h2 className="text-2xl font-bold mb-8">VUJ Dashboard</h2>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                                isActive ? 'bg-secondary' : 'hover:bg-primary-dark'
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 mt-8 w-full hover:bg-primary-dark rounded-md transition-colors"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </aside>
    );
}