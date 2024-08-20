import { StatusBar } from 'expo-status-bar';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import LabelInput from '../components/LabelInput';

export default function Contact({navigation}:any) {
  const { watch, register, control } = useForm({
    defaultValues: {
      names: "",
      phone: ""
    }
  })

  return (
    <View style={styles.container}>
      <View>
        <LabelInput value='Nome' />
        <TextInput mode='outlined' />
      </View>
      <View>
        <LabelInput value='Telefone' />
        <TextInput mode='outlined' />
      </View>
      <Button
        onPress={() => navigation.navigate("Contacts")}
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
