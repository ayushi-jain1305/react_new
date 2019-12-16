import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-project-react-4c33a.firebaseio.com/'
});

export default instance;