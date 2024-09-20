import uniqolor from 'uniqolor';

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Dimensions, Pressable, Alert } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ContextSheet } from '../context/BottomSheetContex';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderFeed from '../components/HeaderFeed';
import ButtonAddPost from '../components/ButtonAddePost';
import BottomSheet from '../components/BottomSheet';
import { ActivityIndicator, Avatar, Button, IconButton } from 'react-native-paper';
import { api } from '../config/Api';
import { AuthContext } from '../context/AuthContext';
import { FormatComment, FormatLike, FormatPost } from '../interfaces';
import dayjs from 'dayjs';
import { colorPrimary } from '../constants/constants';
import CommentsBottomSheet from '../components/CommentsBottomSheet';
import LoadingComponent from '../components/LoadingComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SOCKET_URL = 'ws://192.168.25.91:3000/posts';

const FeedScreen = ({ navigation }: any) => {
  const { openBottomSheet, closeBottomSheet } = useContext(ContextSheet)
  const { height, width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState<FormatPost[]>([])
  const [currentPost, setCurrentPost] = useState<FormatPost>({} as FormatPost)


  const [data, setData] = useState<any>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
   async function fetchData() {
    const data  =  await AsyncStorage.getItem("accessToken");
    console.log(data);
   }
   fetchData()
  }, []);

  const sendMessage = (event: string, data: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ event, data });
      socket.send(message);
      console.log(`Mensagem enviada para o evento ${event}`);
    } else {
      console.error('WebSocket não está conectado');
    }
  };






  async function getPost() {

    try {
      const response = await api.get("/posts");
      setPosts(response.data)
    } catch (error) {
      alert("OCorreu um erro ao buscar os post")
    }
  }


  async function handleLike(post: FormatPost) {
    const currentLike = post.likes.find((like) => like.userId === user?.userId);

    const data = {
      postId: post.postId,
      userId: user?.userId,
    };

    setPosts((prevPosts: any) =>
      prevPosts.map((p: any) =>
        p.postId === post.postId
          ? {
            ...p,
            likes: currentLike
              ? p.likes.filter((like: any) => like.userId !== user?.userId)
              : [...p.likes, { postLikeId: Date.now(), ...data }],
            _count: {
              ...p._count,
              likes: currentLike ? p._count.likes - 1 : p._count.likes + 1,
            },
          }
          : p
      )
    );

    if (currentLike) {
      if (currentLike.userId === user?.userId) {
        try {
          await api.delete(`postlike/${currentLike.postLikeId}`);
        } catch (error) {
          console.error("Erro ao remover curtida:", error);
        }
      }
    } else {
      try {
        await api.post("postlike", data);
      } catch (error) {
        console.error("Erro ao curtir o post:", error);
      }
    }
  }





  function openCommentsBottomSheet(post: FormatPost) {

    setCurrentPost(post);
    if (!!post.comments.length) {
      openBottomSheet('CommentsBottomSheet');
      return
    }
  }


  if (!posts) {
    return <LoadingComponent />
  }
  const userUrl = "https://media.istockphoto.com/id/1490373886/pt/foto/natural-beauty.webp?b=1&s=170667a&w=0&k=20&c=JZOyXoFl8iPMqtOySv82u4miOI5NIJGLxryugT12VSg="

  const renderPost = ({ item, index }: { item: FormatPost, index: any }) => (
    <View key={index} style={styles.postContainer}>
      <View style={{ width: "90%", flexDirection: "row" }}>

        <Pressable onPress={() => navigation.navigate("Profile")} style={styles.containerAvatar}>
          {false && <Image
            style={styles.avatar}
            resizeMode='cover'
            source={{ uri: userUrl }} />}
          <Avatar.Text
            color='white'
            style={{ backgroundColor: uniqolor.random().color }}
            size={40}
            label={item.user.name[0]?.toUpperCase()}
          />

        </Pressable>

        <View style={styles.postDescription}>

          <View style={styles.containerUserTitle}>
            <View style={{ flexDirection: "row", gap: 4, justifyContent: 'center', alignItems: "center" }}>
              <Pressable onPress={() => navigation.navigate("Profile")}>
                <Text numberOfLines={50000} ellipsizeMode="tail" style={styles.postUser}>{item.user.name}</Text>
              </Pressable>
              <Text numberOfLines={50000} ellipsizeMode="tail" style={[styles.postUser, { fontWeight: 100, fontSize: 12 }]}>
                {dayjs(item.updatedAt).format("hh:mm")}
              </Text>
            </View>
            <Pressable onPress={() => { { } }} android_ripple={{ color: colorPrimary, borderless: true }}>
              <SimpleLineIcons name="options" size={16} color="#c4c4c4" />
            </Pressable>
          </View>
          <Text numberOfLines={50000} ellipsizeMode="tail" style={styles.postMessage}>{item.message}</Text>

          <View style={{ flexDirection: "row", marginTop: 12, gap: 8, width: "50%", right: 15 }}>

            <Pressable onPress={() => handleLike(item)} style={{ flexDirection: "row", alignItems: "center", }}>

              {item.likes.find((item: FormatLike) => item.userId === user?.userId) ?
                <IconButton icon="heart" iconColor='red' size={22} /> :
                <IconButton icon="heart-outline" size={22} />
              }

              <Text>{item._count.likes}</Text>
            </Pressable>

            <Pressable onPress={() => openCommentsBottomSheet(item)} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <AntDesign name="message1" size={22} color="black" />
              <Text>{item._count.comments} </Text>
            </Pressable>

            {false && <Pressable style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 3 }}>
              <Feather name="send" size={12} color="black" />
              <Text>{1000} </Text>
            </Pressable>}
          </View>
        </View>

      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <ButtonAddPost />
      <CommentsBottomSheet currentPost={currentPost} />
      <View style={[styles.container, {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }]}>

        <FlatList
          ListHeaderComponent={<HeaderFeed />}
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.postId.toString()}
          contentContainerStyle={styles.feedList}
        />

        <BottomSheet id="FeedScreen" snapPoints={[height < 700 ? 45 : 35]}>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <>
              <Image
                source={{ uri: userUrl }}
                style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4CAF50', marginBottom: 10 }}>
                Bem-vindo ao Papacapim! 🌿
              </Text>
              <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>
                Estamos felizes em ter você aqui. Explore nossas funcionalidades e descubra um mundo de possibilidades. Vamos nessa?
              </Text>
            </>
          </View>
        </BottomSheet>


      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  feedList: {
    padding: 0,
  },
  postContainer: {
    marginTop: 2,
    backgroundColor: 'white',
    borderBottomWidth: 0.2,
    borderBottomColor: "#e2e2e2",
    width: "100%",
    flexDirection: "row",
    padding: 15,
    gap: 10,
    paddingEnd: 12

  },
  containerAvatar: {
    width: 45,
    alignItems: "flex-end"
  },

  postUser: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  postMessage: {
    fontSize: 16,
    color: '#333',
    marginRight: 10
  },
  avatar: {
    height: 42,
    width: 42,
    borderRadius: 80,
    borderColor: "pink",

  },
  postDescription: {
    borderWidth: 0,
    paddingStart: 10,
    width: "100%"
  },
  containerUserTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 5,
    marginRight: 12
  }
});

export default FeedScreen;
