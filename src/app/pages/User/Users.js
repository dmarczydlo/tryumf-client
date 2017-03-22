/**
 * Created by marczak on 2017-03-18.
 */

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {getUserListRequest} from '../../actions/userActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Link} from 'react-router';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import style from '../../style/mail.scss';
import {deleteUserRequest} from '../../actions/userActions';

class LinkFormatter extends React.Component {
    render() {
        return (
            <RaisedButton primary={true} href={'/#/users/edit/' + this.props.link} icon={<EditIcon />}/>
        );
    }
}

function linkFormatter(cell) {
    return (
        <LinkFormatter link={ cell }/>
    );
}

class Users extends React.Component {
    componentWillMount() {
        this.props.getUserListRequest();
    }

    onDeleteRow = (rows) => {

        this.props.deleteUserRequest(rows).then(
            (res) => {
            },
            (err) => {
                console.log(err.response.data.error);
            }
        )


    };

    render() {



        function onRowSelect(row, isSelected) {
            console.log(row);
            console.log(isSelected);
        };

        function onSelectAll(isSelected, rows) {
            console.log(rows);
            console.log(isSelected);
        };


        const options = {
            onDeleteRow: this.onDeleteRow
        };

        const selectRowProp = {
            mode: 'checkbox',
            // className: style.table_user_selected,
            clickToSelect: true,
            onSelect: onRowSelect,
            onSelectAll: onSelectAll
        };

        return (
            <div className={style.container}>
                <BootstrapTable tableStyle={ {width: '100%'} } data={this.props.users} striped hover
                                selectRow={ selectRowProp } options={ options } deleteRow
                                search multiColumnSearch>
                    <TableHeaderColumn width='5%' dataSort={true} isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='name'>Imię</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='surname'>Nazwisko</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='group'>Grupa</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn width='10%' dataSort={true} dataField='level'>Poziom</TableHeaderColumn>
                    <TableHeaderColumn width='5%' dataField='id' dataFormat={ linkFormatter }>#</TableHeaderColumn>
                </BootstrapTable>

                <FloatingActionButton containerElement={<Link to={"/users/add/"}/>}>
                    <ContentAdd />
                </FloatingActionButton>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

Users.propTypes = {
    getUserListRequest: React.PropTypes.func.isRequired
}

Users.propTypes = {
    deleteUserRequest: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {getUserListRequest, deleteUserRequest})(Users);