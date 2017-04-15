/**
 * Created by marczak on 2017-04-09.
 */
import {GET_TASK_DETAIL} from '../actions/types';

const initialState = [];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_TASK_DETAIL:
            return Object.assign([], state, action.task);

        default:
            return state;
    }
}


