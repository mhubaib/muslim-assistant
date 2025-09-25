import { Header } from "@react-navigation/elements";

export default function MyHeader({ title }) {
    return (
        <Header title={title} headerStyle={{ backgroundColor: '#00a6fb' }} />
    )
}