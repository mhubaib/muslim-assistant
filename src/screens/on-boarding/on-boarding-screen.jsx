import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/auth-context';
import { useTheme } from '../../context/theme-context';
import LocationService from '../../services/location-service';

// Import separated screen components
import WelcomeScreen from './welcome-screen';
import ThemeSelectionScreen from './theme-selection-screen';
import LocationPermissionScreen from './location-permission-screen';
import CompleteScreen from './complete-screen';

const OnBoardingScreen = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const { completeOnboarding } = useAuth();
    const { colors } = useTheme();

    const steps = [
        'welcome',
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
            setCurrentStep(3);
        } catch (error) {
            console.error('Error handling location:', error);
        }
    };

    const completeOnboardingFlow = async () => {
        await completeOnboarding();
    };

    const renderCurrentStep = () => {
        switch (steps[currentStep]) {
            case 'welcome':
                return (
                    <WelcomeScreen
                        setCurrentStep={setCurrentStep}
                    />
                );
            case 'theme-selection':
                return (
                    <ThemeSelectionScreen
                        selectedTheme={selectedTheme}
                        setSelectedTheme={setSelectedTheme}
                        setCurrentStep={setCurrentStep}
                    />
                );
            case 'location-permission':
                return (
                    <LocationPermissionScreen
                        handleGetCurrentLocation={handleGetCurrentLocation}
                        setCurrentStep={setCurrentStep}
                    />
                );
            case 'complete':
                return (
                    <CompleteScreen
                        completeOnboardingFlow={completeOnboardingFlow}
                    />
                );
            default:
                return (
                    <WelcomeScreen
                        setCurrentStep={setCurrentStep}
                    />
                );
        }
    };

    return (
        <View style={[styles.mainContainer, { backgroundColor: colors.bg.primary }]}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
                {steps.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.progressDot,
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

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 32,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 6,
    },
});

export default OnBoardingScreen;