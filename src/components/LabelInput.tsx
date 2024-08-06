import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function LabelInput({value}:{value: string}) {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding:3
    },
    label:{
        fontSize:16,
        bottom:5,
        right:3
    }
   
  });
  