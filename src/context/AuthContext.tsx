import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { View } from 'react-native'

interface FormatAuthContext {
  user: FormatUser | null
  setUser: Dispatch<SetStateAction<FormatUser | null>>
  authenticate: boolean
}

interface FormatUser {
  name: string,
  email: string,
  token: string
  password?: string
}

const AuthContext = createContext<FormatAuthContext>({} as FormatAuthContext)

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FormatUser | null>(null)
  return (
    <AuthContext.Provider value={{ user, authenticate: !!user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
