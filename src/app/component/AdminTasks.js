/**
 * Created by marczak on 2017-03-21.
 */

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {getTasksListRequest} from '../actions/taskAction';
import style from '../style/mail.scss';

const options = {
    sizePerPage: 15,
    defaultSortName: 'id',
    defaultSortOrder: 'desc'
}

class AdminTasks extends React.Component {

    componentWillMount() {
        this.props.getTasksListRequest();
    }

    render() {


        return (


                <div className={style.table_my + ' col-xs-12'}>
                    <BootstrapTable tableStyle={ {width: '100%'} } options={options} data={this.props.tasks} striped
                                    hover
                                    search multiColumnSearch pagination>
                        <TableHeaderColumn width={'5%'} dataSort={true} isKey dataField='id'>ID</TableHeaderColumn>
                        <TableHeaderColumn width={'5%'} dataSort={true} dataField='type'>Typ</TableHeaderColumn>
                        <TableHeaderColumn width={'8%'} dataSort={true}
                                           dataField='order_number'>NumZam</TableHeaderColumn>
                        <TableHeaderColumn width={'10%'} dataSort={true}
                                           dataField='date_add'>DatWply</TableHeaderColumn>
                        <TableHeaderColumn width={'10%'} dataSort={true}
                                           dataField='date_order'>DataSprz</TableHeaderColumn>
                        <TableHeaderColumn width={'10%'} dataSort={true} dataField='client'>Klient</TableHeaderColumn>
                        <TableHeaderColumn width={'10%'} dataSort={true}
                                           dataField='employee'>Handlowiec</TableHeaderColumn>
                        <TableHeaderColumn width={'5%'} dataSort={true} dataField='prio'>Prio</TableHeaderColumn>
                        <TableHeaderColumn width={'5%'} dataSort={true} dataField='status'>Status</TableHeaderColumn>
                        <TableHeaderColumn width={'10%'} dataSort={true}
                                           dataField='graphic_time'>Grafika</TableHeaderColumn>
                        <TableHeaderColumn width={'10%'} dataSort={true}
                                           dataField='graver_time'>Grawernia</TableHeaderColumn>
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


export default connect(mapStateToProps, {getTasksListRequest})(AdminTasks);