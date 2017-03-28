import {START_TASK, STOP_TASK} from '../actions/types';


const initialState = {}

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case START_TASK: {
            return {
                ...state,
                [action.work.task_id]: action.work.time_id
            };
        }


        // case STOP_TASK: {
        //     return Object.assign([], state, action.user);
        // }


        default:
            return state;
    }


}
