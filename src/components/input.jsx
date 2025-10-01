import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/theme-context";
import { useState } from "react";
import FontAwesome from "@react-native-vector-icons/fontawesome";


export default function Input({ label, rightIcon, name, placeholder, type, value, onChangeText }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const { colors } = useTheme();
    const isPassword = type === 'password';
    const secureTextEntry = isPassword && isPasswordVisible;
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }   


    const styles = StyleSheet.create({
        container: {
            paddingVertical: 8,
        },
        label: {
            fontSize: 16,
            fontWeight: '400',
            color: colors.text.primary,
            marginBottom: 10,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 45,
            borderWidth: 1,
            borderColor: colors.border.primary,
            borderRadius: 8,
            paddingHorizontal: 10,
            backgroundColor: colors.bg.secondary,
        },
        input: {
            flex: 1,
            height: 40,
            fontSize: 16,
        }, 
        icon: {
            marginLeft: 10,
            color: colors.text.secondary,
        },
        rightIcon: {
            marginRight: 10,
            color: colors.text.secondary,
        }
    })

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
            <View style={styles.inputContainer}>
                {rightIcon && (
                    <FontAwesome name={name} size={24} style={styles.rightIcon} />
                )}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                />
                {isPassword && (
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                        <FontAwesome name={isPasswordVisible ? 'eye-slash' : 'eye'} size={24} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
