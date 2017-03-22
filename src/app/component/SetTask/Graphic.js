/**
 * Created by marczak on 2017-03-21.
 */

import React from 'react';

import {connect} from 'react-redux';
import {getUsersFromGroupRequest} from '../../actions/employeeAction';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
class Graphic extends React.Component {

    componentWillMount() {
        this.props.getUsersFromGroupRequest(2).then((res) => {
            console.log(this.props);
            this.setState({employee: this.props.employee});
        });
    }

    constructor(props) {
        super(props)
        this.state = {
            user_select: 0,
            employee: []
        }
    }

    handleUserChange = (event, index, value) => {
        this.setState({user_select: value})
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
                    {this.state.employee.map(function (user) {
                        return <MenuItem key={user.id} value={user.id} primaryText={user.name + ' ' + user.surname}/>
                    })}
                </SelectField>

            </div>
        );
    };
}

Graphic.propTypes = {
    getUsersFromGroupRequest: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        employee: state.employee[2]
    };
}


export default connect(mapStateToProps, {getUsersFromGroupRequest})(Graphic);
