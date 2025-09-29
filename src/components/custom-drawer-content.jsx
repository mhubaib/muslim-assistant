import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../context/theme-context';
import { useAuth } from '../context/auth-context';

export default function CustomDrawerContent(props) {
    const { colors } = useTheme();
    const { user, signOut } = useAuth();

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result = await signOut();
                            if (result.success) {
                                console.log('User signed out successfully');
                                // AppNavigator will automatically redirect to AuthNavigator
                            } else {
                                Alert.alert('Logout Error', result.error || 'Failed to logout');
                            }
                        } catch (err) {
                            console.error('Logout error:', err);
                            Alert.alert('Logout Error', err.message || 'Something went wrong');
                        }
                    }
                }
            ]
        );
    };

    const getDisplayName = () => {
        if (user?.displayName) {
            return user.displayName;
        }
        if (user?.email) {
            return user.email.split('@')[0]; // Use email username part
        }
        return 'User';
    };

    const getInitials = () => {
        const name = getDisplayName();
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <View className="flex-1" style={{ backgroundColor: colors.surface }}>
            {/* Header Section with Profile */}
            <View 
                className="pt-12 pb-4 px-4 border-b"
                style={{ 
                    backgroundColor: colors.primary,
                    borderBottomColor: colors.border
                }}
            >
                {/* Profile Picture */}
                <View className="flex-row items-center mb-2">
                    <View 
                        className="w-16 h-16 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: colors.surface }}
                    >
                        {user?.photoURL ? (
                            <Image 
                                source={{ uri: user.photoURL }}
                                className="w-16 h-16 rounded-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <Text 
                                className="text-xl font-bold"
                                style={{ color: colors.primary }}
                            >
                                {getInitials()}
                            </Text>
                        )}
                    </View>
                    
                    {/* User Info */}
                    <View className="flex-1">
                        <Text 
                            className="text-lg font-bold"
                            style={{ color: colors.text }}
                        >
                            {getDisplayName()}
                        </Text>
                        <Text 
                            className="text-sm opacity-80"
                            style={{ color: colors.textSecondary }}
                        >
                            {user?.email || 'No email'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Drawer Items */}
            <DrawerContentScrollView 
                {...props}
                contentContainerStyle={{ paddingTop: 20 }}
                style={{ backgroundColor: colors.surface }}
            >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Footer with Logout Button */}
            <View 
                className="p-4 px-6 border-t"
                style={{ 
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border
                }}
            >
                <TouchableOpacity
                    className="flex-row items-center py-3 px-4 rounded-lg"
                    style={{ backgroundColor: colors.background }}
                    onPress={handleLogout}
                    activeOpacity={0.7}
                >
                    <MaterialIcons 
                        name="logout" 
                        size={24} 
                        color={colors.error} 
                        style={{ marginHorizontal: 12 }}
                    />
                    <Text 
                        className="text-lg font-bold"
                        style={{ color: colors.error }}
                    >
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}