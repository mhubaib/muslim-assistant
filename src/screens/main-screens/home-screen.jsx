import { Text, View, } from "react-native";
import { Button } from "@react-navigation/elements";
import { useTheme } from "../../context/ThemeContext";

export default function HomeScreen() {
    const { styles } = useTheme();
    
    return (
        <View className={`${styles.bg.primary} flex-1 justify-center items-center`}>
            <Text className={`${styles.text.primary} text-xl font-semibold`}>Home Screen</Text>
            <Button className='mt-2'>Go to details</Button>
        </View>
    )   
}