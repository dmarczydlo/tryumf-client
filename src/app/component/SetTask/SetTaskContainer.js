/**
 * Created by marczak on 2017-04-01.
 */
import React from 'react'
import TaskList from './TaskList';
import EmployeeRightSide from './EmployeeRightSide';
import {connect} from 'react-redux';
import {getTaskTodayRequest} from '../../actions/taskAction';

class SetTaskContainer extends React.Component {

    newTaskList = (user_id, schedule_day) => {
        this.props.getTaskTodayRequest(user_id, schedule_day).then(

        );
    };

    // componentWillUpdate(nextProps, nextState) {
    //     if (nextState.user_id != null) {
    //         this.newTaskList(nextState.user_id, nextState.schedule_day);
    //     }
    // }


    changeDate = (event, date) => {
        let isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
        this.setState(
            {
                schedule_day: isoDate
            }
        );
        this.newTaskList(this.state.user_id, isoDate);
    };

    changeUser = (value) => {
        this.setState(
            {
                user_id: value
            }
        );
        this.newTaskList(value, this.state.schedule_day);

    };

    constructor(props) {
        super(props);
        let today = new Date()
        this.state = {
            schedule_day: new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
            user_id: null
        }
    }

    render() {
        return (
            <div>
                <TaskList
                    tasks={this.props.tasks}
                    changeDate={this.changeDate}
                    userTask={this.props.userTask} employee={this.props.employee}
                    changeUser={this.changeUser}
                />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        userTask: state.userTask
    };
}

SetTaskContainer.propTypes = {
    getTaskTodayRequest: React.PropTypes.func.isRequired
};

SetTaskContainer.propTypes = {
    employee: React.PropTypes.array.isRequired
};

SetTaskContainer.propTypes = {
    tasks: React.PropTypes.array.isRequired
};


export default connect(mapStateToProps, {getTaskTodayRequest})(SetTaskContainer);