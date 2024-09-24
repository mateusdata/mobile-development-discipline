import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export async function logout() {
    const {setUser} = useContext(AuthContext)
    AsyncStorage.clear()
    setUser(null)
}