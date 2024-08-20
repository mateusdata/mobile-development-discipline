import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Button, Dimensions, Pressable } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import ButtonSheet from '../components/ButtonSheet';
import { ContextSheet } from '../context/BottomSheetContex';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderFeed from '../components/HeaderFeed';
import ButtonAddPost from '../components/ButtonAddePost';

const FeedScreen = ({ navigation }: any) => {
  const { isVisible, closeBottomSheet, openBottomSheet } = useContext(ContextSheet)
  const { height, width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  useEffect(() => {

    
    setTimeout(() => {
      openBottomSheet()
    }, 1000)
  }, []);
  const posts = Array.from({ length: 20 }, (_, index) => ({
    id: (index + 1).toString(),
    user_login: `usuário${index + 1}`,
    message: 'Java é a melhor linguagem de programação do mundo! 🌍 Com sua robustez, portabilidade e uma comunidade incrível, Java continua a liderar o desenvolvimento de aplicações em diversas áreas. 🚀 #Java #Programação #Tecnologia ?',
  }));
  const userUrl = "https://media.istockphoto.com/id/1490373886/pt/foto/natural-beauty.webp?b=1&s=170667a&w=0&k=20&c=JZOyXoFl8iPMqtOySv82u4miOI5NIJGLxryugT12VSg="

  const renderPost = ({ item, index }: any) => (
    <View style={styles.postContainer}>
      <View style={{ width: "90%", flexDirection: "row" }}>

        <Pressable  onPress={()=>navigation.navigate("Profile")} style={styles.containerAvatar}>
          <Image
            style={styles.avatar}
            resizeMode='cover'
            source={{ uri: userUrl }} />
        </Pressable>

        <View style={styles.postDescription}>

          <View style={styles.containerUserTitle}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Pressable onPress={()=>navigation.navigate("Profile")}>
                <Text numberOfLines={50000} ellipsizeMode="tail" style={styles.postUser}>{item.user_login}</Text>
              </Pressable>
              <Text numberOfLines={50000} ellipsizeMode="tail" style={[styles.postUser, { fontWeight: 100 }]}>{"4h"}</Text>
            </View>
            <SimpleLineIcons onPress={openBottomSheet} name="options" size={20} color="#c4c4c4" />
          </View>
          <Text numberOfLines={50000} ellipsizeMode="tail" style={styles.postMessage}>{item.message}</Text>

          <View style={{ flexDirection: "row", marginTop: 12, gap: 12, width: "50%" }}>
            <View style={{ flexDirection: "row", gap: 2 }}>
              {index % 2 === 0 ?
                <Ionicons name="heart" size={24} color="red" /> :

                <AntDesign name="hearto" size={21} color="black" />
              }

              <Text>{10}</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 2 }}>
              <Feather name="message-circle" size={21} color="black" />
              <Text>{10} </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 2 }}>
              <Feather name="send" size={20} color="black" />
              <Text>{10} </Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <ButtonAddPost/>

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
        />

        <ButtonSheet snapPoints={[height < 700 ? 45 : 35]}>
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
        </ButtonSheet>


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
    borderWidth: 2
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
