import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL as string;

if (!apiUrl) {
    throw new Error('API URL is not defined');
}

export const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})