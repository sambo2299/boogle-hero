import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: 'http://localhost:4999/',
    timeout: 1000
});

const APIS = {
    GET_LETTERS: '/api/getLetters',
    CHECK_WORD: '/api/checkword',
    GET_SCORE: '/api/getScore'
}

const request = (method, url, options) => {
        switch(method) {
            case 'POST':
                const data = qs.stringify(options);
                return(instance.post(`${url}`, data));
            case 'GET':
                const query = options ? `?${options}`: '';
                return(instance.get(`${url}${query}`));
            default:
                return false;
        }
}

export {
    APIS,
    request
}