import axios from "axios"

export  const api = axios.create({
    baseURL:"https://api.papacapim.just.pro.br:8000"
})