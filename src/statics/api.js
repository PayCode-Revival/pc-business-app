import axios from "axios"
import { apiToken } from "./config"


export const api = axios.create({
    baseURL: `http://localhost:8000/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
    },
    withCredentials: true,

})