import axios from "axios"

// export const api = axios.create({
//     baseURL: `https://paymaker.io/api/`,
//     headers: {

//         'Authorization': `Bearer ${getSavedBearerToken()}`,
//     },
//     withCredentials: true,
// })

export function getSavedBearerToken() {
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