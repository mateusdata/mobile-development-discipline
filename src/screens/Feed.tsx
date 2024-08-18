import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
const FeedScreen = () => {
  // Dados simulados para o exemplo
  const posts = Array.from({ length: 100 }, (_, index) => ({
    id: (index + 1).toString(),
    user_login: `usuário${index + 1}`,
    message: 'Menina crstãn porporporporporporporporporporporporporporporporporporporporporpor ?',
  }));

  const renderPost = ({ item }: any) => (
    <View style={styles.postContainer}>
      <View style={{ width: "90%", flexDirection: "row" }}>

        <View style={styles.containerAvatar}>
          <Image
            style={styles.avatar}
            resizeMode='cover'
            source={{uri:"https://media.istockphoto.com/id/1490373886/pt/foto/natural-beauty.webp?b=1&s=170667a&w=0&k=20&c=JZOyXoFl8iPMqtOySv82u4miOI5NIJGLxryugT12VSg="}} />
        </View>

        <View style={styles.postDescription}>

          <View style={styles.containerUserTitle}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text numberOfLines={50000} ellipsizeMode="tail" style={styles.postUser}>{item.user_login}</Text>
              <Text numberOfLines={50000} ellipsizeMode="tail" style={[styles.postUser, { fontWeight: 100 }]}>{"4h"}</Text>
            </View>
            <SimpleLineIcons name="options" size={20} color="#c4c4c4" />
          </View>
          <Text numberOfLines={50000} ellipsizeMode="tail" style={styles.postMessage}>{item.message}</Text>

          <View style={{ flexDirection: "row", marginTop: 12,  gap:12, width: "50%" }}>
            <View style={{flexDirection:"row", gap:2}}>
             {false &&  <Ionicons name="heart" size={24} color="red" />}
              <AntDesign name="hearto" size={21} color="black" />
              <Text>{10}</Text>
            </View>

            <View style={{flexDirection:"row", gap:2}}>
              <Feather name="message-circle" size={21} color="black" />
              <Text>{10} </Text>
            </View>

            <View style={{flexDirection:"row", gap:2}}>
              <Feather name="send" size={20} color="black" />
              <Text>{10} </Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.feedList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  feedList: {
    padding: 10,
  },
  postContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    width: "100%",
    flexDirection: "row",
    padding: 5,
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
    fontSize: 16
  },
  postMessage: {
    fontSize: 16,
    color: '#333',
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
    bottom: 5
  }
});

export default FeedScreen;
