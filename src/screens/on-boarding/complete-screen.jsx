import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../context/theme-context';
import CustomButton from '../../components/button';

export default function CompleteScreen({ completeOnboardingFlow }) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg.primary }]}>
            <View style={styles.imageContainer}>
                <View style={[styles.image, { backgroundColor: colors.card.background }]}>
                    <Image source={require('../../assets/muslim-app-logo.png')} style={styles.imageText} />
                </View>
            </View>

            <Text style={[styles.title, { color: colors.text.primary }]}>You're All Set!</Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                Your spiritual companion is ready. Begin your journey with daily prayers, Quran reading, and Islamic guidance.
            </Text>

            <View style={styles.completionFeatures}>
                <Text style={[styles.completionText, { color: colors.text.secondary }]}>✓ Theme configured</Text>
                <Text style={[styles.completionText, { color: colors.text.secondary }]}>✓ Location setup</Text>
                <Text style={[styles.completionText, { color: colors.text.secondary }]}>✓ Ready to use</Text>
            </View>

            <CustomButton
                title="Start My Journey"
                onPress={completeOnboardingFlow}
                size="large"
                fullWidth
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 14,
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    iconContainer: {
        marginBottom: 32,
        alignItems: 'center',
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
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    completionFeatures: {
        alignItems: 'center',
        marginBottom: 40,
    },
    completionText: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
});