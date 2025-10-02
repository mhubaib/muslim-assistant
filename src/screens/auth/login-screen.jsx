import { useState } from 'react';
import {
    Alert,
    StyleSheet,
} from 'react-native';
import { useAuth } from '../../context/auth-context';
import { useTheme } from '../../context/theme-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from './layouts/auth-layout';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loading, error } = useAuth();
    const { colors } = useTheme();

    const handleLogin = async () => {

    };

    const navigateToRegister = () => {
        navigation.navigate('register');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg.primary }]}>
            <AuthLayout>
                <Text style={[styles.title, { color: colors.text.primary }]}>Welcome Back</Text>
            </AuthLayout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
})