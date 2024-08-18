import React from 'react'
import { Text, View } from 'react-native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import SignIn from '../../screens/SignIn';
import PreeSigin from '../../screens/PreeSigin';
import CreateUser from '../../screens/CreateUser';
import { colorPrimary } from '../../constants/constants';
const Stack = createStackNavigator();

export default function PublicRoutes() {
    return (
        <Stack.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: colorPrimary,
            },
            
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>


            <Stack.Screen name="PreeSigin" options={{ headerTitle: "", headerShown:false }} component={PreeSigin} />
            <Stack.Screen name="SigIn" options={{ headerTitle: "", headerShown:false  }} component={SignIn} />
            <Stack.Screen name="CreateUser" options={{ headerTitle: "" }} component={CreateUser} />


        </Stack.Navigator>
    )
}
