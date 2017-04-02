/**
 * Created by marczak on 2017-03-21.
 */

import React from 'react';
import TaskContainer from '../SetTask/SetTaskContainer';
class AdminSetGraver extends React.Component {


    render() {

        return (
            <div>
                <TaskContainer  tasks={this.props.tasks} employee={this.props.employee}/>
            </div>
        );
    };
}

AdminSetGraver.propTypes = {
    employee: React.PropTypes.array.isRequired
};

AdminSetGraver.propTypes = {
    tasks: React.PropTypes.array.isRequired
};

export default AdminSetGraver;