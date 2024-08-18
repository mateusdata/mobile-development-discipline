import React from 'react';
import { Image, Text, Pressable, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as  Animatable from "react-native-animatable"
import { colorPrimary, colorRed } from '../constants/constants';
import { Gradient } from '../components/Gradient';


const PreeSigin = ({ navigation }: any) => {
//    const { closeBottomSheet, openBottomSheet  } = useContext(ContextSheet)

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#F5F7FF", }}>
            <StatusBar animated hideTransitionAnimation='fade' style='light' />

        
            <Animatable.Image animation={"fadeInRight"} style={{ flex: 0.5, width: "100%", top:10 }}
                source={require("../assets/images/img1.jpeg")} />

            <View style={{ flex: 0.6, justifyContent: "flex-start", width: "100%", alignItems: "center" }}>
               <Gradient/>
                <View style={{ width: "80%", gap: 5, marginTop: 0 }}>

                    <Animatable.View animation="fadeInLeft">
                        <Text style={{ color: "#3b3d3d", fontSize: 25, textAlign: "center", paddingTop: 15 }}>
                            Conecte-se com o melhor no Papacapim.
                        </Text>


                    </Animatable.View>

                    <Animatable.View animation="fadeInRight">
                        <Text style={{ fontSize: 16, textAlign: "center" }}>
                            Conecte-se e compartilhe experiências únicas com Papacapim.
                        </Text>

                    </Animatable.View>

                </View>
                <View style={{ width: "90%", marginTop: 10, gap: 5 }} >
                    <View style={{ padding: 0 }}>
                        <Button textColor='white' mode='contained-tonal' onPress={() => navigation.navigate("SigIn")}
                            style={[styles.button, { backgroundColor: colorPrimary }]}>
                            Login
                        </Button>

                    </View>
                    <Button mode='contained-tonal' onPress={() => navigation.navigate("CreateUser")}
                        style={[styles.button]}>
                        Criar conta
                    </Button>


                </View>
            </View>
        </View>
    );

}

export default PreeSigin
const styles = StyleSheet.create({
    button: {
        borderColor: "#daebf2",
        backgroundColor: "#ECF2FF",
        padding: 2,
        borderWidth: 1,
        marginTop: 6
    }
})