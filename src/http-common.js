import axios from 'axios';
import {getToken} from './service/LoginService';

export default axios.create({
    //baseURL: "http://localhost:8080/api",
    //baseURL: "https://7cf7a11a-6b61-49e4-8eea-2f6775e723a0-00-2ykalvimyu4zk.kirk.replit.dev/api",
    baseURL: "https://notesapp-4eb8bcfff3da.herokuapp.com/api",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
})

//export const BASE_URL = "http://localhost:8080/api";
//export const BASE_URL = "https://7cf7a11a-6b61-49e4-8eea-2f6775e723a0-00-2ykalvimyu4zk.kirk.replit.dev/api";
export const BASE_URL = "https://notesapp-4eb8bcfff3da.herokuapp.com/api";

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});
