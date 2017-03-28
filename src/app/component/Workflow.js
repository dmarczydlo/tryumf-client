/**
 * Created by marczak on 2017-03-20.
 */
import React from 'react';


import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import {getTaskTodayRequest, startTaskUserRequest,stopTaskUserRequest} from '../actions/taskAction';

import WorkflowElem from './WorkflowElem';
const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="Akcje"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400}/>
    </IconButton>
);


class Workflow extends React.Component {

    handleChangeBlock = (type) => {
        if (type == 'start') {
            this.setState(
                {
                    block_all: true
                }
            )
        } else {
            this.setState(
                {
                    block_all: false
                }
            )
        }
    };

    constructor(props) {
        super(props);
        this.state =
            {
                block_all: false
            }

        this.props.getTaskTodayRequest(this.props.user_id).then(

        );
    }


    render() {
        return (
            <div className="list-group">
                {this.props.tasks.map((task, i) => <WorkflowElem {... this.props}
                                                                 onClick={this.handleChangeBlock.bind(this)}
                                                                 block={this.state.block_all} key={i} i={i}
                                                                 task={task}/>)}
            </div>

        );
    }

}

function mapStateToProps(state) {

    console.log('state');
    console.log(state);
    return {
        tasks: state.tasks,
        user_id: state.auth.user.sub,
        work: state.work
    };
}

Workflow.propTypes = {
    getTaskTodayRequest: React.PropTypes.func.isRequired
}
Workflow.propTypes = {
    startTaskUserRequest: React.PropTypes.func.isRequired
}

Workflow.propTypes = {
    stopTaskUserRequest: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {getTaskTodayRequest, startTaskUserRequest,stopTaskUserRequest})(Workflow);