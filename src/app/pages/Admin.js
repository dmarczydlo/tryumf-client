/**
 * Created by marczak on 2017-03-18.
 */

import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import ActionDone from 'material-ui/svg-icons/action/done-all';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionBuild from 'material-ui/svg-icons/action/build';
import Accept from '../component/Accept/Accept';
import SwipeableViews from 'react-swipeable-views';
import ContainerReview from '../component/Review/ContainerReview';
import TaskContainer from '../component/SetTask/SetTaskContainer';
import AdminTasks from '../component/AdminTasks';
import {getUsersFromGroupRequest, getEmployeeTaskOnlineRequest,} from '../actions/employeeAction';
import {connect} from 'react-redux';
import {getTaskToSetRequest, getTasksListRequest, getAcceptedTasksListRequest} from '../actions/taskAction';
import {REFRESH_SET_DATA, REFRESH_VIEW_DATA} from '../variables';
import style from '../style/mail.scss';
import CircularProgress from 'material-ui/CircularProgress';
class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        };
        this.GROUP = this.props.group;
    }


    timer() {
        this.props.getAcceptedTasksListRequest();
        this.props.getTaskToSetRequest();
    }


    timer_online() {
        this.props.getEmployeeTaskOnlineRequest();
    }

    refreshDataBySet = () => {

        // this.timer();

        let internal_id = setInterval(() =>
            this.timer(), REFRESH_SET_DATA);

        let internal_id_online = setInterval(() =>
            this.timer_online(), REFRESH_VIEW_DATA);
    };

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    componentWillMount() {
        this.props.getTaskToSetRequest();
        this.props.getAcceptedTasksListRequest();
        if (this.GROUP == 'admin') {
            this.props.getTasksListRequest();
            this.props.getEmployeeTaskOnlineRequest(1);
        }
        if (this.GROUP == 'admin' || this.GROUP == 'kierownik grafiki')
            this.props.getUsersFromGroupRequest(2);

        if (this.GROUP == 'kierownik grafiki')
            this.props.getEmployeeTaskOnlineRequest(2);

        if (this.GROUP == 'admin' || this.GROUP == 'kierownik grawernii')
            this.props.getUsersFromGroupRequest(3);
        if (this.GROUP == 'kierownik grawernii')
            this.props.getEmployeeTaskOnlineRequest(3);

        this.refreshDataBySet();

    }


    render() {
        if (( this.GROUP == 'admin' && typeof this.props.tasks_set['graphic'] !== 'undefined'
            && typeof  this.props.accepted != 'undefined'
            && typeof this.props.tasks !== 'undefined'
            && typeof this.props.employee[2] !== 'undefined'
            && typeof this.props.employee[3] !== 'undefined')) {
            return (
                <div>
                    {adminItems(this.GROUP, this.handleChange, this.state.slideIndex, this.props.tasks, this.props.tasks_set, this.props.employee, this.props.onlineData,  this.props.accepted)}
                    {adminTabs(this.GROUP, this.handleChange, this.state.slideIndex)}
                </div>
            );
        }
        else if ((this.GROUP == 'kierownik grafiki' || this.GROUP == 'kierownik grawernii') &&
            typeof  this.props.accepted != 'undefined' &&
            (this.GROUP == 'kierownik grafiki' ?
                typeof this.props.tasks_set['graphic'] !== 'undefined' :
                typeof this.props.tasks_set['graver'] !== 'undefined') &&
            (this.GROUP == 'kierownik grafiki' ?
                    typeof this.props.employee[2] !== 'undefined' :
                    typeof this.props.employee[3] !== 'undefined'
            )
        ) {
            return (
                <div>
                    {adminItems(this.GROUP, this.handleChange, this.state.slideIndex, this.props.tasks, this.props.tasks_set, this.props.employee, this.props.onlineData, this.props.accepted)}
                    {adminTabs(this.GROUP, this.handleChange, this.state.slideIndex)}
                </div>
            );
        }
        else {
            return <div className={style.blockCenter}><CircularProgress size={100} thickness={5}/></div>
        }
    }
}

function adminTabs(GROUP, handleChange, slideIndex) {
    if (GROUP == 'admin') {
        return (
            <Tabs
                onChange={handleChange}
                value={slideIndex}
            >
                <Tab
                    icon={<ActionBuild />}
                    value={0}
                    label="Lista zadań"
                />
                <Tab
                    icon={<SocialPersonAdd />}
                    value={1}
                    label="Zadania Grafika"
                />
                <Tab
                    icon={<SocialPersonAdd />}
                    value={2}
                    label="Zadania Grawernia"
                />
                <Tab
                    icon={<MapsPersonPin />}
                    value={3}
                    label="Kontrola"
                />
                <Tab
                    icon={<ActionDone />}
                    value={4}
                    label="Zadania zaakceptowane"
                />
            </Tabs>
        );
    } else if (GROUP == 'kierownik grafiki') {
        return (
            <Tabs
                onChange={handleChange}
                value={slideIndex}
            >

                <Tab
                    icon={<SocialPersonAdd />}
                    value={0}
                    label="Zadania Grafika"
                />
                <Tab
                    icon={<MapsPersonPin />}
                    value={1}
                    label="Kontrola"
                />
                <Tab
                    icon={<ActionDone />}
                    value={2}
                    label="Zadania zaakceptowane"
                />
            </Tabs>
        );
    }
    else if (GROUP == 'kierownik grawernii') {
        return (
            <Tabs
                onChange={handleChange}
                value={slideIndex}
            >

                <Tab
                    icon={<SocialPersonAdd />}
                    value={0}
                    label="Zadania Grawernia"
                />

                <Tab
                    icon={<MapsPersonPin />}
                    value={1}
                    label="Kontrola"
                />

                <Tab
                    icon={<ActionDone />}
                    value={2}
                    label="Zadania zaakceptowane"
                />

            </Tabs>
        );
    }
}

function adminItems(GROUP, handleChange, slideIndex, tasks, tasks_set, employee, onlineData, accepted) {

    if (GROUP == 'admin') {
        return (
            <SwipeableViews
                index={slideIndex}
                onChangeIndex={handleChange}>
                <div>
                    <AdminTasks tasks={tasks}/>
                </div>
                <div>
                    <TaskContainer tasks={tasks_set['graphic']} employee={employee[2]}/>
                </div>
                <div>
                    <TaskContainer tasks={tasks_set['graver']} employee={employee[3]}/>
                </div>
                <div>
                    <ContainerReview type={'admin'} onlineData={onlineData}/>
                </div>

                <div>
                    <Accept acceptData={accepted}/>
                </div>


            </SwipeableViews>

        );
    }

    else if (GROUP == 'kierownik grafiki') {
        return (
            <SwipeableViews
                index={slideIndex}
                onChangeIndex={handleChange}>
                <div>
                    <TaskContainer tasks={tasks_set['graphic']} employee={employee[2]}/>
                </div>
                <div>
                    <ContainerReview type={'graphic'} onlineData={onlineData}/>
                </div>

                <div>
                    <Accept acceptData={accepted}/>
                </div>

            </SwipeableViews>
        );

    }
    else if (GROUP == 'kierownik grawernii') {
        return (
            <SwipeableViews
                index={slideIndex}
                onChangeIndex={handleChange}>
                <div>
                    <TaskContainer tasks={tasks_set['graver']} employee={employee[3]}/>
                </div>

                <div>
                    <ContainerReview type={'graver'} onlineData={onlineData}/>
                </div>

                <div>
                    <Accept acceptData={accepted}/>
                </div>

            </SwipeableViews>
        );
    }
};


function mapStateToProps(state) {
    return {
        tasks_set: state.settasks,
        tasks: state.tasks,
        employee: state.employee,
        onlineData: state.online,
        accepted: state.accept
    };
}

Admin.propTypes = {
    getTaskToSetRequest: React.PropTypes.func.isRequired,
    getTasksListRequest: React.PropTypes.func.isRequired,
    getUsersFromGroupRequest: React.PropTypes.func.isRequired,
    getEmployeeTaskOnlineRequest: React.PropTypes.func.isRequired,
    getAcceptedTasksListRequest: React.PropTypes.func.isRequired
};


export default connect(mapStateToProps, {
    getTaskToSetRequest,
    getTasksListRequest,
    getUsersFromGroupRequest,
    getEmployeeTaskOnlineRequest,
    getAcceptedTasksListRequest
})(Admin);