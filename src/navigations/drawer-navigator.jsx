import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabNavigator from "./main-tab-navigator";
import QuranScreen from "../screens/quran/quran-screen";
import { useTheme } from "../context/ThemeContext";
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CustomDrawerContent from '../components/custom-drawer-content';
import HadistScreen from "../screens/hadist/hadist-screen";
import DoaScreen from "../screens/doa/doa-screen";
import ProfileScreen from "../screens/profile-screen";
import AboutScreen from "../screens/about-screen";
import SettingScreen from "../screens/setting-screen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const { colors, isDark } = useTheme();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                // Header styling
                headerStyle: {
                    backgroundColor: colors.primary,
                    elevation: 4, // Android shadow
                    shadowColor: '#000', // iOS shadow
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                },
                headerTintColor: colors.text, // Icon and text color
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: isDark ? colors.text : '#ffffff',
                },
                // Drawer icon styling
                drawerIcon: ({ focused, color, size }) => (
                    <MaterialIcons
                        name="menu"
                        size={size}
                        color={focused ? colors.primary : color}
                    />
                ),
                // Drawer styling
                drawerStyle: {
                    backgroundColor: colors.surface,
                    width: 280,
                },
                drawerContentStyle: {
                    marginTop: 50,
                    backgroundColor: colors.surface,
                },
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: colors.textSecondary,
                drawerActiveBackgroundColor: isDark ? colors.background : colors.border,
                drawerLabelStyle: {
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 4, // Adjust spacing from icon
                },
                drawerItemStyle: {
                    borderRadius: 16,
                    marginVertical: 6,
                    marginHorizontal: 0,
                },
            }}
        >
            <Drawer.Screen
                name="home"
                component={MainTabNavigator}
                options={{
                    title: 'Dashboard',
                    drawerIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                            name="dashboard"
                            size={size}
                            color={focused ? colors.primary : color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="quran"
                component={QuranScreen}
                options={{
                    title: 'Al-Quran',
                    drawerIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                            name="auto-stories"
                            size={size}
                            color={focused ? colors.primary : color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="hadist"
                component={HadistScreen}
                options={{
                    title: 'Hadist Pilihan',
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialIcons
                            name="book"
                            size={size}
                            color={focused ? colors.primary : color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="doa"
                component={DoaScreen}
                options={{
                    title: 'Doa Pilihan',
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialIcons
                            name="menu-book"
                            size={size}
                            color={focused ? colors.primary : color}
                        />
                    ),
                }}

            />
            <Drawer.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialIcons
                            name="manage-accounts"
                            size={size}
                            color={focused ? colors.primary : color}
                        />
                    ),
                }}

            />
            <Drawer.Screen
                name="about"
                component={AboutScreen}
                options={{
                    title: 'About',
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialIcons
                            name="info"
                            size={size}
                            color={focused ? colors.primary : color}
                        />
                    ),
                }}

            />
            <Drawer.Screen
                name="setting"
                component={SettingScreen}
                options={{
                    title: 'Setting',
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialIcons
                            name="settings"
                            size={size}
                            color={focused ? colors.primary : color}
                        />
                    ),
                }}

            />
        </Drawer.Navigator>
    )
}