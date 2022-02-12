import axios from 'axios';

//baseURL needs to match backend URL
export const axiosInstance = axios.create({
    baseURL: "https://netflix-clone-jon.herokuapp.com/"
    // baseURL: "https://localhost:5000/"
})