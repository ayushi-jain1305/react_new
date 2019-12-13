import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-project-91b24.firebaseio.com/'
});

export default instance;