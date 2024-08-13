import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../components/LoadingComponent';

interface FormatAuthContext {
  user: FormatUser | null
  setUser: Dispatch<SetStateAction<FormatUser | null>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  authenticate: boolean,
  logOut: Function
}

interface FormatUser {
  name: string,
  email: string,
  token: string
  password?: string
}

export const AuthContext = createContext<FormatAuthContext>({} as FormatAuthContext)

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FormatUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {

    const recoveryUser = async () => {
      try {
        const user: FormatUser | string | null = await AsyncStorage.getItem("user")
        if (user !== null) {
          setUser(JSON.parse(user));
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    recoveryUser();
  }, [user])


  async function logOut() {
    AsyncStorage.removeItem("user")
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
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}
