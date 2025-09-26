import { Switch, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

export default function HomeScreen({ navigation }) {
    const { styles, isDark, toggleTheme } = useTheme();
    const [isEnabled, setIsEnabled] = useState(isDark);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        toggleTheme();
    };

    return (
        <View className={`flex-1 justify-center items-center ${styles.bg.primary}`}>
            <Text className={`${styles.text.primary} text-xl font-semibold mb-8`}>
                Welcome to Muslim Assistant
            </Text>
            <Text className={`${styles.text.secondary} text-center px-8`}>
                Navigate through the drawer menu to explore Al-Quran, Hadist, Doa, and more.
            </Text>
            <Switch
                trackColor={{ false: isDark ? '#374151' : '#d1d5db', true: isDark ? '#065f46' : '#10b981' }}
                thumbColor={isDark ? '#d1fae5' : '#ecfdf5'}
                ios_backgroundColor={isDark ? '#374151' : '#d1d5db'}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}