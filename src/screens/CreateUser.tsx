import React, { useContext, useState } from 'react';
import { Text, View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { WelcomeNotification } from '../../utils/WelcomeNotification';
import { AuthContext } from '../context/AuthContext';
import { api } from '../config/Api';
import LabelInput from '../components/LabelInput';
import ErrorMessage from '../components/ErrorMessage';
import { colorPrimary } from '../constants/constants';
import { Gradient } from '../components/Gradient';
import { FormatUser } from '../interfaces';



const CreateUser = ({ navigation }: any) => {

  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    name: yup
      .string()
      .required('Nome é obrigatório'),

    email: yup
      .string()
      .transform(value => value.toLowerCase())
      .required('Obrigatório')
      .max(40, 'O tamanho máximo do texto é 40 caracteres')
      .email('Email inválido'),

    password: yup
      .string()
      .required('Obrigatório')
      .max(40, 'O tamanho máximo do texto é 40 caracteres')
      .min(5, 'Informe uma senha maior'),
  }).required();

  const { watch, reset, handleSubmit, setError, trigger, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: "",
      password: "",
      email: ""
    },
    mode: "onChange",
    resolver: yupResolver(schema)

  });

  const onSubmit = async (data: FormatUser) => {
    
    WelcomeNotification(
      `🎉 Olá, ${data?.name?.split(' ')[0]}!`,
      "Você acaba de dar o primeiro passo em uma jornada incrível na Papacapim. 🚀🌟",
      1
    );
    setUser(data)
};
  return (
    <ScrollView style={styles.container}>
     <Gradient/>
      <View style={styles.contentContainer}>
        
        <View style={styles.inputContainer}>

          {false && <LabelInput value='Nome' />}
          <Controller control={control}
            render={({ field: { onChange, onBlur, value, } }) => (
              <TextInput
                label={"Nome"}
                mode="outlined"
                autoFocus
                activeOutlineColor={colorPrimary}
                error={!!errors.name}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}

            name="name"
          />

          <ErrorMessage name={"nome"} errors={errors} />

          {false && <LabelInput value='Email' />}
          <Controller control={control}
            render={({ field: { onChange, onBlur, value, } }) => (
              <TextInput
                label={"Email"}
                mode="outlined"
                activeOutlineColor={colorPrimary}
                error={!!errors.email}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}

            name="email"
          />

          <ErrorMessage name={"email"} errors={errors} />

          {false && <LabelInput value='Senha' />}
          <Controller control={control} rules={
            {
              required: 'Obrigatório', maxLength: { value: 40, message: "Nome muito grande" },
              minLength: { value: 5, message: "Informe uma senha maior" },
            }}
            render={({ field: { onChange, onBlur, value, } }) => (
              <TextInput
                label={"Senha"}
                mode="outlined"
                activeOutlineColor={colorPrimary}
                error={!!errors.password}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
          />

          <ErrorMessage name={"password"} errors={errors} />

          <Button
            disabled={loading}
            loading={loading}
            buttonColor={colorPrimary}
            textColor='white'
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            Criar conta
          </Button>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Já tem uma conta?</Text>
            <Pressable onPress={() => navigation.navigate("SigIn")}>
              <Text style={styles.linkText}>Fazer login</Text>
            </Pressable>
          </View>

          <View>

          </View>
        </View>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop:26,
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    gap: 15,
    alignItems: "center",
  },
  button: {
    padding: 5
  },
  buttonGoogle: {
    padding: 5,
    top: 15
  },
  titleText: {
    fontSize: 25,
    marginBottom: 0,
    marginTop: 0,
    color: "#4d4d4f",
  },
  inputContainer: {
    width: "90%",
    gap: 0,
    flex: 1,
  },
  footerContainer: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  footerText: {
    color: "gray",
  },
  linkText: {
    color: "#407AFF",
  },
});

export default CreateUser;