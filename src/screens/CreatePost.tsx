import React, { useState } from 'react';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import axios from 'axios';
import { colorPrimary } from '../constants/constants';
import { api } from '../config/Api';
import { playSound } from '../utils/playSound';

export default function CreatePost() {
  const [postText, setPostText] = useState('');
  const theme = useTheme();

  const handlePost = async () => {
    try {
      const response = await api.post('/posts', {
        post: {
          message: postText
        }
      });

      if (response.status === 201) {
        ToastAndroid.show('Post criado com sucesso!', 2000);
        setPostText("")
        playSound()
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colorPrimary }]}>Criar novo post</Text>
      <TextInput
        mode="outlined"
        label="Seu post"
        autoFocus
        value={postText}
        onChangeText={setPostText}
        multiline={true}
        maxLength={280}
        style={styles.input}
        activeOutlineColor={colorPrimary}
      />
      <Button
        mode="contained"
        buttonColor={colorPrimary}
        onPress={handlePost}
        disabled={!postText}
        style={styles.button}
      >
        Publicar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 150,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 10,
  },
});
