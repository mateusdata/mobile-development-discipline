import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { colorPrimary } from '../constants/constants'

export default function LoadingComponent() {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <StatusBar style="auto" />

            <ActivityIndicator size={40} color={colorPrimary} />
        </View>
    )
}
