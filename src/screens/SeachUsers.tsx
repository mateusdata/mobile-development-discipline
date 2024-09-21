import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Avatar, Searchbar, TextInput } from 'react-native-paper';
import { api } from '../config/Api';
import { FormatUser } from '../interfaces';
import uniqolor from 'uniqolor';
import LoadingComponent from '../components/LoadingComponent';

export default function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<FormatUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchUser() {
    try {
      setLoading(true)
      const response = await api.get("/users");
      console.log(response?.data?.length);
      setUsers(response.data);
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const onChangeSearch = async (search:any) => {
    setSearchQuery(search);
    if (search.length > 0) {
      try {
        const response = await api.post(`/search-pacient`, {});
        console.log(response.data);
        setUsers(response?.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchUser();
    }
  };

  async function cleanSearch() {
    setSearchQuery("");
    fetchUser();
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Pesquisar pacientes"
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
      {users.map((item:any) => (
        <View key={item.login} style={styles.userContainer}>
          <View style={{flexDirection:"row", gap:15, justifyContent:"center", alignItems:"center"}}>
            <Avatar.Text
              color='white'
              style={{ backgroundColor: uniqolor.random().color }}
              size={30}
              label={item.name[0]?.toUpperCase()}
            />
            <View>
              <Text style={[styles.userText, { fontWeight: "700" }]}>{item.login}</Text>
              <Text style={styles.userText}>{item.name}</Text>
            </View>
          </View>

          <View style={{ justifyContent:"center"}}>
            <Pressable style={{backgroundColor:"black", padding:5, borderRadius:7, paddingHorizontal:10}}>
              <Text style={{color:"white"}}>Seguir</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>:
    <LoadingComponent/>
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
