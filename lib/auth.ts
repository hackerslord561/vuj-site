import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';

export const loginWithEmail = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const logout = async () => {
    return signOut(auth);
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
};