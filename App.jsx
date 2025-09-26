import { enableScreens } from 'react-native-screens';
import './global.css';
import AppNavigator from './src/navigations/app-navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

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
