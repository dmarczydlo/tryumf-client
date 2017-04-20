/**
 * Created by marczak on 2017-03-21.
 */


import {GET_USER_DATA, ADD_USER_DATA, UPDATE_USER_DATA} from '../actions/types';


const initialState = []

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case GET_USER_DATA: {
            return Object.assign([], state, action.user);
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