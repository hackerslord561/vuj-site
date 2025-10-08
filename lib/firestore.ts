import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    increment,
    Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Story, Submission } from '@/types';

// Stories Collection
export const createStory = async (story: Omit<Story, 'id' | 'views' | 'publishedDate'>) => {
    const docRef = await addDoc(collection(db, 'stories'), {
        ...story,
        views: 0,
        publishedDate: Timestamp.now(),
    });
    return docRef.id;
};

export const getStoriesBySection = async (section: string) => {
    const q = query(
        collection(db, 'stories'),
        where('section', '==', section),
        where('published', '==', true),
        orderBy('publishedDate', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story));
};

export const getAllStories = async () => {
    const q = query(collection(db, 'stories'), orderBy('publishedDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story));
};

export const getStoryBySlug = async (slug: string) => {
    const q = query(collection(db, 'stories'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Story;
};

export const getStoryById = async (id: string) => {
    const docRef = doc(db, 'stories', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Story;
};

export const updateStory = async (id: string, updates: Partial<Story>) => {
    const docRef = doc(db, 'stories', id);
    await updateDoc(docRef, updates);
};

export const deleteStory = async (id: string) => {
    await deleteDoc(doc(db, 'stories', id));
};

export const incrementStoryViews = async (id: string) => {
    const docRef = doc(db, 'stories', id);
    await updateDoc(docRef, {
        views: increment(1),
    });
};

// Submissions Collection
export const createSubmission = async (submission: Omit<Submission, 'id' | 'submittedDate'>) => {
    const docRef = await addDoc(collection(db, 'submissions'), {
        ...submission,
        submittedDate: Timestamp.now(),
    });
    return docRef.id;
};

export const getAllSubmissions = async () => {
    const snapshot = await getDocs(collection(db, 'submissions'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
};