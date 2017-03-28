/**
 * Created by marczak on 2017-03-21.
 */

import {GET_TASKS_LIST, SET_TASK_USER, START_TASK, STOP_TASK} from './types';

import axios from '../provider/axios';
var qs = require('qs');
import {API_PATH} from '../variables';
import getToday from '../utils/date_helper';
export function getTasksList(tasks) {
    return {
        type: GET_TASKS_LIST,
        tasks
    }
}

export function setTaskUser(tasks) {
    return {
        type: SET_TASK_USER,
        tasks
    }

}

export function startTaskUser(time_id, task_id) {
    console.log('action' + time_id + ' ' + task_id);
    return {
        type: START_TASK,
        work: {time_id, task_id}
    }
}


export function getTasksListRequest() {
    return dispatch => {
        return axios.get(API_PATH + 'task/all').then(res => {
            dispatch(getTasksList(res.data.tasks));
        });
    }
}

export function getTaskTodayRequest(user_id) {
    return dispatch => {

        const day = getToday();
        return axios.get(API_PATH + 'task/user_at_day/' + user_id + '/' + day).then(res => {
            dispatch(setTaskUser(res.data.tasks));
        });
    }
}

export function startTaskUserRequest(user_data) {
    return dispatch => {
        return axios.post(API_PATH + 'task/start_task', qs.stringify(user_data)).then(res => {
            dispatch(startTaskUser(res.data.time_id, res.data.task_id));
        });
    }
}

export function stopTaskUserRequest(task_id)
{
    return dispatch => {
        return axios.post(API_PATH + 'task/stop_task', qs.stringify(task_id)).then(res => {
        });
    }
}


