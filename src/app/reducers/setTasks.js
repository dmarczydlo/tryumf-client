/**
 * Created by marczak on 2017-03-30.
 */
import {GET_TASKS_TO_SET} from '../actions/types';


const initialState = {}
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_TASKS_TO_SET:
            return Object.assign({}, state, action.settasks);
        default:
            return state;
    }
}