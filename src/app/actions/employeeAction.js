/**
 * Created by marczak on 2017-03-21.
 */

import axios from 'axios';
import {API_PATH} from '../variables';
import { GET_USERS_FROM_GROUP} from './types';
var qs = require('qs');


export function getUsersFromGroup(employee, group_id) {
    return {
        type: GET_USERS_FROM_GROUP,
        employee,
        group_id
    }
}

export function getUsersFromGroupRequest(group_id) {

    return dispatch => {
        return axios.get(API_PATH + 'user/users_from_group/' + group_id).then(res => {
            dispatch(getUsersFromGroup(res.data.users,group_id));
        });
    }
}