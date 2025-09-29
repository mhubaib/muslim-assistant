import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
} from 'react-native';
import { useTheme } from '../../../context/theme-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AuthLayout({ children }) {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, padding: 20 }}
                contentContainerStyle={styles.scrollContent}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                extraScrollHeight={40}
            >
                <View style={styles.imageContainer}>
                    <View style={[styles.image, { backgroundColor: colors.card.background }]}>
                        <Image source={require('../../../assets/muslim-app-logo.png')} style={styles.imageText} />
                    </View>
                </View>
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 110,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    imageText: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
})