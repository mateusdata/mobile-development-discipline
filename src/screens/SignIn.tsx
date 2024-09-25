import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet, Image, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import LabelInput from '../components/LabelInput';
import * as  Animatable from "react-native-animatable"
import { AuthContext } from '../context/AuthContext';
import { colorPrimary } from '../constants/constants';
import ErrorMessage from '../components/ErrorMessage';
import { Gradient } from '../components/Gradient';
import { FormatUser } from '../interfaces';
import { api } from '../config/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignIn = ({ navigation }: any) => {
    const { setUser, user } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false)


    const schema = yup.object({
        login: yup
            .string()
            .required('Obrigatório')
            .max(40, 'O tamanho máximo do texto é 40 caracteres'),


        password: yup
            .string()
            .required('Obrigatório')
            .max(40, 'O tamanho máximo do texto é 40 caracteres')
            .min(0, 'Informe uma senha maior'),
    }).required();

    const { watch, handleSubmit, setError, trigger, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            login: "",
            password: ""
        },
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });



    const onSubmit = async (data: FormatUser) => {

        try {
            setLoading(true)
            const response = await api.post("/sessions", data)
            await AsyncStorage.setItem("accessToken", response?.data?.token)
            const userName = await api.get(`/users/${response.data?.user_login}`)

            const userData = {
                ...response.data,
                name: userName.data.name
            };


            setUser(userData)
            await AsyncStorage.setItem("user", JSON.stringify(userData))
            setLoading(false)
            console.log(userData);

        } catch (error) {
            console.log(error);
            setLoading(false)
            setError('login', {})
            setError('password', { message: "Ocorreu um error interno" })
        }
    };

    return (
        <View style={styles.container}>
            <Gradient />

            <Animatable.View style={styles.titleContainer}>
                <Text style={styles.titleText}>Bem-vindo de volta</Text>
                <Animatable.Image
                    style={styles.image}
                    resizeMode='center'
                    resizeMethod='scale'
                    source={require("../assets/images/img1.jpeg")}
                />
            </Animatable.View>

            <View style={styles.formContainer}>

                {false && <LabelInput value='login' />}
                <Controller control={control}
                    render={({ field: { onChange, onBlur, value, } }) => (
                        <TextInput
                            mode="outlined"
                            label={"login"}
                            autoCorrect={false}
                            outlineColor={errors?.password ? "red" : "gray"}
                            activeOutlineColor={errors?.login ? "red" : colorPrimary}
                            error={!!errors.login}
                            onBlur={onBlur} onChangeText={onChange} value={value}
                        />
                    )}
                    name="login"
                />

                <ErrorMessage name={"login"} errors={errors} mt={5} mb={2} />

                {false && <LabelInput value='Senha' />}
                <Controller control={control}
                    render={({ field: { onChange, onBlur, value, } }) => (
                        <TextInput
                            mode="outlined"
                            label={"Senha"}
                            autoCorrect={false}
                            outlineColor={errors?.password ? "red" : "gray"}
                            activeOutlineColor={errors?.password ? "red" : colorPrimary}
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
                    <Text style={{ color: "gray" }}>Não tem uma conta?</Text>
                    <Pressable onPress={() => navigation.navigate("CreateUser")}>
                        <Text style={{ color: "#407AFF" }}>Criar conta</Text>
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
        backgroundColor: "white"
    },
    titleContainer: {
        marginTop: 50,

        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
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

        borderRadius: 5,
        padding: 5,
        marginTop: 15,
    },
    buttonText: {
        color: '#f4f4f4',
        fontWeight: 'bold',
        fontSize: 17
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 80
    }
});

export default SignIn;