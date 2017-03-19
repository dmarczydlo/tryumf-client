/**
 * Created by marczak on 2017-03-18.
 */

import axios from 'axios';
import {API_PATH} from '../variables';
var qs = require('qs');
import setAuthorizationToken from '../utils/authorizationToken'

import jwtDecode from 'jwt-decode';
import {SET_CURRENT_USER} from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}


export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('group');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function userLoginRequest(loginData) {

    return dispatch => {
        return axios.post(API_PATH + 'login', qs.stringify(loginData)).then(res => {
            const token = res.data.token;
            const group = res.data.group;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('group', group);
            setAuthorizationToken(token);
            const user_obj = jwtDecode(token);
            user_obj.group = group;
            dispatch(setCurrentUser(user_obj));
        });
    }
}