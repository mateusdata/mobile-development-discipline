import React from 'react'
import { Text, View } from 'react-native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import SignIn from '../../screens/SignIn';
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
            <Stack.Screen name="Home" options={{headerTitle:""}} component={SignIn} />
            
        </Stack.Navigator>
    )
}
