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
    ScrollView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { signUp, loading, error } = useAuth();
    const { colors, styles } = useTheme();

    const handleRegister = async () => {

        const result = await signUp(firstName, lastName, email, password, confirmPassword);

        if (result) {
            Alert.alert(
                'Success',
                'Account created successfully! Please verify your email.',
                [{ text: 'OK', onPress: () => navigation.navigate('verify-email') }]
            );
        } else {
            Alert.alert(error);
        }
    };

    const navigateToLogin = () => {
        navigation.navigate('login');
    };

    return (
        <KeyboardAvoidingView
            className={`flex-1 ${styles.bg.primary}`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView className="flex-grow">
                <View className="flex-1 justify-center px-5 min-h-full">
                    <Text className={`text-3xl font-bold text-center mb-2 ${styles.text.primary}`}>Create Account</Text>
                    <Text className={`text-base text-center mb-10 ${styles.text.secondary}`}>Join us on your spiritual journey</Text>

                    <View className="w-full">
                        <TextInput
                            className={`${styles.input} border rounded-lg p-4 mb-4 text-base`}
                            placeholder="Full Name"
                            placeholderTextColor={colors.textSecondary}
                            value={firstName}
                            onChangeText={setFirstName}
                            autoCapitalize="words"
                            autoCorrect={false}
                        />

                        <TextInput
                            className={`${styles.input} border rounded-lg p-4 mb-4 text-base`}
                            placeholder="Full Name"
                            placeholderTextColor={colors.textSecondary}
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize="words"
                            autoCorrect={false}
                        />

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

                        <TextInput
                            className={`${styles.input} border rounded-lg p-4 mb-4 text-base`}
                            placeholder="Confirm Password"
                            placeholderTextColor={colors.textSecondary}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />

                        <TouchableOpacity
                            className={`${loading ? 'bg-gray-400' : styles.button.primary} p-4 rounded-lg items-center mt-2`}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="text-white text-base font-semibold">Create Account</Text>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-5">
                            <Text className={`text-base ${styles.text.secondary}`}>Already have an account? </Text>
                            <TouchableOpacity onPress={navigateToLogin}>
                                <Text className={`text-base ${styles.text.accent} font-semibold`}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}