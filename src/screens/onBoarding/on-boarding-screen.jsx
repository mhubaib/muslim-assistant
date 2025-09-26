import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LocationService from '../../services/location-service';

const OnBoardingScreen = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const { completeOnboarding } = useAuth();
    const { changeTheme, colors } = useTheme();

    const steps = [
        'theme-selection',
        'location-permission',
        'complete'
    ];

    const handleGetCurrentLocation = async () => {
        try {
            let permissionGranted = await LocationService.checkLocationPermission();

            if (!permissionGranted) {
                const requestResult = await LocationService.requestLocationPermission();
                permissionGranted = requestResult.granted;
            }

            if (permissionGranted) {
                const location = await LocationService.getCurrentLocation();
                console.log('Current location:', location);

                await AsyncStorage.setItem('userLocation', JSON.stringify(location));
            } else {
                console.log('Location permission denied');
            }
            setCurrentStep(2);
        } catch (error) {
            console.error('Error handling location:', error);
        }
    };


    const completeOnboardingFlow = async () => {
        await completeOnboarding();
        navigation.replace('auth');
    };

    const renderThemeSelection = () => (
        <View style={[componentStyles.container, { backgroundColor: colors.bg.primary }]}>
            <Text style={[componentStyles.title, { color: colors.text.primary }]}>Choose Your Theme</Text>
            <Text style={[componentStyles.subtitle, { color: colors.text.secondary }]}>Select your preferred app theme</Text>

            <View style={componentStyles.themeRow}>
                <TouchableOpacity
                    style={[
                        componentStyles.themeOption,
                        {
                            backgroundColor: selectedTheme === 'light' ? colors.card.background : colors.bg.secondary,
                            borderColor: selectedTheme === 'light' ? colors.border.primary : colors.border.secondary,
                        }
                    ]}
                    onPress={() => {
                        setSelectedTheme('light');
                        changeTheme('light');
                        setCurrentStep(1);
                    }}
                >
                    <View style={[componentStyles.themePreview, { backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }]} />
                    <Text style={[componentStyles.themeText, { color: colors.text.primary }]}>Light Theme</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        componentStyles.themeOption,
                        {
                            backgroundColor: selectedTheme === 'dark' ? colors.card.background : colors.bg.secondary,
                            borderColor: selectedTheme === 'dark' ? colors.border.primary : colors.border.secondary,
                        }
                    ]}
                    onPress={() => {
                        setSelectedTheme('dark');
                        changeTheme('dark');
                        setCurrentStep(1);
                    }}
                >
                    <View style={[componentStyles.themePreview, { backgroundColor: '#424242' }]} />
                    <Text style={[componentStyles.themeText, { color: colors.text.primary }]}>Dark Theme</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderLocationPermission = () => (
        <View style={[componentStyles.container, { backgroundColor: colors.bg.primary }]}>
            <Text style={[componentStyles.title, { color: colors.text.primary }]}>Location Permission</Text>
            <Text style={[componentStyles.subtitle, { color: colors.text.secondary }]}>
                We need access to your location to provide accurate prayer times for your area.
            </Text>

            <View style={componentStyles.locationSection}>
                <View style={[componentStyles.locationIcon, { backgroundColor: colors.button.background }]} />
                <Text style={[componentStyles.locationDescription, { color: colors.text.secondary }]}>
                    This helps us determine your local prayer times based on your geographical location.
                </Text>
            </View>

            <TouchableOpacity
                style={[componentStyles.primaryButton, { backgroundColor: colors.button.background }]}
                onPress={handleGetCurrentLocation}
            >
                <Text style={[componentStyles.primaryButtonText, { color: colors.button.text }]}>Grant Location Permission</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={componentStyles.secondaryButton}
                onPress={() => setCurrentStep(2)}
            >
                <Text style={[componentStyles.secondaryButtonText, { color: colors.text.accent }]}>Skip for Now</Text>
            </TouchableOpacity>
        </View>
    );

    const renderComplete = () => (
        <View style={[componentStyles.container, { backgroundColor: colors.bg.primary }]}>
            <Text style={[componentStyles.title, { color: colors.text.primary }]}>All Set!</Text>
            <Text style={[componentStyles.subtitle, { color: colors.text.secondary }]}>
                Your preferences have been saved. Let's get started with your spiritual journey.
            </Text>

            <TouchableOpacity
                style={[componentStyles.primaryButton, { backgroundColor: colors.button.background }]}
                onPress={completeOnboardingFlow}
            >
                <Text style={[componentStyles.primaryButtonText, { color: colors.button.text }]}>Continue to App</Text>
            </TouchableOpacity>
        </View>
    );

    const renderCurrentStep = () => {
        switch (steps[currentStep]) {
            case 'theme-selection':
                return renderThemeSelection();
            case 'location-permission':
                return renderLocationPermission();
            case 'complete':
                return renderComplete();
            default:
                return renderThemeSelection();
        }
    };

    return (
        <View style={[componentStyles.mainContainer, { backgroundColor: colors.bg.primary }]}>
            {/* Progress indicator */}
            <View style={componentStyles.progressContainer}>
                {steps.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            componentStyles.progressDot,
                            {
                                backgroundColor: index <= currentStep ? colors.button.background : '#BDBDBD'
                            }
                        ]}
                    />
                ))}
            </View>

            {renderCurrentStep()}
        </View>
    );
};

const componentStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 48,
        paddingBottom: 20,
    },
    progressDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    themeRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    themeOption: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 12,
        borderWidth: 2,
        minWidth: 120,
    },
    themePreview: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
        borderWidth: 1,
    },
    themeText: {
        fontSize: 16,
        fontWeight: '600',
    },
    locationSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    locationIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
    },
    locationDescription: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    primaryButton: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginBottom: 16,
        width: '80%',
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    secondaryButton: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default OnBoardingScreen;