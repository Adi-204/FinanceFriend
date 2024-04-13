import axios from 'axios';

const axiosPrivate = axios.create({
    baseURL: process.env.VITE_URL,
    withCredentials: true
});


export default axiosPrivate;
