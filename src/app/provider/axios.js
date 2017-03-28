/**
 * Created by marczak on 2017-03-27.
 */

import ax from 'axios'
import {API_PATH} from '../variables';
import {hashHistory} from 'react-router'

let axios = ax.create({
    baseURL: API_PATH,
    timeout: 1000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

axios.interceptors.request.use(function (config) {
    config.headers = {'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')}
    config.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'}
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    const status = error.response ? error.response.status : 500
    if (status == 404) {
        hashHistory.replace('/login')
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('group');
    }


    return Promise.reject(error);

});
export default axios