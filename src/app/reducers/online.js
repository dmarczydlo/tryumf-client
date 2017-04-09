/**
 * Created by marczak on 2017-04-09.
 */
import {GET_EMPLOYEE_TASKS} from '../actions/types';


const initialState = [];

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_EMPLOYEE_TASKS:

            return Object.assign([], state, action.data);

        default:
            return state;
    }

}
