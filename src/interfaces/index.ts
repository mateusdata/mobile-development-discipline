import { Dispatch, SetStateAction } from "react"

export interface FormatAuthContext {
    user: FormatUser | null
    setUser: Dispatch<SetStateAction<FormatUser | null>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    authenticate: boolean,
    logOut: Function
}

export interface FormatUser {
    name?: string,
    email?: string,
    token?: string
    password?: string
}
