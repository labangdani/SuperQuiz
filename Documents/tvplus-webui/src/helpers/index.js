import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL   
export const Api = {
    get(route, config) {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user.token
        if (token) {
            if (!config)
                config = {}
            if (!config.headers)
                config.headers = {}
    
            config.headers.Authorization = `Bearer ${token}`
        }

        return axios.get(serverUrl + route, config)
        
    },
    
    getwithouttoken(route) {
        return axios.get(serverUrl + route)  
    },

    postwithouttoken(route, data) {
        return axios.post(serverUrl + route, data)
    },

    post(route, data, config) {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user.token
        if (token) {
            if (!config)
                config = {}
            if (!config.headers)
                config.headers = {}
    
            config.headers.Authorization = `Bearer ${token}`
        }
        return axios.post(serverUrl + route, data, config)
        
    },

    putwithouttoken(route, data) {
        return axios.put(serverUrl + route, data)
    },

    put(route, data, config) {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user.token
        if (token) {
            if (!config)
                config = {}
            if (!config.headers)
                config.headers = {}
    
            config.headers.Authorization = `Bearer ${token}`
        }
        return axios.put(serverUrl + route, data, config)
    }
}
