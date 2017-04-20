/**
 * Created by marczak on 2017-04-09.
 */
import {GET_ACCEPTED_TASKS} from '../actions/types';


const initialState = [];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ACCEPTED_TASKS:
            return Object.assign([], state, action.tasks);

        default:
            return state;
    }


}
