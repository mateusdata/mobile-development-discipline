import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../components/LoadingComponent';
import { FormatAuthContext, FormatUser } from '../interfaces';
import { setInterceptors } from '../config/Api';


export const AuthContext = createContext<FormatAuthContext>({} as FormatAuthContext)

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FormatUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setInterceptors(setUser, logout)
  }, [user])


  async function recovereData() {
    try {

      setLoading(true)
      const user = await AsyncStorage.getItem("user");
      const data = await AsyncStorage.getAllKeys()
      if (user != null) {
        setUser(JSON.parse(user));
        setLoading(false);
        return
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      logout()

    }
  }



  useEffect(() => {
    recovereData()
  }, []);



  async function logout() {
    await AsyncStorage.clear();
    setUser(null)
  }

  if (loading) {
    return (
      <LoadingComponent />
    )
  }
  return (
    <AuthContext.Provider value={{
      user,
      authenticate: !!user,
      setUser,
      loading,
      setLoading,
      logout
    }}>

      {children}
      <Text selectable >{JSON.stringify(user, null, 2)}</Text>

    </AuthContext.Provider>
  )
}
