import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const api = axios.create({
    //baseURL: "https://api.mateusdata.com.br",
    baseURL: "https://api.papacapim.just.pro.br",
    headers: {
        "x-session-token": "b3268610-cb66-4061-b721-9d121568477a"
    }
});

let isSessionExpiredToastShown = false; // Variável para controlar se o toast já foi mostrado



api.interceptors.request.use(async (config) => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken !== null) {
            const token = accessToken;

            if (token) {

                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    } catch (error) {
        console.error("Error getting user from AsyncStorage:", error);

        return config;
    }
});

async function setInterceptors(setUser: Function, logOut: any) {
    api.interceptors.response.use(

        (response) => {
            return response;
        },
        async (error) => {
            if (!error.response && !isSessionExpiredToastShown) {
                isSessionExpiredToastShown = true;
                Alert.alert("error", "Voçê perdeu a coneção com a internet Verifique sua conexãot")
            }

            if (error.response && error.response.status === 401) {
                try {
                    Alert.alert("error", `Sessão expirada faça login novamente${error.response.status}`)
                    await logOut();
                } catch (asyncStorageError) {
                    console.error("Error removing user from AsyncStorage:", asyncStorageError);
                }
            }

            return Promise.reject(error);
        }
    );
}

export { api, setInterceptors };
