import { createContext, useContext, useState, useEffect } from 'react';
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
            primary: '#40916c',      // Main green
            secondary: '#74c69d',    // Light green
            background: '#d8f3dc',   // Very light green background
            surface: '#b7e4c7',      // Light green surface
            text: '#081c15',         // Dark green text
            textSecondary: '#1b4332', // Medium dark green
            border: '#95d5b2',       // Medium light green
            success: '#52b788',      // Success green
            warning: '#f59e0b',      // Keep original warning
            error: '#ef4444',        // Keep original error
            accent: '#2d6a4f',       // Dark green accent
            card: '#b7e4c7',         // Light green card
        },
        dark: {
            primary: '#52b788',      // Brighter green for dark mode
            secondary: '#74c69d',    // Light green
            background: '#081c15',   // Very dark green background
            surface: '#1b4332',      // Dark green surface
            text: '#d8f3dc',         // Light green text
            textSecondary: '#95d5b2', // Medium light green
            border: '#2d6a4f',       // Medium dark green
            success: '#74c69d',      // Success light green
            warning: '#f59e0b',      // Keep original warning
            error: '#ef4444',        // Keep original error
            accent: '#95d5b2',       // Light green accent
            card: '#1b4332',         // Dark green card
        },
    };

    const currentColors = colors[isDark ? 'dark' : 'light'];

    // Common style classes for NativeWind
    const styles = {
        // Backgrounds
        bg: {
            primary: isDark ? 'bg-green-custom-800' : 'bg-green-custom-50',     // #081c15 : #d8f3dc
            secondary: isDark ? 'bg-green-custom-700' : 'bg-green-custom-100',  // #1b4332 : #b7e4c7
            surface: isDark ? 'bg-green-custom-700' : 'bg-green-custom-100',    // #1b4332 : #b7e4c7
            accent: isDark ? 'bg-green-custom-400' : 'bg-green-custom-500',     // #52b788 : #40916c
            card: isDark ? 'bg-green-custom-700' : 'bg-green-custom-100',       // #1b4332 : #b7e4c7
        },
        // Text colors
        text: {
            primary: isDark ? 'text-green-custom-50' : 'text-green-custom-800',   // #d8f3dc : #081c15
            secondary: isDark ? 'text-green-custom-200' : 'text-green-custom-700', // #95d5b2 : #1b4332
            accent: isDark ? 'text-green-custom-200' : 'text-green-custom-600',   // #95d5b2 : #2d6a4f
            muted: isDark ? 'text-green-custom-300' : 'text-green-custom-500',    // #74c69d : #40916c
        },
        // Borders
        border: {
            default: isDark ? 'border-green-custom-600' : 'border-green-custom-200',  // #2d6a4f : #95d5b2
            light: isDark ? 'border-green-custom-700' : 'border-green-custom-100',    // #1b4332 : #b7e4c7
            accent: isDark ? 'border-green-custom-400' : 'border-green-custom-500',   // #52b788 : #40916c
        },
        // Buttons
        button: {
            primary: isDark
                ? 'bg-green-custom-400 hover:bg-green-custom-300'   // #52b788 : hover lighter in dark
                : 'bg-green-custom-500 hover:bg-green-custom-600',  // #40916c : hover darker in light
            secondary: isDark
                ? 'bg-green-custom-700 hover:bg-green-custom-600 border-green-custom-600'      // #1b4332 surfaces
                : 'bg-green-custom-100 hover:bg-green-custom-200 border-green-custom-200',   // #b7e4c7 surfaces
            outline: isDark
                ? 'border-green-custom-600 hover:bg-green-custom-700'  // #2d6a4f border
                : 'border-green-custom-200 hover:bg-green-custom-50',  // #95d5b2 border
        },
        // Cards
        card: isDark
            ? 'bg-green-custom-700 border-green-custom-600'     // #1b4332 : #2d6a4f
            : 'bg-green-custom-100 border-green-custom-200',   // #b7e4c7 : #95d5b2
        // Input fields
        input: isDark
            ? 'bg-green-custom-700 border-green-custom-600 text-green-custom-50 placeholder-green-custom-300'    // Dark theme
            : 'bg-green-custom-50 border-green-custom-200 text-green-custom-800 placeholder-green-custom-500',   // Light theme
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