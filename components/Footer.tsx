import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">VOK University JOURNAL</h3>
                        <p className="text-sm">
                            The premier student-driven media and knowledge hub dedicated to documenting, informing, and inspiring.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link href="/about" className="block hover:text-secondary transition-colors">About Us</Link>
                            <Link href="/team" className="block hover:text-secondary transition-colors">Our Team</Link>
                            <Link href="/events" className="block hover:text-secondary transition-colors">Events</Link>
                            <Link href="/get-involved" className="block hover:text-secondary transition-colors">Get Involved</Link>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="hover:text-secondary transition-colors" aria-label="Twitter">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="hover:text-secondary transition-colors" aria-label="LinkedIn">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} VOK University JOURNAL. All rights reserved. Made with ❤️ by Hackerslord Studios</p>
                </div>
            </div>
        </footer>
    );
}