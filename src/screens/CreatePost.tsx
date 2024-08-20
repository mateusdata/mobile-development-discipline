import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { colorPrimary } from '../constants/constants';

export default function CreatePost() {
  const [postText, setPostText] = useState('');
  const theme = useTheme();

  const handlePost = () => {
    Alert.alert('Novo post', "Post criado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colorPrimary }]}>Criar novo post</Text>
      <TextInput
        mode="outlined"
        label="Seu post"
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
