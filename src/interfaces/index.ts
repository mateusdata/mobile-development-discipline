import { Format } from './../../node_modules/@types/cli-progress/index.d';
import { Dispatch, SetStateAction } from "react"

export interface FormatAuthContext {
    user: FormatUser | null
    setUser: Dispatch<SetStateAction<FormatUser | null>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    authenticate: boolean,
    logout: () => void
}

export interface FormatUser {
    name?: string,
    email?: string,
    login?: string,
    token?: string
    password?: string
    userId?: number
    user?: {
        name?: string,
        email?: string,
        login?: string,
        token?: string
        password?: string
        userId?: number
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