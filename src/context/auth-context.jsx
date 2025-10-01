import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { addDoc, doc, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut as firebaseSignOut } from 'firebase/auth';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
    const [navigateToRegister, setNavigateToRegister] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usr) => {
            setUser(usr);
            if (initializing) setInitializing(false);
            setLoading(false);
        });
        return unsubscribe;
    }, [initializing]);

    useEffect(() => {
        checkOnboardingStatus();
    }, []);

    async function checkOnboardingStatus() {
        try {
            const onboardingStatus = await AsyncStorage.getItem('hasCompletedOnboarding');
            setHasCompletedOnboarding(onboardingStatus === 'true');
        } catch (err) {
            setError('Error checking onboarding status. Please try again.');
        }
    };

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
            setHasCompletedOnboarding(true);
            setNavigateToRegister(true);
        } catch (err) {
            setError('Error completing onboarding. Please try again.');
        }
    };

    const resetOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('hasCompletedOnboarding');
            await AsyncStorage.removeItem('selectedTheme');
            await AsyncStorage.removeItem('locationPermissionGranted');
            setHasCompletedOnboarding(false);
        } catch (err) {
            setError('Error resetting onboarding. Please try again.');
        }
    };

    const signUp = async (username, email, password, confirmPassword) => {
        try {
            setLoading(true);

            if (password !== confirmPassword) {
                setError('Oups! Passwords do not match.');
                return { success: false };
            } else if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
                setError('Oups! Password should be at least 6 characters, 1 uppercase, and 1 number.');
                return { success: false };
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                setError('Oups! Invalid email address.');
                return { success: false };
            } else if (username.trim() === '') {
                setError('Oups! Username name cannot be empty.');
                return { success: false };
            } else {
                setError(null);
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, {
                displayName: `${username}`
            });

            const account = userCredential.user;

            await addDoc(doc(db, 'users', account.uid), {
                username: username,
                email: email,
                createdAt: serverTimestamp(),
                uid: user.uid,
            });

            return { success: true, user: account };
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Oups! Email already in use.');
            }
            else if (err.code === 'auth/invalid-email') {
                setError('Oups! Invalid email address.');
            }
            else if (err.code === 'auth/weak-password') {
                setError('Oups! Password should be at least 6 characters, 1 uppercase, and 1 number.');
            }
            else {
                setError('Oups! Something went wrong. Please try again.');
            }
            return { success: false };
        } finally {
            setLoading(false);
        }
    }

    const signIn = async (email, password) => {
        try {
            setLoading(true);
            const result = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: result.user };
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setError('Oups! No user found with this email.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Oups! Incorrect password. Please try again.');
            } else {
                setError('Oups! Something went wrong. Please try again.');
            }
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            await firebaseSignOut(auth);
            return { success: true };
        } catch (err) {
            console.error('Logout failed: ', err.message);
            setError('Failed to logout. Please try again.');
            return { success: false, error: error };
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {
        try {
            if (user) {
                await user.delete();
                await resetOnboarding();
                return { success: true };
            }
        } catch (err) {
            setError('Oups! Something went wrong. Please try again.');
            return { success: false };
        }
    };

    const value = {
        user,
        error,
        setError,
        loading,
        initializing,
        hasCompletedOnboarding,
        navigateToRegister,
        setNavigateToRegister,
        signUp,
        signIn,
        signOut,
        deleteAccount,
        completeOnboarding,
        resetOnboarding,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};