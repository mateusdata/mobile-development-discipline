import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function LoadingComponent() {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <StatusBar style="auto" />

            <ActivityIndicator color={"blue"} size={50} />
        </View>
    )
}
