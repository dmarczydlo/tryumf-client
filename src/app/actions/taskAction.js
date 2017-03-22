/**
 * Created by marczak on 2017-03-21.
 */

import {GET_TASKS_LIST} from './types';

import axios from 'axios';
var qs = require('qs');
import {API_PATH} from '../variables';
export function getTasksList(tasks) {
    return {
        type: GET_TASKS_LIST,
        tasks
    }
}
export function getTasksListRequest() {
    return dispatch => {
        return axios.get(API_PATH + 'task/all').then(res => {
            dispatch(getTasksList(res.data.tasks));
        });
    }
}


