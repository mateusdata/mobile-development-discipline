import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Avatar, Searchbar, TextInput } from 'react-native-paper';
import { api } from '../config/Api';
import { FormatUser } from '../interfaces';
import uniqolor from 'uniqolor';
import LoadingComponent from '../components/LoadingComponent';

export default function SearchUsers({navigation}:any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<FormatUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSeach, setIsSeach] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  async function fetchUser(search = '', page = 0) {
    try {
      setLoading(true);
      const response = await api.get("/users", {
        params: {
          search: search,
          page: page
        }
      });
      console.log(response?.data?.length);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const onChangeSearch = async (search: any) => {
    setSearchQuery(search);
    if (search.length > 0) {
      fetchUser(search, 0);
    } else {
      fetchUser();
    }
  };

  async function cleanSearch() {
    setSearchQuery("");
    fetchUser();
  }

  async function followersUser(follower: FormatUser) {
    try {
      const response = await api.post(`users/${follower.login}/followers`);
      console.log(response.data);
      alert("Deu certo carai");
    } catch (error) {
      alert("Ocorreu um erro ao seguir usuário");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Pesquisar perfil"
          onChangeText={onChangeSearch}
          value={searchQuery}
          mode='bar'
          inputMode='search'
          selectionColor={"gray"}
          cursorColor={"gray"}
          onClearIconPress={cleanSearch}
          style={styles.searchbar}
        />
      </View>

      {
        !loading ?
          <ScrollView contentContainerStyle={styles.scrollView}>
            {users.map((item: any) => (
              <Pressable onPress={()=> navigation.navigate("Profile", {profile: item})} android_ripple={{color:"gray"}} key={item.login} style={styles.userContainer}>
                <View style={{ flexDirection: "row", gap: 15, justifyContent: "center", alignItems: "center" }}>
                  <Avatar.Text
                    color='white'
                    style={{ backgroundColor: uniqolor.random().color }}
                    size={30}
                    label={item.name[0]?.toUpperCase()}
                  />
                  <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.userText, { fontWeight: "700", maxWidth: 180 }]} >{item.login}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.userText, { fontWeight: "200", maxWidth: 180 }]}  >{item.name}</Text>
                  </View>
                </View>

                {false && <View style={{ justifyContent: "center" }}>
                  <Pressable onPress={() => followersUser(item)} android_ripple={{ color: "white" }} style={{ backgroundColor: "black", padding: 5, borderRadius: 7, paddingHorizontal: 20 }}>
                    <Text style={{ color: "white" }}>Seguir</Text>
                  </Pressable>
                </View>}
              </Pressable>
            ))}
          </ScrollView> :
          <LoadingComponent />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginBottom: 10,
  },
  searchbar: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  userContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    borderColor: "#e8e8e8",
    padding: 10,
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
  },
});
