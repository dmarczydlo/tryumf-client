/**
 * Created by marczak on 2017-03-21.
 */

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {getTasksListRequest} from '../actions/taskAction';
class AdminTasks extends React.Component {

    componentWillMount() {
        this.props.getTasksListRequest();
    }
    render() {

        return (
            <div>
                <BootstrapTable tableStyle={ {width: '100%'} } data={this.props.tasks} striped hover
                                search multiColumnSearch>
                    <TableHeaderColumn width='5%' dataSort={true} isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='name'>Opis</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='min_lvl'>Poziom</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='prio'>Priorytet</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='time_to_do'>Czas</TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataSort={true} dataField='status'>Status</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    };
}





AdminTasks.propTypes = {
    getTasksListRequest: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    };
}


export default connect(mapStateToProps,{getTasksListRequest}) (AdminTasks);