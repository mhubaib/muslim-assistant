import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigations/app-navigator';
import { AuthProvider } from './src/context/auth-context';
import { ThemeProvider } from './src/context/theme-context';

enableScreens()

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
