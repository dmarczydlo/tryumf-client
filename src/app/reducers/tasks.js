import {GET_TASKS_LIST} from '../actions/types';


const initialState = []

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_TASKS_LIST:
            return Object.assign([], state, action.tasks);



        default:
            return state;
    }


}