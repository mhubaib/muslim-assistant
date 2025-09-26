import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function HomeScreen({ navigation }) {
    const { styles, colors } = useTheme();

    return (
        <View className={`flex-1 justify-center items-center`} style={{ backgroundColor: colors.surface }}>
            <Text className={`${styles.text.primary} text-xl font-semibold mb-8`}>
                Welcome to Muslim Assistant
            </Text>
            <Text className={`${styles.text.secondary} text-center px-8`}>
                Navigate through the drawer menu to explore Al-Quran, Hadist, Doa, and more.
            </Text>
        </View>
    )
}