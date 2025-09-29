import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigations/app-navigator';
import { AuthProvider } from './src/context/auth-context';
import { ThemeProvider } from './src/context/theme-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens()

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
