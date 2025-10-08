// Run this script once to seed initial data: node --loader ts-node/esm scripts/seedFirestore.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleStories = [
    {
        title: 'New Research Center Opens at VOK University',
        content: '<p>VOK University has inaugurated a state-of-the-art research center dedicated to advancing innovation in technology and science. The facility features cutting-edge laboratories and collaborative spaces for students and faculty.</p><p>The center will focus on interdisciplinary research projects and aims to position VOK University as a leader in academic research excellence.</p>',
        excerpt: 'VOK University inaugurates a state-of-the-art research center focused on technology and science innovation.',
        author: 'Sarah Johnson',
        section: 'news',
        slug: 'new-research-center-opens-vok-university',
        imageUrl: 'https://placeholder-image-service.onrender.com/image/800x400?prompt=Modern university research center building with glass facade and students walking outside&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        published: true,
        views: 0,
        publishedDate: Timestamp.now(),
    },
    {
        title: 'Student Innovation Team Wins National Competition',
        content: '<p>A team of VOK University students has won first place in the National Innovation Challenge with their groundbreaking project on sustainable energy solutions.</p><p>Their project, which focuses on affordable solar technology for rural communities, impressed judges with its practical application and social impact potential.</p>',
        excerpt: 'VOK University students win national competition with sustainable energy innovation project.',
        author: 'Michael Chen',
        section: 'news',
        slug: 'student-innovation-team-wins-national-competition',
        imageUrl: 'https://placeholder-image-service.onrender.com/image/800x400?prompt=Group of diverse university students celebrating with trophy and project display at competition&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        published: true,
        views: 0,
        publishedDate: Timestamp.now(),
    },
    {
        title: 'The Future of Campus Sustainability',
        content: '<p>As environmental concerns grow globally, VOK University is taking significant steps toward becoming a carbon-neutral campus by 2030. This comprehensive analysis explores the initiatives and challenges ahead.</p><p>From renewable energy installations to waste reduction programs, the university is committed to leading by example in sustainability practices.</p>',
        excerpt: 'An in-depth look at VOK University\'s comprehensive sustainability initiatives and carbon-neutral goals.',
        author: 'Emily Rodriguez',
        section: 'research',
        slug: 'future-campus-sustainability',
        imageUrl: 'https://placeholder-image-service.onrender.com/image/800x400?prompt=Green university campus with solar panels and wind turbines in sustainable environment&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        published: true,
        views: 0,
        publishedDate: Timestamp.now(),
    },
    {
        title: 'Annual Cultural Festival Showcases Student Talent',
        content: '<p>The VOK University Annual Cultural Festival brought together students from diverse backgrounds to celebrate art, music, dance, and cultural heritage. The three-day event featured over 50 performances and exhibitions.</p><p>This year\'s theme, "Unity in Diversity," highlighted the rich multicultural tapestry of our campus community and fostered greater understanding among students.</p>',
        excerpt: 'The Annual Cultural Festival celebrates student creativity and multicultural heritage with performances and exhibitions.',
        author: 'David Park',
        section: 'campus-life',
        slug: 'annual-cultural-festival-showcases-student-talent',
        imageUrl: 'https://placeholder-image-service.onrender.com/image/800x400?prompt=Vibrant university cultural festival with students performing traditional dances on outdoor stage&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        published: true,
        views: 0,
        publishedDate: Timestamp.now(),
    },
    {
        title: 'Why Student Voice Matters More Than Ever',
        content: '<p>In an era of rapid change and uncertainty, student voices are crucial in shaping the future of education. This editorial argues for greater student representation in university decision-making processes.</p><p>From curriculum design to campus policies, students bring unique perspectives that can lead to more inclusive and effective solutions. Universities must listen and empower student leaders.</p>',
        excerpt: 'An editorial advocating for increased student representation in university governance and decision-making.',
        author: 'Aisha Patel',
        section: 'opinion',
        slug: 'why-student-voice-matters-more-than-ever',
        imageUrl: 'https://placeholder-image-service.onrender.com/image/800x400?prompt=Diverse group of students in discussion at university council meeting with raised hands&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ',
        published: true,
        views: 0,
        publishedDate: Timestamp.now(),
    },
];

async function seedData() {
    try {
        console.log('Starting to seed Firestore...');

        for (const story of sampleStories) {
            const docRef = await addDoc(collection(db, 'stories'), story);
            console.log(`Added story: ${story.title} with ID: ${docRef.id}`);
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();