import axios from "axios"
export const bearerToken = localStorage.getItem("bearer-token")
export const api = axios.create({
    baseURL: `http://192.168.68.104:8000/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
    },
    withCredentials: true,
})