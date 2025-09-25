import { enableScreens } from 'react-native-screens';
import './global.css';
import AppNavigator from './src/navigations/app-navigator';

enableScreens()

function App() {

  return (
    <AppNavigator />
  );
}

export default App;
