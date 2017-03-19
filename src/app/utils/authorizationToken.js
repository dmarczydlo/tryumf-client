/**
 * Created by marczak on 2017-03-18.
 */
import axios from 'axios';
var qs = require('qs');

export default function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';


        // axios.interceptors.request.use((request) => {
        //     if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        //         request.data = qs.stringify(request.data);
        //     }
        //     return request;
        // });

    } else {
        delete axios.defaults.headers.common['Authorization'];
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

    }
}