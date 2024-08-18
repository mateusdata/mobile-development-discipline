import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes/Routes';
import AuthProvider from './src/context/AuthContext';
import { TamaguiProvider } from 'tamagui';
import config from "./tamagui.config"
import { useFonts } from 'expo-font';
import ButtonSheetPrivider from './src/context/BottomSheetContex';

export default function App() {
  const [tamaguiLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const [fontsLoaded] = useFonts({});

  if (!fontsLoaded || !tamaguiLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <TamaguiProvider config={config} >
          <ButtonSheetPrivider>
            <AuthProvider>
              <Routes />
            </AuthProvider >
          </ButtonSheetPrivider>
        </TamaguiProvider>

      </NavigationContainer>
    </>
  );
}
