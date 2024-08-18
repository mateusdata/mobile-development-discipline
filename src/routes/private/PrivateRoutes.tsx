import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; // Importando os ícones
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Feed from '../../screens/Feed';
import { colorPrimary } from '../../constants/constants';

const Tab = createBottomTabNavigator();

export default function PrivateRoutes() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTintColor: 'black',
                headerStyle: {
                    backgroundColor: 'white',
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName: any = "";

                    if (route.name === 'Feed') {
                        iconName = 'home'; // Ícone para o Feed
                    } else if (route.name === 'Home') {
                        iconName = 'search1'; // Ícone para Home
                    } else if (route.name === 'Profile') {
                        iconName = 'user'; // Ícone para o Profile
                    }
                    else if (route.name === 'Added') {
                        iconName = 'plus'; // Ícone para Added
                    }
                    else if (route.name === 'Heart') {
                        iconName = 'hearto'; // Ícone para Heart
                    }

                    // Retorna o ícone baseado na rota atual
                    return <AntDesign name={iconName} size={30} color={color} />; // Aumenta o tamanho dos ícones
                },
                tabBarShowLabel: false, // Remove os nomes das rotas e exibe só os ícones
                tabBarActiveTintColor: colorPrimary,
                tabBarInactiveTintColor: 'gray', // Corrigido para 'gray'
                tabBarStyle: {
                    height: 55, // Aumenta o tamanho da tabBar
                    paddingBottom: 5, // Adiciona um pouco de padding na parte inferior
                },
            })}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Added" component={Home} />
            <Tab.Screen name="Heart" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
