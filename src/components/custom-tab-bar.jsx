import { useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }) {
    const { colors } = useTheme();
    const tabWidth = width / state.routes.length;

    // Animated indicator that slides between tabs
    const animatedIndicator = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(animatedIndicator, {
            toValue: state.index,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
        }).start();
    }, [state.index]);

    const getTabBarIcon = (routeName) => {
        switch (routeName) {
            case 'home':
                return 'home';
            case 'prayer-times':
                return 'alarm';
            case 'calender':
                return 'event-note';
            case 'qiblat':
                return 'location-pin';
            default:
                return 'help';
        }
    };

    const getTabLabel = (routeName) => {
        switch (routeName) {
            case 'home':
                return 'Home';
            case 'prayer-times':
                return 'Prayer';
            case 'calender':
                return 'Calendar';
            case 'qiblat':
                return 'Qiblat';
            default:
                return 'Tab';
        }
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: colors.surface,
                paddingVertical: 8,
                paddingBottom: 12,
                borderTopWidth: 0.5,
                borderTopColor: colors.border,
                elevation: 12,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: -3,
                },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                position: 'relative',
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <CustomTabBarButton
                        key={route.key}
                        isFocused={isFocused}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        iconName={getTabBarIcon(route.name)}
                        label={getTabLabel(route.name)}
                        colors={colors}
                        tabWidth={tabWidth}
                    />
                );
            })}
        </View>
    );
}

// Individual animated tab button component
const CustomTabBarButton = ({
    isFocused,
    onPress,
    onLongPress,
    iconName,
    label,
    colors,
}) => {
    const animatedScale = useRef(new Animated.Value(1)).current;
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    const animatedIconScale = useRef(new Animated.Value(1)).current;
    const animatedTranslateY = useRef(new Animated.Value(0)).current;
    const animatedBackgroundScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Scale animation for the entire button
        Animated.spring(animatedScale, {
            toValue: isFocused ? 1.1 : 1,
            tension: 100,
            friction: 6,
            useNativeDriver: true,
        }).start();

        // Opacity animation for the label (fade in/out)
        Animated.timing(animatedOpacity, {
            toValue: isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        // Translate Y animation for floating effect
        Animated.spring(animatedTranslateY, {
            toValue: isFocused ? -2 : 0,
            tension: 100,
            friction: 6,
            useNativeDriver: true,
        }).start();

        // Background circle animation
        Animated.spring(animatedBackgroundScale, {
            toValue: isFocused ? 1 : 0,
            tension: 100,
            friction: 4,
            useNativeDriver: true,
        }).start();

        // Icon bounce animation
        if (isFocused) {
            Animated.sequence([
                Animated.timing(animatedIconScale, {
                    toValue: 0.8,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.spring(animatedIconScale, {
                    toValue: 1.1,
                    tension: 100,
                    friction: 3,
                    useNativeDriver: true,
                }),
                Animated.spring(animatedIconScale, {
                    toValue: 1,
                    tension: 100,
                    friction: 4,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.spring(animatedIconScale, {
                toValue: 1,
                tension: 100,
                friction: 4,
                useNativeDriver: true,
            }).start();
        }
    }, [isFocused]);

    const handlePress = () => {
        // Add a subtle press animation with haptic feedback
        Animated.sequence([
            Animated.timing(animatedScale, {
                toValue: 0.95,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.spring(animatedScale, {
                toValue: isFocused ? 1.1 : 1,
                tension: 100,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        onPress();
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            onLongPress={onLongPress}
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
            }}
            activeOpacity={0.8}
        >
            <Animated.View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [
                        { scale: animatedScale },
                        { translateY: animatedTranslateY }
                    ],
                }}
            >
                {/* Animated background circle for active state */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        width: 50,
                        height: 50,
                        borderRadius: 28,
                        backgroundColor: colors.primary,
                        opacity: 0.08,
                        transform: [{ scale: animatedBackgroundScale }],
                    }}
                />

                {/* Icon with enhanced animation */}
                <Animated.View
                    style={{
                        transform: [{ scale: animatedIconScale }],
                        marginBottom: 2,
                    }}
                >
                    <MaterialIcons
                        name={iconName}
                        size={26}
                        color={isFocused ? colors.primary : colors.textSecondary}
                        style={{
                            textShadowColor: isFocused ? colors.primary : 'transparent',
                            textShadowOffset: { width: 0, height: 0 },
                            textShadowRadius: isFocused ? 4 : 0,
                        }}
                    />
                </Animated.View>

                {/* Animated label that fades in/out with slide effect */}
                <Animated.Text
                    style={{
                        fontSize: 10,
                        fontWeight: isFocused ? '700' : '500',
                        color: isFocused ? colors.primary : colors.textSecondary,
                        opacity: animatedOpacity,
                        position: 'absolute',
                        bottom: -15,
                        textAlign: 'center',
                        transform: [
                            {
                                translateY: animatedOpacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [5, 0],
                                })
                            }
                        ],
                    }}
                >
                    {label}
                </Animated.Text>

                {/* Active indicator dot with pulse animation */}
                {isFocused && (
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: -4,
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: colors.primary,
                            opacity: animatedOpacity,
                            transform: [
                                {
                                    scale: animatedOpacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    })
                                }
                            ],
                        }}
                    />
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};