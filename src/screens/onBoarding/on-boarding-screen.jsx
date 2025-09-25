import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useAuth } from '../../context/AuthContext';

const OnBoardingScreen = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const { completeOnboarding } = useAuth();

    const steps = [
        'theme-selection',
        'location-permission',
        'complete'
    ];

    const handleThemeSelection = async (theme) => {
        try {
            await AsyncStorage.setItem('selectedTheme', theme);
            setSelectedTheme(theme);
            setCurrentStep(1);
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    };

    const requestLocationPermission = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (result === RESULTS.GRANTED) {
                await AsyncStorage.setItem('locationPermissionGranted', 'true');
                setCurrentStep(2);
            } else {
                Alert.alert(
                    'Permission Required',
                    'Location permission is needed to provide accurate prayer times for your area.',
                    [
                        { text: 'Skip', onPress: () => setCurrentStep(2) },
                        { text: 'Try Again', onPress: requestLocationPermission }
                    ]
                );
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
            setCurrentStep(2);
        }
    };

    const completeOnboardingFlow = async () => {
        await completeOnboarding();
        navigation.replace('auth');
    };

    const renderThemeSelection = () => (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Theme</Text>
            <Text style={styles.subtitle}>Select your preferred app theme</Text>

            <View style={styles.themeContainer}>
                <TouchableOpacity
                    style={[styles.themeOption, selectedTheme === 'light' && styles.selectedTheme]}
                    onPress={() => handleThemeSelection('light')}
                >
                    <View style={styles.lightThemePreview} />
                    <Text style={styles.themeText}>Light Theme</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.themeOption, selectedTheme === 'dark' && styles.selectedTheme]}
                    onPress={() => handleThemeSelection('dark')}
                >
                    <View style={styles.darkThemePreview} />
                    <Text style={styles.themeText}>Dark Theme</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderLocationPermission = () => (
        <View style={styles.container}>
            <Text style={styles.title}>Location Permission</Text>
            <Text style={styles.subtitle}>
                We need access to your location to provide accurate prayer times for your area.
            </Text>

            <View style={styles.permissionContainer}>
                <View style={styles.locationIcon} />
                <Text style={styles.permissionText}>
                    This helps us determine your local prayer times based on your geographical location.
                </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={requestLocationPermission}>
                <Text style={styles.buttonText}>Grant Location Permission</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => setCurrentStep(2)}>
                <Text style={styles.secondaryButtonText}>Skip for Now</Text>
            </TouchableOpacity>
        </View>
    );

    const renderComplete = () => (
        <View style={styles.container}>
            <Text style={styles.title}>All Set!</Text>
            <Text style={styles.subtitle}>
                Your preferences have been saved. Let's get started with your spiritual journey.
            </Text>

            <TouchableOpacity style={styles.primaryButton} onPress={completeOnboardingFlow}>
                <Text style={styles.buttonText}>Continue to App</Text>
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
        <View style={styles.wrapper}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
                {steps.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.progressDot,
                            index <= currentStep && styles.progressDotActive
                        ]}
                    />
                ))}
            </View>

            {renderCurrentStep()}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    progressDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 5,
    },
    progressDotActive: {
        backgroundColor: '#4CAF50',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
        lineHeight: 24,
    },
    themeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    themeOption: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        backgroundColor: '#f9f9f9',
    },
    selectedTheme: {
        borderColor: '#4CAF50',
        backgroundColor: '#e8f5e8',
    },
    lightThemePreview: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    darkThemePreview: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#333333',
        marginBottom: 10,
    },
    themeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    permissionContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    locationIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4CAF50',
        marginBottom: 20,
    },
    permissionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        lineHeight: 24,
    },
    primaryButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
        width: '80%',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    secondaryButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '80%',
    },
    secondaryButtonText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default OnBoardingScreen;