import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import auth from 'firebase/auth';
import { useAuth } from '../../context/auth-context';

export default function VerifyEmailScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        // Check if email is already verified
        if (user?.emailVerified) {
            navigation.navigate('login');
        }
    }, [user, navigation]);

    const resendVerificationEmail = async () => {
        try {
            setResendLoading(true);
            const currentUser = auth().currentUser;

            if (currentUser) {
                await currentUser.sendEmailVerification();
                Alert.alert('Success', 'Verification email sent successfully!');
            } else {
                Alert.alert('Error', 'No user found. Please try logging in again.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setResendLoading(false);
        }
    };

    const checkVerificationStatus = async () => {
        try {
            setLoading(true);
            const currentUser = auth().currentUser;

            if (currentUser) {
                await currentUser.reload();

                if (currentUser.emailVerified) {
                    Alert.alert(
                        'Success',
                        'Email verified successfully!',
                        [{ text: 'OK', onPress: () => navigation.navigate('login') }]
                    );
                } else {
                    Alert.alert('Not Verified', 'Please check your email and verify your account.');
                }
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const goBackToLogin = () => {
        navigation.navigate('login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>📧</Text>
                </View>

                <Text style={styles.title}>Verify Your Email</Text>
                <Text style={styles.subtitle}>
                    We've sent a verification email to your address. Please check your email and click the verification link.
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.primaryButton, loading && styles.disabledButton]}
                        onPress={checkVerificationStatus}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.primaryButtonText}>I've Verified</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.secondaryButton, resendLoading && styles.disabledButton]}
                        onPress={resendVerificationEmail}
                        disabled={resendLoading}
                    >
                        {resendLoading ? (
                            <ActivityIndicator color="#4CAF50" />
                        ) : (
                            <Text style={styles.secondaryButtonText}>Resend Email</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={goBackToLogin}
                    >
                        <Text style={styles.linkButtonText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconContainer: {
        marginBottom: 30,
    },
    icon: {
        fontSize: 80,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        width: '80%',
    },
    secondaryButton: {
        borderWidth: 2,
        borderColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        width: '80%',
        backgroundColor: '#ffffff',
    },
    linkButton: {
        padding: 15,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        borderColor: '#cccccc',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButtonText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '600',
    },
    linkButtonText: {
        color: '#666',
        fontSize: 16,
    },
});