import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';

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
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

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
        } catch (error) {
            console.error('Error checking onboarding status:', error);
        }
    };

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
            setHasCompletedOnboarding(true);
        } catch (error) {
            console.error('Error completing onboarding:', error);
        }
    };

    const resetOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('hasCompletedOnboarding');
            await AsyncStorage.removeItem('selectedTheme');
            await AsyncStorage.removeItem('locationPermissionGranted');
            setHasCompletedOnboarding(false);
        } catch (error) {
            console.error('Error resetting onboarding:', error);
        }
    };

    // Authentication functions
    const signUp = async (email, password) => {
        try {
            setLoading(true);
            const result = await auth().createUserWithEmailAndPassword(email, password);
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        try {
            setLoading(true);
            const result = await auth().signInWithEmailAndPassword(email, password);
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            await auth().signOut();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
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
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        initializing,
        hasCompletedOnboarding,
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