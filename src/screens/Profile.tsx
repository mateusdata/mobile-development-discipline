import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Avatar } from 'react-native-paper';
import uniqolor from 'uniqolor';
import { api } from '../config/Api';
import { AuthContext } from '../context/AuthContext';
import LoadingComponent from '../components/LoadingComponent';
import { playSound } from '../utils/playSound';

interface FormarProfile {
  login: string
  name: string

}

interface Follow {
  follower_id: number;
  followed_id: number;
  created_at?: string;
  updated_at?: string;
  follower_login?: string;
  followed_login?: string;
}

export default function Profile({ route }: { route: { params: { profile: FormarProfile } } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState('')
  const { user } = useContext(AuthContext)
  const { profile } = route?.params

  async function fetchData() {
    try {
      const response = await api.get(`users/${profile?.login}/followers`)
      console.log("Meus sequidores");
      const isMatch = response?.data?.find((item: Follow) => (item.follower_login === user?.user_login))
      console.log("Já seque", isMatch);
      if (isMatch) {
        setFollowers(isMatch.follower_id)
        setIsFollowing(true)
      }
      console.log(response.data)
      setLoading(false)
    } catch (error) {
      console.log("OCoreu um error");
      console.log(error);
      setLoading(false)

    }
  }
  useEffect(() => {
    fetchData()
  }, []);

  async function followersUser() {
    try {
      if (isFollowing) {
        const deseguir = await api.delete(`users/${profile.login}/followers/${followers}`);
        playSound()
        setIsFollowing(false);
        return
      }
      const seguir = await api.post(`users/${profile?.login}/followers`);
      setIsFollowing(true)
      playSound()
    } catch (error: any) {

      if (error?.response?.status === 422) {
        api.delete(`users/${profile.login}/followers/${followers}`)
        return alert("Ops? muitas tentativas, sai da pagina e tente novamente")
      }
      setIsFollowing(false)
    }
  }
  async function sharePost() {
    try {
      await Share.share({
        title: `Olá estou compartilhando um post de ${profile?.login}`,
        message: `Olá estou capartilhaddo este perfil do papacapim @${profile?.login}`,
      });
    } catch (error) {

    }
  }

  if (loading) {
    return <LoadingComponent />
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          color='white'
          style={{ backgroundColor: uniqolor.random().color }}
          size={80}
          label={profile?.name ? profile?.name[0]?.toUpperCase() : profile?.login[0]?.toUpperCase()}
        />
        <Text style={styles.name}>{profile?.name} </Text>
        <Text style={styles.username}>{"@" + profile?.login}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>123  </Text>
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
        <TouchableOpacity onPress={followersUser} style={[styles.followButton, { backgroundColor: isFollowing ? "black" : "gray" }]}>
          <Text style={styles.buttonText}>{`${isFollowing ? "Seguindo" : "Seguir"}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sharePost} style={styles.mentionButton}>
          <Text style={styles.buttonText}>Compartilhar</Text>
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
