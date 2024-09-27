import uniqolor from 'uniqolor';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Pressable, Share, Platform } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ContextSheet } from '../context/BottomSheetContex';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderFeed from '../components/HeaderFeed';
import ButtonAddPost from '../components/ButtonAddePost';
import BottomSheet from '../components/BottomSheet';
import { Avatar, IconButton } from 'react-native-paper';
import { api } from '../config/Api';
import { AuthContext } from '../context/AuthContext';
import { FormatPost } from '../interfaces';
import dayjs from 'dayjs';
import { colorPrimary } from '../constants/constants';
import CommentsBottomSheet from '../components/CommentsBottomSheet';
import LoadingComponent from '../components/LoadingComponent';
import ConfettiCannon from 'react-native-confetti-cannon';

const FeedScreen = ({ navigation }: any) => {
  const { openBottomSheet } = useContext(ContextSheet);
  const { height, width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const { user, setWelcome, welcome } = useContext(AuthContext);
  const [posts, setPosts] = useState<FormatPost[]>([]);
  const [currentPost, setCurrentPost] = useState<FormatPost>({} as FormatPost);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (welcome) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        openBottomSheet("FeedScreenWelcome");
        setWelcome(false);
      }, 5000);
    }
  }, [welcome]);

  async function fetchData() {
    try {
      const response = await api.get(`/posts?page=${page}`);
      setPosts(prevPosts => [...prevPosts, ...response.data]);
      setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      alert("Erro ao buscar as postagens");
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  async function handleLike(item: any) {    
  }

  function openCommentsBottomSheet(post: FormatPost) {    
  }

  async function sharePost(post: FormatPost) {
    try {
      await Share.share({
        title: `Olá estou compartilhando um post de ${post?.user_login}`,
        message: post.message,
      });
    } catch (error) {      
    }
  }

  function generationColor(id: number) {
    const colors = [
    "#FF0000", 
    "green", 
    "#0000FF", 
    "orange", 
    "#FF4500", 
    "#800080", 
    "#00CED1", 
    "#FF1493", 
    "#696969", 
    "#000000"  
    ];
    return colors[id % colors.length];
  }

  const renderPost = ({ item, index }: { item: FormatPost, index: any }) => (
    <View key={index} style={[styles.postContainer, { borderBottomWidth: Platform.OS === "ios" ? 0.5 : 0.2 }]}>
      <View style={{ width: "90%", flexDirection: "row" }}>
        <Pressable onPress={() => navigation.navigate("Profile", {
          profile: {
            login: item.user_login,
            name: item.user_login
          }
        })} style={styles.containerAvatar}>
          <Avatar.Text
            color='white' style={{ backgroundColor: generationColor(item.id) }}
            size={35}
            label={item.user_login[0]?.toUpperCase()}
          />
        </Pressable>
        <View style={styles.postDescription}>
          <View style={styles.containerUserTitle}>
            <View style={{ flexDirection: "row", gap: 4, justifyContent: 'center', alignItems: "center" }}>
              <Pressable onPress={() => navigation.navigate("Profile", {
                profile: {
                  login: item?.user_login,
                  name: item?.user_login
                }
              })}>
                <Text numberOfLines={50000} ellipsizeMode="tail" style={styles.postUser}>{item.user_login}</Text>
              </Pressable>
              <Text numberOfLines={50000} ellipsizeMode="tail" style={[styles.postUser, { fontWeight: 100, fontSize: 12 }]}>
                {dayjs(item.updated_at).format("hh:mm")}
              </Text>
            </View>
            <Pressable onPress={() => { }} android_ripple={{ color: colorPrimary, borderless: true }}>
              <SimpleLineIcons name="options" size={16} color="#c4c4c4" />
            </Pressable>
          </View>
          <Text numberOfLines={50000} ellipsizeMode="tail" style={styles.postMessage}>{item.message}</Text>
          <View style={{ flexDirection: "row", marginTop: 12, gap: 8, width: "50%", right: 15 }}>
            <Pressable onPress={() => handleLike(item)} style={{ flexDirection: "row", alignItems: "center" }}>
              {false ?
                <IconButton icon="heart" iconColor='red' size={22} /> :
                <IconButton icon="heart-outline" size={22} />
              }
              <Text>{""}</Text>
            </Pressable>
            <Pressable onPress={() => openCommentsBottomSheet(item)} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <AntDesign name="message1" size={22} color="black" />
              <Text>{""} </Text>
            </Pressable>
            <Pressable onPress={() => sharePost(item)} style={{ flexDirection: "row", alignItems: "center", gap: 12, right: 20 }}>
              <IconButton icon="share" size={22} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPosts([]);
    setPage(1);
  };

  if (loading) {
    return <LoadingComponent />;
  }

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
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.feedList}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
        <BottomSheet id="FeedScreenWelcome" snapPoints={[height < 700 ? 45 : 35]}>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <>
              <Avatar.Text
                color='white'
                style={{ backgroundColor: uniqolor.random().color }}
                size={80}
                label={user?.name ? user?.name[0]?.toUpperCase() : ""}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4CAF50', marginBottom: 10 }}>
                Olá {user?.name}, Bem-vindo ao Papacapim! 🌿
              </Text>
              <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>
                Estamos felizes em ter você aqui. Explore nossas funcionalidades e descubra um mundo de possibilidades. Vamos nessa?
              </Text>
            </>
          </View>
        </BottomSheet>
        {showConfetti && (
          <ConfettiCannon
            count={200}
            origin={{ x: width / 2, y: height / 2 }}
            fadeOut={true}
          />
        )}
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
