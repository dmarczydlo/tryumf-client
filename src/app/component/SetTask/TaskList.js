/**
 * Created by marczak on 2017-04-01.
 */
import React from 'react'
import SingleTask from './SingleTask';
import Container from '../DNDObjects/Container';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import areIntlLocalesSupported from 'intl-locales-supported';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
let DateTimeFormat;


class TaskList extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            user_select: 0,
            userTasks: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.userTask[0] !== 'undefined') {
            this.setState(
                {
                    userTasks: nextProps.userTask
                }
            )
        } else {
            this.setState(
                {
                    userTasks: []
                }
            )
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

    handleUpdate = () =>{
        console.log('update');
    }

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
            <div>
                <div className="col-md-6 col-xs-12">
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
                        onChange={this.props.changeDate}
                    />
                    <h4>Lista zadań</h4>
                    <div className="list-group">
                        <Container id={1} list={this.props.tasks}/>
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
                                             primaryText={user.name + ' ' + user.surname}/>
                        })}
                    </SelectField>

                    <div>
                        <div>
                            <Container id={2} list={this.state.userTasks}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

TaskList.propTypes = {
    tasks: React.PropTypes.array.isRequired
}

TaskList.propTypes = {
    employee: React.PropTypes.array.isRequired
};


export default DragDropContext(HTML5Backend)(TaskList);