import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useTheme } from '../../context/theme-context';
import CustomButton from '../../components/button';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function ThemeSelectionScreen({ selectedTheme, setSelectedTheme, setCurrentStep }) {
    const { colors, changeTheme, isDark } = useTheme();
    const fadeAnim = useRef(new Animated.Value(1)).current; // Untuk opacity tombol toggle
    const scaleAnim = useRef(new Animated.Value(1)).current; // Untuk scale tombol toggle

    // Fungsi untuk menangani toggle tema dengan animasi
    const handleThemeToggle = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0.4,
                    duration: 150,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 150,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 150,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            // Ganti tema setelah animasi selesai
            const newTheme = isDark ? 'light' : 'dark';
            setSelectedTheme(newTheme);
            changeTheme(newTheme);
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.bg.primary }]}>
            <View style={styles.imageContainer}>
                <View style={[styles.image, { backgroundColor: colors.card.background }]}>
                    <Image source={require('../../assets/muslim-app-logo.png')} style={styles.imageText} />
                </View>
            </View>

            <Text style={[styles.title, { color: colors.text.primary }]}>Choose Your Theme</Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Select your preferred app theme for the best experience</Text>

            <TouchableOpacity onPress={handleThemeToggle} activeOpacity={0.7} accessibilityLabel="Toggle theme">
                <Animated.View
                    style={[
                        styles.toggleButton,
                        {
                            backgroundColor: isDark ? '#333' : '#FFF',
                            borderColor: isDark ? '#FFF' : '#333',
                            transform: [{ scale: scaleAnim }],
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <MaterialIcons
                        name={isDark ? 'bedtime' : 'light-mode'}
                        size={24}
                        color={isDark ? '#FFF' : '#333'}
                    />
                    <Text style={[styles.toggleText, { color: isDark ? '#FFF' : '#333' }]}>
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                    </Text>
                </Animated.View>
            </TouchableOpacity>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <CustomButton
                        title="Previous"
                        onPress={() => setCurrentStep(0)}
                        size="large"
                        variant="text"
                    />
                    <CustomButton
                        title="Continue"
                        onPress={() => setCurrentStep(2)}
                        size="large"
                    />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 14,
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 40,
    },
    imageContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 110,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    imageText: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});