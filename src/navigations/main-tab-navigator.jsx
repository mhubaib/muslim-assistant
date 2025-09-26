import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/main-screens/home-screen'
import PrayerTimesScreen from '../screens/main-screens/prayer-times-screen'
import CalenderScreen from '../screens/main-screens/calender-screen'
import QiblatScreen from '../screens/main-screens/qiblat-screen'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { useTheme } from '../context/ThemeContext'

const Tab = createBottomTabNavigator()

const getTabBarIcon = (route) => (color) => {
    switch (route) {
        case 'home':
            return <MaterialIcons name='home' size={25} color={color} />
        case 'prayer-times':
            return <MaterialIcons name='alarm' size={25} color={color} />
        case 'calender':
            return <MaterialIcons name='event-note' size={25} color={color} />
        case 'qiblat':
            return <MaterialIcons name='location-pin' size={25} color={color} />
        default:
            return null
    }
}

export default function MainTabNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: getTabBarIcon(route.name),
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.primary,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    height: 65,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    color: colors.text,
                },
                tabBarIconStyle: {
                    marginTop: 5,
                },
                headerShown: false,
            })}>
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