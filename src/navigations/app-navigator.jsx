import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from "./auth-navigator";
import DrawerNavigator from "./drawer-navigator";
import OnBoardingScreen from "../screens/onBoarding/on-boarding-screen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { user, initializing, hasCompletedOnboarding } = useAuth();

    // Show loading spinner while Firebase is initializing
    if (initializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {!hasCompletedOnboarding ? (
                    <Stack.Screen name='on-boarding' component={OnBoardingScreen} />
                ) : (
                    !user ? (
                        <Stack.Screen name='auth' component={AuthNavigator} />
                    ) : (
                        <Stack.Screen name='main' component={DrawerNavigator} />
                    )
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}