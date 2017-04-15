/**
 * Created by marczak on 2017-04-15.
 */

import React from 'react'
import style from '../style/mail.scss';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {getTaskDetailRequst, setReclamationRequest} from '../actions/taskAction';
import {HOST_SERVER} from '../variables';
import CircularProgress from 'material-ui/CircularProgress';
import {formattedSeconds} from '../utils/formattedSeconds';
import FlatButton from 'material-ui/FlatButton';
import statusGet from '../utils/statusGet';
import Modal from '../component/Modal';
import {browserHistory} from 'react-router';

class TaskEdit extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            modal_open: false,
        };
        props.getTaskDetailRequst(props.params.id)
    };

    handleClickReclamation = () => {
        this.setState({modal_open: true});
    };


    modalAccept = () => {
        this.setState({modal_open: false});
        setReclamationRequest(this.props.params.id).then((res) => {
            this.context.router.push('/');

        });
        this.setState({display: false});
    };


    render() {


        if (this.props.task.user != undefined) {
            const {task} = this.props;
            return (
                <div className={style.container}>
                    <div className="col-xs-12 col-sm-6">
                        <Card>
                            <h3 className={style.center}>Dane zadania</h3>
                            <CardHeader
                                title={task.user}
                                subtitle={task.group}
                                avatar={'/images/' + task.avatar}
                            />
                            <CardTitle title={'#' + task.order_number} subtitle={task.client}/>
                            <CardText>
                                <div>Data zamówienia: {task.date}</div>
                                <div>Aktualny status: <strong>{statusGet(task.status)}</strong></div>
                                <div>Czas pracy: {formattedSeconds(task.work_time)}</div>
                            </CardText>
                            <CardActions>
                                <FlatButton className={style.button_right_only} label="Reklamacja" secondary={true}
                                            onTouchTap={this.handleClickReclamation}/>
                                <div className="clearfix"></div>
                            </CardActions>
                        </Card>
                    </div>

                    <div className={"col-xs-12 col-sm-6 "}>
                        <div className={style.centerImg}>
                            <img src={HOST_SERVER + task.image}/>
                        </div>
                    </div>

                    <Modal
                        cancelButton='Anuluj'
                        acceptButton='Tak, zmień na Reklamacja'
                        open={this.state.modal_open}
                        modalAccept={this.modalAccept}
                        modalText="Zmienić status zadania na Reklamacja? Zadanie automatycznie zostanie przydzielone do osoby, która to zadanie wykonywała."
                    />

                </div>
            );
        } else {
            return <div className={style.blockCenter}><CircularProgress size={100} thickness={5}/></div>
        }
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
}



function mapStateToProps(state) {

    return {
        task: state.taskDetail
    };

}

export default connect(mapStateToProps, {getTaskDetailRequst})(TaskEdit);
