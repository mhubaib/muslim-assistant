import { Header } from "@react-navigation/elements";
import { useTheme } from "../context/ThemeContext";

export default function MyHeader({ title }) {
    const { colors } = useTheme();

    return (
        <Header
            title={title}
            headerStyle={{ backgroundColor: colors.primary }}
            headerTitleStyle={{ color: 'white' }}
        />
    )
}