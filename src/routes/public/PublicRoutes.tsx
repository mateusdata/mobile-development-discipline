import React from 'react'
import { Text, View } from 'react-native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import Login from '../../screens/Login';
const Stack = createStackNavigator();

export default function PublicRoutes() {
    return (
        <Stack.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: "#407AFF",
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
            <Stack.Screen name="Home" component={Login} />
            
        </Stack.Navigator>
    )
}
