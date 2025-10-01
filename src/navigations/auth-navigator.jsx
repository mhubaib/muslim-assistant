import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { useEffect } from "react";
import LoginScreen from "../screens/auth/login-screen";
import RegisterScreen from "../screens/auth/register-screen";
import { useAuth } from "../context/auth-context";

enableScreens();

const AuthStack = createNativeStackNavigator();

export default function AuthNavigator() {
    const { navigateToRegister, setNavigateToRegister } = useAuth();

    useEffect(() => {
        if (navigateToRegister) {
            setNavigateToRegister(false);
        }
    }, [navigateToRegister, setNavigateToRegister]);

    return (
        <AuthStack.Navigator initialRouteName={navigateToRegister ? 'register' : 'login'}>
            <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}
