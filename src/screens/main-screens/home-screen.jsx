import { Text, View, } from "react-native";
import { Button } from "@react-navigation/elements";

export default function HomeScreen() {
    return (
        <View className="bg-white flex-1 justify-center items-center">
            <Text>Home Screen</Text>
            <Button className='mt-2'>Go to details</Button>
        </View>
    )   
}