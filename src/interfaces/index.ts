import { Format } from './../../node_modules/@types/cli-progress/index.d';
import { Dispatch, SetStateAction } from "react"

export interface FormatAuthContext {
    user: FormatUser | null
    setUser: Dispatch<SetStateAction<FormatUser | null>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>


    welcome: boolean
    setWelcome:  Dispatch<SetStateAction<boolean>>
    authenticate: boolean,
    logout: () => void
}

export interface FormatUser {
    name?: string,
    email?: string,
    user_login?: string,
    token?: string
    password?: string
    id?: number
    user_id?: number
    login?: string
    user?: {
        name?: string,
        email?: string,
        user_login?: string,
        token?: string
        password?: string
        user_id?: number
        login?: string


    }
}

export interface FormatPost {
    created_at: string;
    id: number;
    message: string;
    post_id: number | null;
    updated_at: string;
    user_login: string;
}