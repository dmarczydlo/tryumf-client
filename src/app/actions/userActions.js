/**
 * Created by marczak on 2017-03-19.
 */
import axios from 'axios';
import {API_PATH} from '../variables';
import {GET_USER_LIST} from './types';
import {GET_USER_DATA} from './types';
import {UPDATE_USER_DATA} from './types';
import {ADD_USER_DATA} from './types';
var qs = require('qs');

export function getUserList(users) {
    return {
        type: GET_USER_LIST,
        users
    }
}

export function getUserData(user) {
    return {
        type: GET_USER_DATA,
        user
    }
}

export function updateUserData(user) {
    return {
        type: UPDATE_USER_DATA,
        user
    }
}

export function addUserData(user) {
    return {
        type: ADD_USER_DATA,
        user
    }
}

export function updateUserDataRequest(user) {
    console.log('UPDATE WORK');
    return dispatch => {
        return axios.post(API_PATH + 'user/update/' + user.id, qs.stringify(user)).then(res => {
            dispatch(updateUserData(user));
        });
    }
}

export function addUserDataRequest(user) {
    console.log('ADD WORK');
    return dispatch => {
        return axios.put(API_PATH + 'user/create', qs.stringify(user)).then(res => {
            dispatch(addUserData(user));
        });
    }
}

export function getUserListRequest() {

    return dispatch => {
        return axios.get(API_PATH + 'user/all').then(res => {
            dispatch(getUserList(res.data.users));

        });
    }
}
export function getUserDataRequest(user_id) {

    return dispatch => {
        return axios.get(API_PATH + 'user/get/' + user_id).then(res => {
            dispatch(getUserData(res.data.user));
        });
    }
}

