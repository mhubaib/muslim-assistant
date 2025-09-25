import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabNavigator from "./main-tab-navigator";
import QuranScreen from "../screens/quran/quran-screen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={MainTabNavigator} />
            <Drawer.Screen name="Quran" component={QuranScreen} />
        </Drawer.Navigator>
    )
}