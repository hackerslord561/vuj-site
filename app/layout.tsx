import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'VOK University JNAL - The Voice of Knowledge',
    description: 'The premier student-driven media and knowledge hub dedicated to broadcasting campus news, publishing research, celebrating achievements, and amplifying student voices.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        </body>
        </html>
    );
}