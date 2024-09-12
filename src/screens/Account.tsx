import { View, Text, Image, StyleSheet, Pressable, Dimensions, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useContext, useState } from 'react';
import { ContextSheet } from '../context/BottomSheetContex';
import BottomSheet from '../components/BottomSheet';

export default function Account() {
  const [name, setName] = useState('Simone Biles');
  const [username, setUsername] = useState('@simonebiles');
  const [bio, setBio] = useState('Desenvolvedora de sistemas | Apaixonada por tecnologia e inovação 🚀');
  const { closeBottomSheet, openBottomSheet } = useContext(ContextSheet);
  const { height, width } = Dimensions.get('window');

  const handleOpenSheet = () => {
    openBottomSheet('Account');
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://img.myloview.com.br/posters/modelo-loira-sensual-mulher-loura-bonita-atrativa-sexy-apaixonado-com-cabelo-longo-saudavel-composicao-perfeita-pestanas-longas-grossas-dentes-brancos-conceito-de-cosmetico-beleza-skincare-e-700-126762601.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Simone Biles</Text>
        <Text style={styles.username}>@simonebiles</Text>
        <Text style={styles.bio}>
          Desenvolvedora de sistemas | Apaixonada por tecnologia e inovação 🚀
        </Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.stat}>
          <Text style={styles.statNumber}>123</Text> Seguindo
        </Text>
        <Text style={styles.stat}>
          <Text style={styles.statNumber}>456</Text> Seguidores
        </Text>
      </View>

      <Pressable onPress={handleOpenSheet} style={styles.editProfileButton}>
        <Text style={styles.editProfileButtonText}>Editar Perssssfil</Text>
      </Pressable>

      <BottomSheet id='Account' snapPoints={[height < 700 ? 48 : 43]}>
        <View style={styles.sheetContent}>
          <TextInput
            label="Nome"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Bio"
            value={bio}
            onChangeText={setBio}
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={() => {
              Alert.alert("Perfil", "Perfil atualizado")
              closeBottomSheet()
            }}
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
          >
            Salvar Alterações
          </Button>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  stat: {
    fontSize: 16,
  },
  statNumber: {
    fontWeight: 'bold',
  },
  editProfileButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sheetContent: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 16,
    height:50,
    backgroundColor: 'white',
  },
  saveButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#1DA1F2',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
