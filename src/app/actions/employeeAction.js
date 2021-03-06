/**
 * Created by marczak on 2017-03-21.
 */

import axios from '../provider/axios';
import {API_PATH} from '../variables';
import {GET_USERS_FROM_GROUP,GET_EMPLOYEE_TASKS} from './types';
var qs = require('qs');


export function getUsersFromGroup(employee, group_id) {
    return {
        type: GET_USERS_FROM_GROUP,
        employee,
        group_id
    }
}

export function getEmployeeOnlineData(data) {
    return {
        type: GET_EMPLOYEE_TASKS,
        data
    }
}


export function getUsersFromGroupRequest(group_id) {

    return dispatch => {
        return axios.get(API_PATH + 'user/users_from_group/' + group_id).then(res => {
            dispatch(getUsersFromGroup(res.data.users, group_id));
        });
    }
}

export function getEmployeeTaskOnlineRequest() {
    return dispatch => {
        return axios.get(API_PATH + 'task/online_data').then(res => {
            dispatch(getEmployeeOnlineData(res.data.data));
        });
    }
}