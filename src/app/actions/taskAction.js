/**
 * Created by marczak on 2017-03-21.
 */

import {GET_TASKS_LIST, SET_TASK_USER, START_TASK, ACCEPT_TASK, GET_TASKS_TO_SET} from './types';

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

export function setTaskUser(userTasks) {
    return {
        type: SET_TASK_USER,
        userTasks
    }

}

export function startTaskUser(time_id, task_id) {
    return {
        type: START_TASK,
        work: {time_id, task_id}
    }
}

export function acceptTaskUser(task_id, i) {
    return {
        type: ACCEPT_TASK,
        task_id,
        i
    }
}

export function getTasksToSet(settasks) {
    return {
        type: GET_TASKS_TO_SET,
        settasks
    }
}


export function getTasksListRequest() {
    return dispatch => {
        return axios.get(API_PATH + 'task/all').then(res => {
            dispatch(getTasksList(res.data.tasks));
        });
    }
}

export function getTaskTodayRequest(user_id, date = getToday()) {
    return dispatch => {

        return axios.get(API_PATH + 'task/user_at_day/' + user_id + '/' + date).then(res => {
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

export function stopTaskUserRequest(task_id) {
    return dispatch => {
        return axios.post(API_PATH + 'task/stop_task', qs.stringify({id: task_id}));
    }
}
export function acceptTaskUserRequest(task_id, i) {
    return dispatch => {
        return axios.post(API_PATH + 'task/accept_task', qs.stringify({id: task_id}));
    }
}

export function getTaskToSetRequest() {
    return dispatch => {
        return axios.get(API_PATH + 'task/get_new').then(res => {
            dispatch(getTasksToSet(res.data.tasks));
        });
    }
}
export function setTaskToUserRequest(task_id, user_id, schedule_day) {
    return axios.post(API_PATH + 'task/set_task', qs.stringify({task_id, user_id, schedule_day}));
}

export function removeTaskToUserRequest(task_id,user_id,schedule_day) {
    return axios.post(API_PATH + 'task/remove_task', qs.stringify({task_id, user_id, schedule_day}));

}

export function moveTaskToUserRequest(task_id, user_id, schedule_day, order_num) {
    return axios.post(API_PATH + 'task/move_task', qs.stringify({task_id, user_id, schedule_day, order_num}));
}

