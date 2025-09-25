import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState('system'); // 'light', 'dark', 'system'
    const [isDark, setIsDark] = useState(false);

    // Load saved theme preference
    useEffect(() => {
        loadThemePreference();
    }, []);

    // Update isDark based on theme setting
    useEffect(() => {
        if (theme === 'system') {
            setIsDark(systemColorScheme === 'dark');
        } else {
            setIsDark(theme === 'dark');
        }
    }, [theme, systemColorScheme]);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        }
    };

    const saveThemePreference = async (newTheme) => {
        try {
            await AsyncStorage.setItem('theme', newTheme);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        saveThemePreference(newTheme);
    };

    // Theme colors and styles
    const colors = {
        light: {
            primary: '#4CAF50',
            secondary: '#64748b',
            background: '#ffffff',
            surface: '#f8fafc',
            text: '#1e293b',
            textSecondary: '#64748b',
            border: '#e2e8f0',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            accent: '#8b5cf6',
            card: '#ffffff',
        },
        dark: {
            primary: '#4CAF50',
            secondary: '#94a3b8',
            background: '#0f172a',
            surface: '#1e293b',
            text: '#f1f5f9',
            textSecondary: '#94a3b8',
            border: '#334155',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            accent: '#a855f7',
            card: '#1e293b',
        },
    };

    const currentColors = colors[isDark ? 'dark' : 'light'];

    // Common style classes for NativeWind
    const styles = {
        // Backgrounds
        bg: {
            primary: isDark ? 'bg-slate-900' : 'bg-white',
            secondary: isDark ? 'bg-slate-800' : 'bg-slate-50',
            surface: isDark ? 'bg-slate-700' : 'bg-white',
            accent: isDark ? 'bg-green-600' : 'bg-green-500',
            card: isDark ? 'bg-slate-800' : 'bg-white',
        },
        // Text colors
        text: {
            primary: isDark ? 'text-slate-100' : 'text-slate-900',
            secondary: isDark ? 'text-slate-400' : 'text-slate-600',
            accent: isDark ? 'text-green-400' : 'text-green-600',
            muted: isDark ? 'text-slate-500' : 'text-slate-500',
        },
        // Borders
        border: {
            default: isDark ? 'border-slate-600' : 'border-slate-200',
            light: isDark ? 'border-slate-700' : 'border-slate-100',
            accent: isDark ? 'border-green-500' : 'border-green-300',
        },
        // Buttons
        button: {
            primary: isDark
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-green-500 hover:bg-green-600',
            secondary: isDark
                ? 'bg-slate-700 hover:bg-slate-600 border-slate-600'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300',
            outline: isDark
                ? 'border-slate-600 hover:bg-slate-800'
                : 'border-slate-300 hover:bg-slate-50',
        },
        // Cards
        card: isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200',
        // Input fields
        input: isDark
            ? 'bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-400'
            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500',
    };

    const value = {
        theme,
        isDark,
        colors: currentColors,
        styles,
        changeTheme,
        toggleTheme: () => changeTheme(isDark ? 'light' : 'dark'),
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};