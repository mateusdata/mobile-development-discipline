import { View, Text, Image, StyleSheet, Pressable, Dimensions, Alert, ToastAndroid } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useContext, useState, useEffect } from 'react';
import { ContextSheet } from '../context/BottomSheetContex';
import BottomSheet from '../components/BottomSheet';
import { AuthContext } from '../context/AuthContext';
import { api } from '../config/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uniqolor from 'uniqolor';

export default function Account() {
  const { closeBottomSheet, openBottomSheet } = useContext(ContextSheet);
  const { height, width } = Dimensions.get('window');
  const { logout, user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.user_login || '');
  const [password, setPassword] = useState(user?.password || '');

  const handleOpenSheet = () => {
    openBottomSheet('Account');
  };

  const deleteAccount = async () => {
    try {
      await api.delete(`/users/${user?.id}`);
      Alert.alert("Conta", "Conta deletada com sucesso");
      logout();
    } catch (error) {
      console.log(error);
      alert("Erro ao deletar conta");
    }
  };

  const updateUser = async () => {
    try {
      const response = await api.patch(`/users/${user?.id}`, {
        user: {
          login: username,
          name: name,
        }
      });
      console.log(response.data)
      setTimeout(() => {
        ToastAndroid.show("Conta atualizada com sucesso", 3000)
      }, 1000);

      setUser((preValues)=> ({...preValues, name: response.data.name, user_login: response.data.login}));

      setUser(response.data)


      await AsyncStorage.setItem("user", JSON.stringify(response.data))
      closeBottomSheet();
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar conta");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          color='white'
          style={{ backgroundColor: uniqolor.random().color }}
          size={80}
          label={user?.name ? user?.name[0] : ""}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.username}>@{user?.user_login ? user?.user_login : user?.login}</Text>

      </View>

      <View style={styles.stats}>
        <Text style={styles.stat}>
          <Text  style={styles.statNumber}>123</Text> Seguindo
        </Text>
        <Text style={styles.stat}>
          <Text style={styles.statNumber}>456</Text> Seguidores
        </Text>
      </View>

      <Pressable onPress={handleOpenSheet} style={styles.editProfileButton}>
        <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
      </Pressable>

      <Pressable onPress={logout} style={[styles.editProfileButton, { backgroundColor: "orange", marginTop: 10 }]}>
        <Text style={styles.editProfileButtonText}>Sair</Text>
      </Pressable>

      <Pressable onPress={deleteAccount} style={[styles.editProfileButton, { backgroundColor: "#f46464", marginTop: 10 }]}>
        <Text style={styles.editProfileButtonText}>Deletar Conta</Text>
      </Pressable>

      <BottomSheet id='Account' snapPoints={[80,50]}>
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
            label="Senha"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={updateUser}
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
    textAlign:"center"
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
    height: 50,
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
