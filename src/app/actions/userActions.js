/**
 * Created by marczak on 2017-03-19.
 */
import axios from '../provider/axios';
import {API_PATH} from '../variables';
import {GET_USER_LIST,GET_USER_DATA,ADD_USER_DATA, GET_USERS_FROM_GROUP, UPDATE_USER_DATA} from './types';
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
    return dispatch => {
        return axios.post(API_PATH + 'user/update/' + user.id, qs.stringify(user)).then(res => {
            dispatch(updateUserData(user));
        });
    }
}

export function addUserDataRequest(user) {
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

export function deleteUserRequest(user_id)
{
    return dispatch => {
        return axios.delete(API_PATH + 'user/delete/' + user_id).then(res => {

        });
    }
}

export function updateProfileRequest(user_id,user_data)
{
    return dispatch => {
        return axios.post(API_PATH + 'user/update_profile/' + user_id, qs.stringify(user_data)).then(res => {
        });
    }
}



