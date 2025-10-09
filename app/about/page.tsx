import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - VOK University JOURNAL',
    description: 'Learn about VOK University JOURNAL, our vision, mission, and core values.',
};

export default function AboutPage() {
    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">About Us</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                    <p className="text-lg text-gray-700">
                        The VOK University JOURNAL (VUJ) is a knowledge and media platform established to serve as the
                        central hub of student journalism, publications, and academic expression within the various
                        Universities.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Vision</h2>
                    <p className="text-lg text-gray-700">
                        To be the most reliable, innovative, and student-centered media journal that informs, educates,
                        and inspires.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Mission</h2>
                    <p className="text-lg text-gray-700">
                        To create a platform that documents the academic and social journey of the VOK University
                        community, fosters intellectual conversations, and connects students, staff, and alumni through
                        quality journalism and storytelling.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Core Values</h2>
                    <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                        <li>Integrity</li>
                        <li>Accuracy</li>
                        <li>Innovation</li>
                        <li>Inclusivity</li>
                        <li>Service</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}