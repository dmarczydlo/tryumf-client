/**
 * Created by marczak on 2017-04-09.
 */

import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import style from '../../style/mail.scss';
import {formattedSeconds} from '../../utils/formattedSeconds';
import {HOST_SERVER} from '../../variables';
import Lightbox from 'react-image-lightbox';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/content/send';
import {Link} from 'react-router';


const options_table = {
    sizePerPage: 15,
    defaultSortName: 'date',
    defaultSortOrder: 'desc'
}

const customStyles = {
    overlay: {
        zIndex: '1900'
    }
}

function timeFormatter(cell) {
    return formattedSeconds(cell);
}


class Accept extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            image: '',
        }
    }

    handlerImage = (image) => {
        this.setState(
            {
                isOpen: true,
                image: image
            }
        );
    };
    imageFormatter = (cell) => {
        return <div className={`${style.displayImageMin} ${style.blockCenter}`}><img
            onClick={() => this.handlerImage(`${HOST_SERVER}${cell}`)}
            src={`${HOST_SERVER}${cell}`}/></div>;
    }

    editFormatter = (cell) => {
        return (
            <IconButton containerElement={<Link to={"/edit/"+ cell}/>} >
                <ActionEdit />
            </IconButton>
        );
    }

    render() {
        return (

            <div className={style.table_my + ' col-xs-12'}>
                <BootstrapTable tableStyle={ {width: '100%'}} maxHeight={'250px'} options={options_table}
                                data={this.props.acceptData} striped
                                hover
                                search multiColumnSearch pagination>
                    <TableHeaderColumn width={'5%'} dataSort={true} isKey dataField='id'>ID</TableHeaderColumn>

                    <TableHeaderColumn width={'10%'} dataSort={true} dataField='date'>Data
                        zamówienia</TableHeaderColumn>
                    <TableHeaderColumn width={'10%'} dataFormat={this.imageFormatter} dataSort={false}
                                       dataField='image'>Zdjęcie</TableHeaderColumn>
                    <TableHeaderColumn width={'15%'} dataSort={true} dataField='user'>Pracownik</TableHeaderColumn>
                    <TableHeaderColumn width={'15%'} dataSort={true} dataField='group'>Dział</TableHeaderColumn>
                    <TableHeaderColumn width={'15%'} dataSort={true}
                                       dataField='order_number'>Zamówienie</TableHeaderColumn>
                    <TableHeaderColumn width={'5%'} dataSort={true} dataField='type'>Typ</TableHeaderColumn>
                    <TableHeaderColumn width={'5%'} dataSort={true} dataField='eq'>Ilość</TableHeaderColumn>

                    <TableHeaderColumn width={'15%'} dataSort={true} dataFormat={timeFormatter} dataField='work_time'>Czas
                        pracy</TableHeaderColumn>

                    <TableHeaderColumn width={'10%'} dataSort={true} dataFormat={this.editFormatter} dataField='id'>Wejdź</TableHeaderColumn>

                </BootstrapTable>

                {this.state.isOpen &&
                <Lightbox
                    reactModalStyle={customStyles}
                    mainSrc={this.state.image}
                    onCloseRequest={() => this.setState({isOpen: false})}
                    enableZoom={true}
                />
                }

            </div>
        );
    }
}

Accept.PropTypes
{
    acceptData: React.PropTypes.array.isRequired
}

export default Accept;