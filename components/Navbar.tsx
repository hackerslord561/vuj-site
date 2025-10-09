'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { label: 'About', href: '/about' },
        { label: 'News', href: '/news' },
        { label: 'Research', href: '/research' },
        { label: 'Campus Life', href: '/campus-life' },
        { label: 'Opinion', href: '/opinion' },
        { label: 'Multimedia', href: '/multimedia' },
        { label: 'Special Features', href: '/special-features' },
        { label: 'Team', href: '/team' },
        { label: 'Events', href: '/events' },
        { label: 'Get Involved', href: '/get-involved' },
    ];

    return (
        <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/vuj.png"
                            alt="VOK University JNAL Logo"
                            width={120}
                            height={48}
                            className="h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="hover:text-secondary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/dashboard"
                            className="bg-secondary px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden pb-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block py-2 hover:text-secondary transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/dashboard"
                            className="block mt-4 bg-secondary px-4 py-2 rounded-md text-center hover:bg-opacity-90 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}