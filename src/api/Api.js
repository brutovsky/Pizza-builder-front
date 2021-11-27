import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export default axios.create({
    baseURL: API_ENDPOINT,
    headers: { 'Authorization': localStorage.getItem('token')}
});
