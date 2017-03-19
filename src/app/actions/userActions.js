/**
 * Created by marczak on 2017-03-19.
 */
import axios from 'axios';
import {API_PATH} from '../variables';
import {GET_USER_LIST} from './types';

export function getUserList(users) {
    return {
        type: GET_USER_LIST,
        users
    }
}

export function getUserListRequest() {

    return dispatch => {
        return axios.get(API_PATH + 'user/all').then(res => {
            dispatch(getUserList(res.data.users));

        });
    }
}