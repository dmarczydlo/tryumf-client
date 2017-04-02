/**
 * Created by marczak on 2017-03-21.
 */
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from '../DNDObjects/Container';

class EmployeeRightSide extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            user_select: 0
        }
    }

    handleUserChange = (event, index, value) => {
        this.setState({user_select: value})
        this.props.changeUser(value);
    };

    render() {

        return (
            <div>
                <SelectField
                    ref='graphic_user_id'
                    floatingLabelText='Pracownik'
                    value={this.state.user_select}
                    name='graphic_user_id'
                    onChange={this.handleUserChange}
                    fullWidth={true}
                    autoWidth={true}
                >
                    {this.props.employee && this.props.employee.map(function (user) {
                        return <MenuItem key={user.id} value={user.id}
                                         primaryText={user.name + ' ' + user.surname}/>
                    })}
                </SelectField>

                <div>
                    <div>
                        <Container id={2} list={this.props.userTasks}  />
                    </div>
                </div>

            </div>
        );
    };
}

EmployeeRightSide.propTypes = {
    employee: React.PropTypes.array.isRequired
};

export default DragDropContext(HTML5Backend)(EmployeeRightSide);