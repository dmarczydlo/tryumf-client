/**
 * Created by marczak on 2017-03-21.
 */
import {GET_USERS_FROM_GROUP} from '../actions/types';
const initialState = []


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_USERS_FROM_GROUP: {
            return {
                ...state,
                [action.group_id]: action.employee
            };
        }

        default:
            return state;
    }
}