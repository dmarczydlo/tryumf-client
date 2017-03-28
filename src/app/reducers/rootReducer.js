import {combineReducers} from 'redux';

import auth from './auth';
import users from './users';
import tasks from './tasks';
import employee from './employee';
import user from './user';
import work from './work';

export default combineReducers({
    auth,
    users,
    tasks,
    employee,
    user,
    work
});