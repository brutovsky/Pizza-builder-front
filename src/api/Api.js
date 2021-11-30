import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const API =  axios.create({
    baseURL: API_ENDPOINT,
    headers: { 'Authorization': localStorage.getItem('token')},
});

API.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
}, null, { synchronous: true });

export default API