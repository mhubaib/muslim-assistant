import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useAuth } from '../../context/auth-context';
import { useTheme } from '../../context/theme-context';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loading } = useAuth();
    const { colors, styles } = useTheme();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const result = await signIn(email, password);

        if (!result.success) {
            Alert.alert('Login Failed', result.error);
        }
        // No need to navigate manually, AppNavigator will handle this
    };

    const navigateToRegister = () => {
        navigation.navigate('register');
    };

    return (
        <KeyboardAvoidingView
            className={`flex-1 ${styles.bg.primary}`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="flex-1 justify-center px-5">
                <Text className={`text-3xl font-bold text-center mb-2 ${styles.text.primary}`}>Welcome Back</Text>
                <Text className={`text-base text-center mb-10 ${styles.text.secondary}`}>Sign in to continue your spiritual journey</Text>

                <View className="w-full">
                    <TextInput
                        className={`${styles.input} border rounded-lg p-4 mb-4 text-base`}
                        placeholder="Email"
                        placeholderTextColor={colors.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TextInput
                        className={`${styles.input} border rounded-lg p-4 mb-4 text-base`}
                        placeholder="Password"
                        placeholderTextColor={colors.textSecondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    <TouchableOpacity
                        className={`${loading ? 'bg-gray-400' : styles.button.primary} p-4 rounded-lg items-center mt-2`}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text className="text-white text-base font-semibold">Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <View className="flex-row justify-center mt-5">
                        <Text className={`text-base ${styles.text.secondary}`}>Don't have an account? </Text>
                        <TouchableOpacity onPress={navigateToRegister}>
                            <Text className={`text-base ${styles.text.accent} font-semibold`}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}