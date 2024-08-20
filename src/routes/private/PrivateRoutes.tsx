import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../../screens/Feed';
import Profile from '../../screens/Profile';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { colorPrimary } from '../../constants/constants';
import CreatePost from '../../screens/CreatePost';
const Stack = createStackNavigator();

export default function PrivateRoutes() {
  return (
    <Stack.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle:{
            backgroundColor:"#fff2"
        }
    }}> 
      <Stack.Screen name='Root' component={TabNavigator} options={{
        headerShown:false,
        
      }}/>
      <Stack.Screen name='Profile' component={Profile} options={{
        headerTitle:"Perfil de usuario",
        headerTitleAlign:"center"
      }}/>
      <Stack.Screen name='CreatePost' component={CreatePost}  options={{
        headerTitle:"Novo post",
        headerTitleAlign:"center"
      }}/>

      

    </Stack.Navigator>    
  )
}
