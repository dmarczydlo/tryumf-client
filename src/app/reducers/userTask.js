/**
 * Created by marczak on 2017-04-01.
 */

import {SET_TASK_USER,ACCEPT_TASK} from '../actions/types';


const initialState = []

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case SET_TASK_USER:
            return action.userTasks;

        case ACCEPT_TASK: {
            let head = [...state.slice(0, action.i)];
            let tail = [...state.slice(action.i + 1)];
            let ret = head.concat(tail);
            return ret;
        }


        default:
            return state;
    }
}
