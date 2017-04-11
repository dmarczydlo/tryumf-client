/**
 * Created by marczak on 2017-03-20.
 */
import React from 'react';

import {connect} from 'react-redux';
import {
    getTaskTodayRequest,
    startTaskUserRequest,
    stopTaskUserRequest,
    acceptTaskUserRequest
} from '../actions/taskAction';
import WorkflowElem from './WorkflowElem';
import Alert from './Alert';
import style from '../style/mail.scss';
import CircularProgress from 'material-ui/CircularProgress';
import {MAX_WORK_TIME} from '../variables';

class Workflow extends React.Component {

    getSumTime = () => {
        const sumTime = Object.keys(this.props.tasks).reduce((acc, value) => acc + this.props.tasks[value].time, 0)
        if (sumTime > MAX_WORK_TIME)
            return false;
        else return true;
    };


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
    }


    componentWillMount() {
        this.props.getTaskTodayRequest(this.props.user_id);
        if (!this.getSumTime())
            this.block_all({
                block: true
            })
    }

    render() {

        if (typeof this.props.tasks !== 'undefined') {
            return (

                <div className="list-group">
                    {this.props.tasks.map((task, i) => <WorkflowElem {... this.props}
                                                                     onClick={this.handleChangeBlock.bind(this)}
                                                                     block={this.state.block_all} key={i} i={i}
                                                                     task={task}
                                                                     blockAccept={this.props.type == 'grawernia' ? task.graphic_block : false }
                        />
                    )}

                    {this.props.tasks.length == 0 &&
                    <Alert display={true} message="Brak przypisanych zadań na dziś" type="info"/>

                    }
                </div>
            );
        }
        else {

            return <div className={style.blockCenter}><CircularProgress size={100} thickness={5}/></div>

        }
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.userTask,
        user_id: state.auth.user.sub,
    };
}


Workflow.propTypes = {
    startTaskUserRequest: React.PropTypes.func.isRequired,
    getTaskTodayRequest: React.PropTypes.func.isRequired,
    stopTaskUserRequest: React.PropTypes.func.isRequired,
    acceptTaskUserRequest: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    getTaskTodayRequest,
    startTaskUserRequest,
    stopTaskUserRequest,
    acceptTaskUserRequest
})(Workflow);