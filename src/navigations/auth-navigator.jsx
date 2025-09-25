import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import LoginScreen from "../screens/auth/login-screen";
import RegisterScreen from "../screens/auth/register-screen";
import VerifyEmailScreen from "../screens/auth/verify-email";

enableScreens();

const AuthStack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="login" component={LoginScreen} />
            <AuthStack.Screen name="register" component={RegisterScreen} />
            <AuthStack.Screen name="verify-email" component={VerifyEmailScreen} />
        </AuthStack.Navigator>
    )
}