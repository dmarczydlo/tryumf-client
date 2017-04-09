import {combineReducers} from 'redux';

import auth from './auth';
import users from './users';
import tasks from './tasks';
import employee from './employee';
import user from './user';
import work from './work';
import settasks from './setTasks';
import userTask from './userTask';
import online from './online';

export default combineReducers({
    auth,
    users,
    tasks,
    employee,
    user,
    work,
    settasks,
    userTask,
    online
});