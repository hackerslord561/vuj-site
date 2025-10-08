import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Team - VOK University JNAL',
    description: 'Meet the dedicated team behind VOK University JNAL.',
};

const teamMembers = {
    editorial: [
        {
            name: 'Sarah Johnson',
            role: 'Chief Editor',
            imageUrl: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Professional portrait of a young female chief editor in business attire with confident expression&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        },
        {
            name: 'Michael Chen',
            role: 'Managing Editor',
            imageUrl: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Professional portrait of a young male managing editor wearing glasses with friendly smile&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        },
        {
            name: 'Emily Rodriguez',
            role: 'News Editor',
            imageUrl: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Professional portrait of a young female news editor with professional attire and determined look&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        },
    ],
    contributors: [
        {
            name: 'David Park',
            role: 'Senior Writer',
            imageUrl: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Professional portrait of a young male writer with casual attire and creative expression&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        },
        {
            name: 'Aisha Patel',
            role: 'Photographer',
            imageUrl: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Professional portrait of a young female photographer with camera around neck and artistic look&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        },
        {
            name: 'James Wilson',
            role: 'Multimedia Producer',
            imageUrl: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Professional portrait of a young male multimedia producer with headphones and creative attire&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        },
    ],
    advisory: [
        {
            name: 'Dr. Patricia Williams',
            role: 'Faculty Advisor',
            imageUrl: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Professional portrait of a mature female professor in academic attire with warm smile&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        },
        {
            name: 'Robert Martinez',
            role: 'Industry Advisor',
            imageUrl: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Professional portrait of a mature male business advisor in formal suit with experienced look&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        },
    ],
};

export default function TeamPage() {
    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">Our Team</h1>
                <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
                    Meet the dedicated individuals who bring VUJ to life through their passion, creativity, and
                    commitment to quality journalism.
                </p>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Editorial Board</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.editorial.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img
                                    src={member.imageUrl}
                                    alt={`Portrait of ${member.name}, ${member.role} at VOK University JNAL`}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                    <p className="text-secondary font-semibold">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Student Contributors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.contributors.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img
                                    src={member.imageUrl}
                                    alt={`Portrait of ${member.name}, ${member.role} at VOK University JNAL`}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                    <p className="text-secondary font-semibold">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-center mb-8">Advisory Board</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {teamMembers.advisory.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img
                                    src={member.imageUrl}
                                    alt={`Portrait of ${member.name}, ${member.role} at VOK University JNAL`}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                    <p className="text-secondary font-semibold">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}