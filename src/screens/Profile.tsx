import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile() {
  const userUrl = "https://media.istockphoto.com/id/1490373886/pt/foto/natural-beauty.webp?b=1&s=170667a&w=0&k=20&c=JZOyXoFl8iPMqtOySv82u4miOI5NIJGLxryugT12VSg="

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: userUrl }} 
          style={styles.profileImage}
        />
        <Text style={styles.name}>Leila carla</Text>
        <Text style={styles.username}>@username</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>123</Text>
          <Text>Postagens</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>456</Text>
          <Text>Seguidores</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>789</Text>
          <Text>Seguindo</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.buttonText}>Seguir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mentionButton}>
          <Text style={styles.buttonText}>Mencionar</Text>
        </TouchableOpacity>
      </View>
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
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  followButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  mentionButton: {
    backgroundColor: '#34C759',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
