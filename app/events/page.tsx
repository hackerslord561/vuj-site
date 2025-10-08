import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Events & Programs - VOK University JNAL',
    description: 'Stay updated on VUJ workshops, webinars, journalism training, and special programs.',
};

const upcomingEvents = [
    {
        title: 'Investigative Journalism Workshop',
        date: 'March 15, 2024',
        time: '2:00 PM - 5:00 PM',
        location: 'Student Center, Room 301',
        description: 'Learn the fundamentals of investigative journalism from industry professionals.',
    },
    {
        title: 'Digital Media Production Webinar',
        date: 'March 22, 2024',
        time: '6:00 PM - 8:00 PM',
        location: 'Online via Zoom',
        description: 'Discover the latest tools and techniques for creating compelling digital media content.',
    },
    {
        title: 'Ethics in Journalism Panel Discussion',
        date: 'April 5, 2024',
        time: '3:00 PM - 5:00 PM',
        location: 'University Auditorium',
        description: 'Join leading journalists and academics for a discussion on ethical challenges in modern journalism.',
    },
    {
        title: 'Photography Masterclass',
        date: 'April 12, 2024',
        time: '10:00 AM - 4:00 PM',
        location: 'Media Lab, Building B',
        description: 'Hands-on workshop covering composition, lighting, and post-processing techniques.',
    },
    {
        title: 'VUJ Spring Publication Launch',
        date: 'April 28, 2024',
        time: '7:00 PM - 9:00 PM',
        location: 'University Library Plaza',
        description: 'Celebrate the launch of our spring edition featuring student work and special collaborations.',
    },
    {
        title: 'Annual VUJ Awards Ceremony',
        date: 'May 10, 2024',
        time: '6:00 PM - 9:00 PM',
        location: 'Grand Hall',
        description: 'Recognizing outstanding contributions to student journalism and media at VOK University.',
    },
];

export default function EventsPage() {
    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Events & Programs</h1>
                <p className="text-lg text-gray-700 mb-12">
                    Join us for workshops, webinars, training sessions, and special events designed to enhance your
                    journalism skills and connect with the media community.
                </p>

                <div className="space-y-6">
                    {upcomingEvents.map((event, index) => (
                        <div key={index}
                             className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{event.title}</h2>
                                <div className="text-secondary font-semibold">{event.date}</div>
                            </div>
                            <div className="space-y-2 text-gray-700">
                            <p><strong>Time:</strong> {event.time}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p className="mt-4">{event.description}</p>
                            </div>
                            <button
                                className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                                Register Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}