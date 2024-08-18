import React from 'react'
import { Text, View } from 'react-native'

const HeaderSheet = () => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{
                height: 4, width: 36,
                backgroundColor: "#606060", borderRadius: 15, marginTop: 10
            }}
            >
            </Text>
        </View>
    )
}

export default HeaderSheet
