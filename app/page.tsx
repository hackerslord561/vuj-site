import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  const highlights = [
    { title: 'News & Updates', href: '/news', icon: '📰' },
    { title: 'Research & Publications', href: '/research', icon: '🔬' },
    { title: 'Campus Life & Culture', href: '/campus-life', icon: '🎓' },
    { title: 'Opinion & Editorials', href: '/opinion', icon: '✍️' },
    { title: 'Multimedia', href: '/multimedia', icon: '🎥' },
  ];

  return (
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              University Journal – The Voice of Knowledge
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Documenting, Informing, Inspiring.
            </p>
            <p className="text-lg max-w-3xl mx-auto">
              Welcome to VOK University Journal (VUJ), the premier student-driven media and knowledge hub dedicated to broadcasting campus news, publishing research, celebrating achievements, and amplifying student voices.
            </p>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Explore Our Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((item, index) => (
                  <Link
                      key={index}
                      href={item.href}
                      className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:border-primary hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                  </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
            <p className="text-lg text-white mb-8">
              Be part of the VUJ team and contribute to the voice of our university.
            </p>
            <Link
                href="/get-involved"
                className="inline-block bg-white text-secondary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </section>
      </div>
  );
}