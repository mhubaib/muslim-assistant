import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/main-screens/home-screen'
import PrayerTimesScreen from '../screens/main-screens/prayer-times-screen'
import CalenderScreen from '../screens/main-screens/calender-screen'
import QiblatScreen from '../screens/main-screens/qiblat-screen'
import MaterialIcons from '@react-native-vector-icons/material-icons'

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
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: getTabBarIcon(route.name),
                tabBarActiveTintColor: '#00a6fb', 
                tabBarInactiveTintColor: '#9E9E9E', 
                tabBarStyle: {
                    backgroundColor: '#FFFFFF', 
                    borderTopWidth: 1,
                    borderTopColor: '#E0E0E0',
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
                },
                tabBarIconStyle: {
                    marginTop: 5,
                },
                headerShown: false,
            })}>
            <Tab.Screen name='home' component={HomeScreen} />
            <Tab.Screen name='prayer-times' component={PrayerTimesScreen} />
            <Tab.Screen name='calender' component={CalenderScreen} />
            <Tab.Screen name='qiblat' component={QiblatScreen} />
        </Tab.Navigator>
    )
}