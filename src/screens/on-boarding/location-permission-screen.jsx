import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../context/theme-context';
import CustomButton from '../../components/button';

export default function LocationPermissionScreen({ handleGetCurrentLocation, setCurrentStep }) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg.primary }]}>
            <View style={styles.imageContainer}>
                <View style={[styles.image, { backgroundColor: colors.card.background }]}>
                    <Image source={require("../../assets/muslim-app-logo.png")} style={styles.imageText} />
                </View>
            </View>

            <Text style={[styles.title, { color: colors.text.primary }]}>Location Access</Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
                Enable location access to get accurate prayer times for your area.
            </Text>

            <CustomButton
                icon='pin-drop'
                sizeIcon={40}
                onPress={handleGetCurrentLocation}
                size="medium"
            />

            <View style={styles.additionalButtonsContainer}>
                <CustomButton
                    title={"Previous"}
                    onPress={() => setCurrentStep(1)}
                    variant="text"
                    size="medium"
                />
                <CustomButton
                    title="Skip for Now"
                    onPress={() => setCurrentStep(3)}
                    variant="text"
                    size="medium"
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
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    additionalButtonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    }
});