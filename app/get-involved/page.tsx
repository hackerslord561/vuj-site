import { Metadata } from 'next';
import SubmissionForm from '@/components/SubmissionForm';

export const metadata: Metadata = {
    title: 'Get Involved - VOK University JNAL',
    description: 'Join the VUJ team and contribute to the voice of our university.',
};

export default function GetInvolvedPage() {
    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">Get Involved</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Join Us</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Are you passionate about journalism, writing, photography, or design? Join the VUJ team and be
                        part of something bigger!
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-3">How to Apply:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li>Fill out the application form (coming soon)</li>
                            <li>Submit your portfolio or writing samples</li>
                            <li>Attend an interview with our editorial team</li>
                            <li>Complete a trial assignment</li>
                        </ol>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Submit an Article</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Have a story to tell? Submit your article using the form below. Our editorial team will review
                        your submission and get back to you within 5-7 business days.
                    </p>
                    <SubmissionForm/>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Partnerships</h2>
                    <p className="text-lg text-gray-700">
                        We welcome partnerships with organizations, alumni, and professionals who share our vision.
                        Contact us at <a href="mailto:partnerships@vuj.edu"
                                         className="text-primary hover:underline">partnerships@vuj.edu</a> to explore
                        collaboration opportunities.
                    </p>
                </section>
            </div>
        </div>
    );
}