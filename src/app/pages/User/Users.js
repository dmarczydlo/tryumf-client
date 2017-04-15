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
import {deleteUserRequest} from '../../actions/userActions';
import style from '../../style/mail.scss';

class LinkFormatter extends React.Component {
    render() {
        return (
            <RaisedButton className={style.buttonEdit} primary={true} containerElement={<Link to={"/users/edit/"+ this.props.link}/>}  icon={<EditIcon />}/>
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

        };

        function onSelectAll(isSelected, rows) {

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
            <div className={style.table_my + ' col-xs-12'}>
                <BootstrapTable tableStyle={ {width: '100%'} } data={this.props.users} striped hover
                                selectRow={ selectRowProp } options={ options } deleteRow
                                search multiColumnSearch>
                    <TableHeaderColumn width='10%' dataSort={true} isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='name'>Imię</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='surname'>Nazwisko</TableHeaderColumn>
                    <TableHeaderColumn width='10%' dataSort={true} dataField='group'>Grupa</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn width='10%' dataSort={true} dataField='level'>Poziom</TableHeaderColumn>
                    <TableHeaderColumn width='10%' dataField='id' dataFormat={ linkFormatter }>Edytuj</TableHeaderColumn>
                </BootstrapTable>
                <FloatingActionButton containerElement={<Link to={"/users/add/"}/>} className={style.button_right_only + ' ' + style.button_margin_top}>
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