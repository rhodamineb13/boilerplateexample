import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

const config : CreateAxiosDefaults = {
    baseURL: 'http://localhost:8080/public',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
}

export const client : AxiosInstance = axios.create(config)