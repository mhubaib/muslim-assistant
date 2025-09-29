import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../context/theme-context';
import CustomButton from '../../components/button';

export default function WelcomeScreen({ setCurrentStep }) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg.primary }]}>
            <View style={styles.imageContainer}>
                <View style={[styles.image, { backgroundColor: colors.card.background }]}>
                    <Image source={require("../../assets/muslim-app-logo.png")} style={styles.imageText} />
                </View>
            </View>

            <Text style={[styles.welcomeTitle, { color: colors.text.primary }]}>Muslim Assistant</Text>

            <Text style={[styles.welcomeSubtitle, { color: colors.text.secondary }]}>
                Muslim Assistant is an application designed to support your daily spiritual journey, let start your journey with us!
            </Text>
            <CustomButton
                title="Get Started"
                onPress={() => setCurrentStep(1)}
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
        paddingVertical: 40,
        paddingHorizontal: 32,
    },
    imageContainer: {
        marginBottom: 40,
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
    welcomeTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    welcomeSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 48,
        lineHeight: 24,
        paddingHorizontal: 16,
    },
});
