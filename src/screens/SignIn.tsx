import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet, Image, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config/Api';
import { LinearGradient } from 'expo-linear-gradient';
import { styleGradient } from '../style/styleGradient';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import LabelInput from '../components/LabelInput';
import * as  Animatable from "react-native-animatable"
import { AuthContext } from '../context/AuthContext';
import { colorPrimary, colorSecundary } from '../constanst/constans';
import ErrorMessage from '../components/ErrorMessage';


const SignIn = ({ navigation }: any) => {
    const { setUser, user } = useContext(AuthContext);

    const schema = yup.object({
        email: yup
            .string()
            .transform(value => value.toLowerCase())
            .required('Obrigatório')
            .max(40, 'O tamanho máximo do texto é 40 caracteres')
            .email("Email inválido"),

        password: yup
            .string()
            .required('Obrigatório')
            .max(40, 'O tamanho máximo do texto é 40 caracteres')
            .min(5, 'Informe uma senha maior'),
    }).required();

    const [loading, setLoading] = useState(false);
    const { watch, handleSubmit, setError, trigger, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            email:  "mateuspele2015@gmail.com",
            password:  "123456"
        },
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    

    const onSubmit = async (data: object) => {
      
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[
                    'hsla(205, 100%, 95%, 1)',
                    'hsla(320, 100%, 99%, 1)',
                    'hsla(210, 100%, 97%, 1)',
                    'hsla(205, 100%, 95%, 1)',
                    'hsla(313, 100%, 98%, 1)'
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styleGradient.background}
            />
            <StatusBar animated hideTransitionAnimation='fade' style='light' />

            <Animatable.View style={styles.titleContainer}>
                <Text style={styles.titleText}>Bem-vindo de volta</Text>
            </Animatable.View>

            <View style={styles.formContainer}>

                <LabelInput value='Email' />
                <Controller control={control}
                    render={({ field: { onChange, onBlur, value, } }) => (
                        <TextInput
                            mode="outlined"
                            dense
                            autoCorrect={false}
                            outlineStyle={{ borderWidth: (watch("email") && !errors.email) ? 2 : 2 }}
                            outlineColor={(watch("email") && !errors.email) ? colorSecundary : "gray"}
                            activeOutlineColor={!watch("email") ? colorSecundary : !(errors?.email) ? "green" : "red"}
                            error={!!errors.email} 
                            onBlur={onBlur} onChangeText={onChange} value={value}
                        />
                    )}
                    name="email"
                />

                <ErrorMessage name={"email"} errors={errors} mt={5} mb={2} />

                <LabelInput value='Senha' />
                <Controller control={control}
                    render={({ field: { onChange, onBlur, value, } }) => (
                        <TextInput
                            mode="outlined"
                            dense
                            autoCorrect={false}
                            outlineStyle={{ borderWidth: (watch("password") && !errors.password) ? 2 : 2 }}
                            outlineColor={(watch("password") && !errors.password) ? colorSecundary : "gray"}
                            activeOutlineColor={!watch("password") ? colorSecundary : !(errors?.password) ? "green" : "red"}
                            error={!!errors.password} 
                            onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry
                        />
                    )}
                    name="password"
                />

                <ErrorMessage name={"password"} errors={errors} mt={5} mb={2} />


                <View>
                    <Button
                        mode='contained-tonal'
                        loading={loading}
                        disabled={loading}
                        buttonColor={colorPrimary}
                        textColor='white'
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}>
                        Entrar
                    </Button>
                </View>
                <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                    <Text style={{  color: "gray" }}>Esqueceu sua senha ?</Text>
                    <Pressable onPress={() => navigation.navigate("SendEmail")}>
                        <Text style={{  color: "#407AFF" }}>Recuperar senha</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'flex-start',
        padding: 2,
    },
    titleContainer: {
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: "Poppins_800ExtraBold",
        fontSize: 25,
        marginBottom: 0,
        marginTop: 0,
        color: "#4d4d4f"
    },
    formContainer: {
        
        flex: 1,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        gap: 0
    },
    label: {
        
        color: '#000000',
        marginBottom: 5,
    },
    input: {
        
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        
        //git backgroundColor: '#407AFF',
        borderRadius: 5,
        padding: 5,
        marginTop: 15,
    },
    buttonText: {
        color: '#f4f4f4',
        fontWeight: 'bold',
        fontSize: 17
    },
});

export default SignIn;