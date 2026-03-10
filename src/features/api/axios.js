import axios from 'axios';

export const api = axios.create({
    baseURL : 'https://nexora-ai-48l6.onrender.com/api',
    withCredentials: true
})