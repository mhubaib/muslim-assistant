import { useState } from 'react';
import {
    Alert,
    Text,
} from 'react-native';
import { useAuth } from '../../context/auth-context';
import { useTheme } from '../../context/theme-context';
import { StyleSheet } from 'react-native';
import Input from '../../components/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from './layouts/auth-layout';
import CustomButton from '../../components/button';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const { signUp, loading, error } = useAuth();
    const { colors } = useTheme();

    const handleRegister = async () => {

        const result = await signUp(username, email, password, confirmPassword);

        if (result && result.success) {
            Alert.alert(
                'Success',
                'Account created successfully! Please verify your email.',
                [{ text: 'OK', onPress: () => navigation.navigate('verify-email') }]
            );
        } else {
            Alert.alert(error || 'Registration failed');
        }
    };  


    

    const navigateToLogin = () => {
        navigation.navigate('login');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg.primary }]}>
            <AuthLayout>
                <Text style={[styles.title, { color: colors.text.primary }]}>Create Account</Text>
                <Input label={"Username :"} placeholder={"username..."} value={username} onChangeText={setUsername} />
                <Input label={"Email :"} placeholder={"email@sample.com"} value={email} onChangeText={setEmail} />
                <Input label={"Password :"} placeholder={"********"} type={'password'} value={password} onChangeText={setPassword} />
                <Input label={"Confirm Password :"} placeholder={"********"} type={'password'} value={confirmPassword} onChangeText={setConfirmPassword} />
                <CustomButton onPress={handleRegister} icon={"sign-in"} title={"Create Account"} variant='primary' size='large' fullWidth style={{ marginTop: 16 }} loading={loading} />
            </AuthLayout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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