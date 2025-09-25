import { enableScreens } from 'react-native-screens';
import './global.css';
import AppNavigator from './src/navigations/app-navigator';
import { AuthProvider } from './src/context/AuthContext';

enableScreens()

function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
