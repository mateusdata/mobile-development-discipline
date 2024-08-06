import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import Contact from './src/pages/Contact';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#407AFF"
          },
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Contacts" options={{
            title: "Novo Contato",
          }} component={Contact} />
        </Stack.Navigator>
      </NavigationContainer></>
  );
}
