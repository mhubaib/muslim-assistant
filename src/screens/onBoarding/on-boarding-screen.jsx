import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const OnBoardingScreen = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const { completeOnboarding } = useAuth();
    const { changeTheme, styles } = useTheme();

    const steps = [
        'theme-selection',
        'location-permission',
        'complete'
    ];

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
                        { text: 'Try Again', onPress: () => setCurrentStep(1) }
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
        navigation.replace('auth', { screen: 'register'});
    };

    const renderThemeSelection = () => (
        <View className={`flex-1 justify-center items-center px-5 ${styles.bg.primary}`}>
            <Text className={`text-3xl font-bold text-center mb-2 ${styles.text.primary}`}>Choose Your Theme</Text>
            <Text className={`text-base text-center mb-10 ${styles.text.secondary} leading-6`}>Select your preferred app theme</Text>

            <View className="flex-row justify-around w-full">
                <TouchableOpacity
                    className={`items-center p-5 rounded-xl border-2 ${selectedTheme === 'light' ? styles.border.accent + ' ' + styles.bg.card : styles.border.default + ' ' + styles.bg.surface}`}
                    onPress={() => {
                        setSelectedTheme('light');
                        changeTheme('light');
                        setCurrentStep(1);
                    }}
                >
                    <View className="w-15 h-15 rounded-full bg-white border border-gray-300 mb-2" />
                    <Text className={`text-base font-semibold ${styles.text.primary}`}>Light Theme</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`items-center p-5 rounded-xl border-2 ${selectedTheme === 'dark' ? styles.border.accent + ' ' + styles.bg.card : styles.border.default + ' ' + styles.bg.surface}`}
                    onPress={() => {
                        setSelectedTheme('dark');
                        changeTheme('dark');
                        setCurrentStep(1);
                    }}
                >
                    <View className="w-15 h-15 rounded-full bg-gray-800 mb-2" />
                    <Text className={`text-base font-semibold ${styles.text.primary}`}>Dark Theme</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderLocationPermission = () => (
        <View className={`flex-1 justify-center items-center px-5 ${styles.bg.primary}`}>
            <Text className={`text-3xl font-bold text-center mb-2 ${styles.text.primary}`}>Location Permission</Text>
            <Text className={`text-base text-center mb-10 ${styles.text.secondary} leading-6`}>
                We need access to your location to provide accurate prayer times for your area.
            </Text>

            <View className="items-center mb-10">
                <View className={`w-20 h-20 rounded-full mb-5 ${styles.button.primary}`} />
                <Text className={`text-base text-center ${styles.text.secondary} leading-6`}>
                    This helps us determine your local prayer times based on your geographical location.
                </Text>
            </View>

            <TouchableOpacity
                className={`${styles.button.primary} py-4 px-8 rounded-lg mb-4 w-4/5`}
                onPress={requestLocationPermission}
            >
                <Text className="text-white text-base font-semibold text-center">Grant Location Permission</Text>
            </TouchableOpacity>
        </View>
    );

    const renderComplete = () => (
        <View className={`flex-1 justify-center items-center px-5 ${styles.bg.primary}`}>
            <Text className={`text-3xl font-bold text-center mb-2 ${styles.text.primary}`}>All Set!</Text>
            <Text className={`text-base text-center mb-10 ${styles.text.secondary} leading-6`}>
                Your preferences have been saved. Let's get started with your spiritual journey.
            </Text>

            <TouchableOpacity
                className={`${styles.button.primary} py-4 px-8 rounded-lg w-4/5`}
                onPress={completeOnboardingFlow}
            >
                <Text className="text-white text-base font-semibold text-center">Continue to App</Text>
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
        <View className={`flex-1 ${styles.bg.primary}`}>
            {/* Progress indicator */}
            <View className="flex-row justify-center pt-12 pb-5">
                {steps.map((_, index) => (
                    <View
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full mx-1 ${index <= currentStep ? styles.button.primary : 'bg-gray-300'
                            }`}
                    />
                ))}
            </View>

            {renderCurrentStep()}
        </View>
    );
};

export default OnBoardingScreen;