import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


import logo from '../../assets/splash.png'; 

export default function HeaderFeed() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Papacapim</Text>
      <Image source={logo} style={styles.logo} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', 
    paddingHorizontal:15,
    paddingVertical:6,
    gap:10,
    paddingBottom:13
  },
  logo: {
    width: 40, 
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', 
  },
});
