import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/theme-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const CustomButton = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, text
    size = 'small', // small, medium, large
    disabled = false,
    loading = false,
    style,
    textStyle,
    icon,
    fullWidth = false,
    sizeIcon = 24,
    ...props
}) => {
    const { colors } = useTheme();

    const getButtonStyle = () => {
        const baseStyle = {
            ...styles.button,
            ...styles[size],
        };

        if (fullWidth) {
            baseStyle.width = '100%';
        }

        switch (variant) {
            case 'primary':
                return {
                    ...baseStyle,
                    backgroundColor: disabled ? colors.button.disabled : colors.button.background,
                    shadowRadius: 4,
                    elevation: disabled ? 0 : 3,
                };
            case 'secondary':
                return {
                    ...baseStyle,
                    backgroundColor: disabled ? colors.bg.secondary : colors.bg.secondary,
                    borderWidth: 1,
                    borderColor: disabled ? colors.border.secondary : colors.border.primary,
                };
            case 'outline':
                return {
                    ...baseStyle,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: disabled ? colors.border.secondary : colors.button.background,
                };
            case 'text':
                return {
                    ...baseStyle,
                    backgroundColor: 'transparent',
                    elevation: 0,
                };
            default:
                return baseStyle;
        }
    };

    const getTextStyle = () => {
        const baseTextStyle = {
            ...styles.buttonText,
            ...styles[`${size}Text`],
        };

        switch (variant) {
            case 'primary':
                return {
                    ...baseTextStyle,
                    color: disabled ? colors.text.disabled : colors.button.text,
                };
            case 'secondary':
                return {
                    ...baseTextStyle,
                    color: disabled ? colors.text.disabled : colors.text.primary,
                };
            case 'outline':
                return {
                    ...baseTextStyle,
                    color: disabled ? colors.text.disabled : colors.button.background,
                };
            case 'text':
                return {
                    ...baseTextStyle,
                    color: disabled ? colors.text.disabled : colors.text.accent,
                };
            default:
                return baseTextStyle;
        }
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    size={size === 'small' ? 'small' : 'small'}
                    color={variant === 'primary' ? colors.button.text : colors.button.background}
                />
            ) : (
                <>
                    {icon && (
                        <MaterialIcons name={icon} size={sizeIcon} />
                    )}
                    <Text style={[getTextStyle(), textStyle]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    // Size variants
    small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        minHeight: 38,
    },
    medium: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        minHeight: 46,
    },
    large: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        minHeight: 54,
    },
    // Text styles
    buttonText: {
        fontWeight: '600',
        textAlign: 'center',
    },
    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },
});

export default CustomButton;