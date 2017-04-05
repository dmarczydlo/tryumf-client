/**
 * Created by marczak on 2017-03-18.
 */

import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionBuild from 'material-ui/svg-icons/action/build';


import SwipeableViews from 'react-swipeable-views';
import AdminReview from '../component/AdminReview';
import TaskContainer from '../component/SetTask/SetTaskContainer';
import AdminTasks from '../component/AdminTasks';
import {getUsersFromGroupRequest} from '../actions/employeeAction';
import {connect} from 'react-redux';
import {getTaskToSetRequest, getTasksListRequest} from '../actions/taskAction';
import {REFRESH_SET_DATA, REFRESH_VIEW_DATA} from '../variables';


class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            setTime: REFRESH_SET_DATA / 1000,
            setTimeID: 0
        };
        this.GROUP = this.props.group;
    }


    timer() {
        clearInterval(this.state.setTimeID);
        this.setState({
            setTime: REFRESH_SET_DATA / 1000
        });

        let internal_id = setInterval(() =>
            this.setState({
                setTime: this.state.setTime - 1
            }), 1000);

        this.props.getTaskToSetRequest();

        this.setState({
            setTimeID: internal_id
        })
    }


    refreshDataBySet = () => {

        // this.timer();
        //
        // let internal_id = setInterval(() =>
        //     this.timer(), REFRESH_SET_DATA);
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    componentWillMount() {
        this.props.getTaskToSetRequest();
        if (this.GROUP == 'admin')
            this.props.getTasksListRequest();
        if (this.GROUP == 'admin' || this.GROUP == 'kierownik grafiki')
            this.props.getUsersFromGroupRequest(2);
        if (this.GROUP == 'admin' || this.GROUP == 'kierownik grawernii')
            this.props.getUsersFromGroupRequest(3);

        this.refreshDataBySet();

    }


    render() {
        if (( this.GROUP == 'admin' && typeof this.props.tasks_set['graphic'] !== 'undefined'
            && typeof this.props.tasks !== 'undefined'
            && typeof this.props.employee[2] !== 'undefined'
            && typeof this.props.employee[3] !== 'undefined')) {
            return (
                <div>
                    {adminItems(this.GROUP, this.handleChange, this.state.slideIndex, this.props.tasks, this.props.tasks_set, this.props.employee, this.state.setTime)}
                    {adminTabs(this.GROUP, this.handleChange, this.state.slideIndex)}
                </div>
            );
        }
        else if ((this.GROUP == 'kierownik grafiki' || this.GROUP == 'kierownik grawernii') &&
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
                    {adminItems(this.GROUP, this.handleChange, this.state.slideIndex, this.props.tasks, this.props.tasks_set, this.props.employee, this.state.setTime)}
                    {adminTabs(this.GROUP, this.handleChange, this.state.slideIndex)}
                </div>
            );
        }
        else {
            return <div>Loading</div>
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
            </Tabs>
        );
    }
}

function adminItems(GROUP, handleChange, slideIndex, tasks, tasks_set, employee, timer) {

    if (GROUP == 'admin') {
        return (
            <SwipeableViews
                index={slideIndex}
                onChangeIndex={handleChange}>
                <div>
                    <AdminTasks tasks={tasks}/>
                </div>
                <div>
                    <TaskContainer timer={timer}  tasks={tasks_set['graphic']} employee={employee[2]}/>
                </div>
                <div>
                    <TaskContainer timer={timer}  tasks={tasks_set['graver']} employee={employee[3]}/>
                </div>
                <div>
                    <AdminReview/>
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
                    <TaskContainer timer={timer}  tasks={tasks_set['graphic']} employee={employee[2]}/>
                </div>
                <div>
                    <AdminReview/>
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
                    <TaskContainer timer={timer}  tasks={tasks_set['graver']} employee={employee[3]}/>
                </div>

                <div>
                    <AdminReview/>
                </div>

            </SwipeableViews>
        );
    }
};


function mapStateToProps(state) {
    return {
        tasks_set: state.settasks,
        tasks: state.tasks,
        employee: state.employee
    };
}

Admin.propTypes = {
    getTasksListRequest: React.PropTypes.func.isRequired
};

Admin.propTypes = {
    getTaskToSetRequest: React.PropTypes.func.isRequired
};


export default connect(mapStateToProps, {getTaskToSetRequest, getTasksListRequest, getUsersFromGroupRequest})(Admin);