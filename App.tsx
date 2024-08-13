import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes/Routes';
import AuthProvider from './src/context/AuthContext';


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider >
      </NavigationContainer>
    </>
  );
}
