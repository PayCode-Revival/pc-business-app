import axios from "axios"

export function getSavedBearerToken() {
    console.log(localStorage.getItem("bearer-token"));
    return localStorage.getItem("bearer-token")
}


export async function api(url, method = "get", data = {}, config = {}) {
    const baseURL = `https://paymaker.io/api/`
    const request = await axios({
        method: method,
        url: baseURL + url,
        data: data,
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${getSavedBearerToken()}`,
        },
    })
    return request
}