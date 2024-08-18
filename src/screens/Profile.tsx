import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Mateus Silva</Text>
        <Text style={styles.username}>@mateusdev</Text>
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

      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
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
});
