import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const baseURL = 'http://localhost:4000/';
const instance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",

    },
});
export default instance

const signUp = async (usename, password) => {
    return await instance.post('api/users/register', {usename, password})
        .then(response => {
            return {
                data: response.data
            }
        })
        .catch(err => {
            return {
                data: null,
                err
            }
        })
}

const logIn = async (usename, password) => {
    
    return await instance.post('api/users/login', {usename, password})
        .then(response => {
            const token = response.data.token
            const user = jwtDecode(token)
            return {
                data: {
                    user,
                    token
                }
            }
        })
        .catch(err => {
            return {
                data: null,
                err
            }
        })
}
export { signUp, logIn };

instance.interceptors.request.use((config) => {
    let token = null
    const data = localStorage.getItem('user')
    console.log("Data ===>", data)
    if (data) {
        const user = JSON.parse(data)
        if (user) {
            token = user.token
        }
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

