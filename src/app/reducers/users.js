import {GET_USER_LIST} from '../actions/types';

const initialState = []

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_USER_LIST:
            return Object.assign([], state, action.users);
        default:
            return state;
    }




}