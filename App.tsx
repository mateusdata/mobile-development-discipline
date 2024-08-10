import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes/Routes';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer>
       <Routes/>
      </NavigationContainer></>
  );
}
