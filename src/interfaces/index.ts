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
    token?: string
    password?: string
    userId?: number
}


export interface FormatFriend {
    name: string;
}


export interface FormatComment {
    commentId: number;
    message: string;
    likes: any[];
    _count: {
        likes: number;
    };
    user: {
        name: string;
    };
}

export interface FormatLike {
    postLikeId: number;
    postId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface FormatPost {
    postId: number;
    message: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    user: FormatFriend;
    comments: FormatComment[];
    likes: FormatLike[];
    _count: {
        likes: number;
        comments: number;
    };
}