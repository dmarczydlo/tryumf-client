import {GET_TASKS_LIST,SET_TASK_USER} from '../actions/types';


const initialState = []

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_TASKS_LIST:
            return Object.assign([], state, action.tasks);

        case SET_TASK_USER:
            return action.tasks;



        default:
            return state;
    }


}