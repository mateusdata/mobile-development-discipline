import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Feed from '../../screens/Feed';
import { colorPrimary } from '../../constants/constants';
import Account from '../../screens/Account';
import { StatusBar } from 'expo-status-bar';
import SeachUsers from '../../screens/SeachUsers';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <>
      <StatusBar animated hideTransitionAnimation='fade' style='dark' />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: colorPrimary,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: any = "";

            if (route.name === 'Feed') {
              iconName = 'home';
            } else if (route.name === 'Home') {
              iconName = 'search1';
            } else if (route.name === 'Account') {
              iconName = 'user';
            }
            else if (route.name === 'Added') {
              iconName = 'plus';
            }
            else if (route.name === 'Heart') {
              iconName = 'hearto';
            }
            else if (route.name === 'Seach') {
              iconName = 'search1';
            }


            return <AntDesign name={iconName} size={30} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: colorPrimary,
          tabBarInactiveTintColor: 'gray',

        })}
      >
        <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Tab.Screen name="Seach" component={SeachUsers} options={{ 
          headerShown: true, 
          headerStyle:{
            backgroundColor:"white"
          }, 
         
          }} />

        <Tab.Screen name="Account" component={Account} options={{
          headerStyle: {
            backgroundColor: "#fff2",
          },
          headerTitle: "Minha conta",
          headerTitleAlign: "center",
        }} />



      </Tab.Navigator>
    </>

  );
}
