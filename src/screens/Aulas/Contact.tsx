import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function Contact({navigation}:any) {
  const { watch, register,handleSubmit, control } = useForm({
    defaultValues: {
      names: "",
      phone: ""
    }
  })


  async function onSubmit(data:any) {
    //navigation.navigate("Contacts")
    try {
      AsyncStorage.setItem("user", JSON.stringify(data))
      
    } catch (error) {
      
    }
  }



  return (
    <View style={styles.container}>
      <View>       
        <Text>Nome</Text>
        <TextInput mode='outlined' />
      </View>
      <View>       
        <Text>Telefone</Text>
        <TextInput mode='outlined' />
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        mode='outlined'
        buttonColor="#407AFF"
        textColor='white'
        style={styles.button}>
        Adicionar
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
    gap: 18
  },
  input: {
    bottom: 15
  },
  button: {
    borderRadius: 5,
    padding: 5,
    marginTop: 15,
},
});
