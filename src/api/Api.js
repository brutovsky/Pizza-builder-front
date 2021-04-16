import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:8080`
});

/*const config = {
    headers: { Authorization: `Bearer ${token}` }
};*/
