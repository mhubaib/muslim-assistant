import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabNavigator from "./main-tab-navigator";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={MainTabNavigator} />
        </Drawer.Navigator>
    )
}