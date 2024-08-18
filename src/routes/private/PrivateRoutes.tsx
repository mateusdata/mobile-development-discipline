import React from 'react'
import { Text, View } from 'react-native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function PrivateRoutes() {
    return (
        <Tab.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: "#407AFF",
            },
        }}>
            <Tab.Screen name="Home" component={Home} />
            
        </Tab.Navigator>
    )
}
