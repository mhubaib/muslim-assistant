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
    const [theme, setTheme] = useState('system'); 
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
    
    const styles = {
        light: {
            bg: {
                primary: '#E8F5E9', // Hijau sangat muda untuk latar belakang
                secondary: '#FFFFFF', // Putih bersih untuk kontras
                accent: '#4CAF50', // Hijau Islami sebagai aksen
            },
            text: {
                primary: '#1A3C34', // Hijau tua untuk teks utama
                secondary: '#4A4A4A', // Abu-abu gelap untuk teks sekunder
                accent: '#388E3C', // Hijau sedang untuk teks aksen
            },
            border: {
                primary: '#81C784', // Hijau muda untuk border
                secondary: '#B0BEC5', // Abu-abu muda untuk border sekunder
            },
            button: {
                background: '#4CAF50', // Hijau untuk tombol
                text: '#FFFFFF', // Teks putih untuk kontras
                border: '#388E3C', // Border hijau sedikit lebih gelap
                disabled: '#A5D6A7', // Hijau pudar untuk tombol nonaktif
            },
            card: {
                background: '#F1F8E9', // Hijau sangat muda untuk kartu
                shadow: '#C8E6C9', // Bayangan hijau lembut
                border: '#A5D6A7', // Border hijau muda
            },
            input: {
                background: '#FFFFFF', // Latar belakang putih untuk input
                text: '#1A3C34', // Teks hijau tua
                border: '#81C784', // Border hijau muda
                placeholder: '#90A4AE', // Abu-abu untuk placeholder
            },
        },
        dark: {
            bg: {
                primary: '#1A3C34', // Hijau tua untuk latar belakang
                secondary: '#263238', // Abu-abu gelap untuk kontras
                accent: '#4CAF50', // Hijau Islami sebagai aksen
            },
            text: {
                primary: '#E8F5E9', // Hijau sangat muda untuk teks utama
                secondary: '#B0BEC5', // Abu-abu muda untuk teks sekunder
                accent: '#81C784', // Hijau muda untuk teks aksen
            },
            border: {
                primary: '#4CAF50', // Hijau untuk border
                secondary: '#455A64', // Abu-abu gelap untuk border sekunder
            },
            button: {
                background: '#388E3C', // Hijau sedikit lebih gelap untuk tombol
                text: '#E8F5E9', // Teks hijau sangat muda
                border: '#2E7D32', // Border hijau lebih tua
                disabled: '#4A7043', // Hijau sangat gelap untuk tombol nonaktif
            },
            card: {
                background: '#263238', // Abu-abu gelap untuk kartu
                shadow: '#1A3C34', // Bayangan hijau tua
                border: '#4CAF50', // Border hijau
            },
            input: {
                background: '#37474F', // Abu-abu gelap untuk input
                text: '#E8F5E9', // Teks hijau sangat muda
                border: '#4CAF50', // Border hijau
                placeholder: '#78909C', // Abu-abu untuk placeholder
            },
        },
    };

    const currentColors = styles[isDark ? 'dark' : 'light'];

    const value = {
        theme,
        isDark,
        colors: currentColors,
        changeTheme,
        toggleTheme: () => changeTheme(isDark ? 'light' : 'dark'),
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};