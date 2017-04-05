/**
 * Created by marczak on 2017-04-01.
 */
import React from 'react'
import Container from '../DNDObjects/Container';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import areIntlLocalesSupported from 'intl-locales-supported';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import style from '../../style/mail.scss';
let DateTimeFormat;

class TaskList extends React.Component {


    constructor(props) {
        super(props);
        let date = new Date();
        let isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);

        this.state = {
            user_select: 0,
            userTasks: [],
            lastUser: 0,
            loading_right: false,
            date: isoDate
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props.userTask);

        this.setState({
            loading_right: true
        });
        if (typeof nextProps.userTask[0] !== 'undefined') {
            if (this.state.user_select != this.state.lastUser) {
                console.log('zmiana z ' + this.state.lastUser + ' na ' + this.state.user_select);
                this.setState(
                    {
                        userTasks: nextProps.userTask,
                        lastUser: this.state.user_select,
                        loading_right: false
                    }
                );

                this.child.changeUserData(nextProps.userTask);
            }
        } else {
            if (this.state.user_select != this.state.lastUser) {
                this.setState(
                    {
                        userTasks: [],
                        lastUser: this.state.user_select,
                        loading_right: false
                    }
                );
                this.child.changeUserData([]);
            }
        }
    }

    handleUserChange = (event, index, value) => {
        this.setState({user_select: value})
        this.props.changeUser(value);
    };


    getMaxDate() {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDay() + 7);

        return maxDate;
    }

    handleChangeDate = (event, date) => {

        let isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
        this.props.changeDate(isoDate);
        this.setState({
            date: isoDate
        })
    };


    render() {

        const minDate = new Date();


        if (areIntlLocalesSupported(['pl', 'pl-PL'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        } else {
            const IntlPolyfill = require('intl');
            DateTimeFormat = IntlPolyfill.DateTimeFormat;
            require('intl/locale-data/jsonp/pl');
            require('intl/locale-data/jsonp/pl-PL');
        }

        return (
            <div className={style.containerDND}>
                <div className="col-md-6 col-xs-12">
                    <label className={style.label}>Data</label>
                    <DatePicker
                        minDate={minDate}
                        maxDate={this.getMaxDate()}
                        DateTimeFormat={DateTimeFormat}
                        okLabel="OK"
                        cancelLabel="Anuluj"
                        locale="pl-PL"
                        hintText="Data zadania"
                        mode="landscape"
                        defaultDate={minDate}
                        ref="schedule_day"
                        onChange={this.handleChangeDate}
                    />
                    <h4 className={style.center}>Dostępne zadania</h4>
                    <div className="list-group">
                        <Container loading={false} id={1} list={this.props.tasks}/>
                    </div>
                </div>

                <div className="col-md-6 col-xs-12">
                    <SelectField
                        ref='graphic_user_id'
                        floatingLabelText='Pracownik'
                        value={this.state.user_select}
                        name='graphic_user_id'
                        onChange={this.handleUserChange}
                        fullWidth={true}
                        autoWidth={true}
                    >
                        {this.props.employee.map(function (user) {
                            return <MenuItem key={user.id} value={user.id}
                                             primaryText={user.name + ' ' + user.surname + ' [' + user.level + ']'}/>
                        })}
                    </SelectField>

                    <div>
                        <div>
                            <h4 className={style.center}>Przydzielone zadania</h4>
                            <Container date={this.state.date} loading={this.state.loading_right} id={2}
                                       onRef={ref => (this.child = ref)}
                                       user_id={this.state.user_select}
                                       list={this.props.userTask}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

TaskList
    .propTypes = {
    tasks: React.PropTypes.array.isRequired
}

TaskList
    .propTypes = {
    employee: React.PropTypes.array.isRequired
};


export
default

DragDropContext(HTML5Backend)(TaskList);