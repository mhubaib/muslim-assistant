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
import { useAuth } from '../../context/auth-context';
import { useTheme } from '../../context/theme-context';
import { StyleSheet, Image } from 'react-native';
import Input from '../../components/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from './layouts/auth-layout';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { signUp, loading, error } = useAuth();
    const { colors } = useTheme();

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
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg.primary }]}>
            <AuthLayout>
                <Input label={"FirstName :"} placeholder={"firstname..."} />
                <Input label={"LastName :"} />
                <Input />
                <Input />
            </AuthLayout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
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
})