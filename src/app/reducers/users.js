import {GET_USER_LIST} from '../actions/types';
import {GET_USER_DATA} from '../actions/types';
import {ADD_USER_DATA} from '../actions/types';
import {UPDATE_USER_DATA} from '../actions/types';


const initialState = []

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_USER_LIST:
            return Object.assign([], state, action.users);
        case GET_USER_DATA: {
            return action.user;
        }

        case ADD_USER_DATA: {
            return Object.assign([], state, action.user);
        }

        case UPDATE_USER_DATA: {
            return Object.assign([], state, action.user);
        }


        default:
            return state;
    }


}