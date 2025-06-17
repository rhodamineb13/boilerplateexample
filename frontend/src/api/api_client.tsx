import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

const config: CreateAxiosDefaults = {
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
};

export const client: AxiosInstance = axios.create(config);