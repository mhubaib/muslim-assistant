import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/main-screens/home-screen'
import PrayerTimesScreen from '../screens/main-screens/prayer-times-screen'
import CalenderScreen from '../screens/main-screens/calender-screen'
import QiblatScreen from '../screens/main-screens/qiblat-screen'
import { useTheme } from '../context/theme-context'
import CustomTabBar from '../components/custom-tab-bar'

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is open
            }}
        >
            <Tab.Screen
                name='home'
                component={HomeScreen}
                options={{
                    title: 'Home'
                }}
            />
            <Tab.Screen
                name='prayer-times'
                component={PrayerTimesScreen}
                options={{
                    title: 'Prayer Times'
                }}
            />
            <Tab.Screen
                name='calender'
                component={CalenderScreen}
                options={{
                    title: 'Calendar'
                }}
            />
            <Tab.Screen
                name='qiblat'
                component={QiblatScreen}
                options={{
                    title: 'Qiblat'
                }}
            />
        </Tab.Navigator>
    )
}