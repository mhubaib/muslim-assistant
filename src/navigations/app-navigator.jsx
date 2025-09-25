import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./auth-navigator";
import DrawerNavigator from "./drawer-navigator";
import OnBoardingScreen from "../screens/onBoarding/on-boarding-screen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='main' component={DrawerNavigator} />
                <Stack.Screen name='on-boarding' component={OnBoardingScreen} />
                <Stack.Screen name='auth' component={AuthNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}