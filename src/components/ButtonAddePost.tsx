import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { colorPrimary } from '../constants/constants';

export default function ButtonAddPost() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("CreatePost")} style={styles.button}>
                <AntDesign name="plus" size={24} color="white" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1000,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});
