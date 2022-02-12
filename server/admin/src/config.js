import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://netflix-clone-jon.herokuapp.com/admin"
})