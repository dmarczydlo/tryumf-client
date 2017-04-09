/**
 * Created by marczak on 2017-03-26.
 */
import React from 'react';
import Lightbox from 'react-image-lightbox';
import {HOST_SERVER} from '../variables';
import style from '../style/mail.scss';
import RaisedButton from 'material-ui/RaisedButton';
import Timer from '../component/Timer'
import Modal from '../component/Modal';

const customStyles = {
    overlay: {
        zIndex: '1900'
    }
}
class WorkflowElem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            labelButton: 'Start',
            display_time: true,
            disableAccept: this.props.task.sum_time > 0 ? false : true,
            time: this.props.task.sum_time > 0 ? parseInt(this.props.task.sum_time) : 0,
            internalId: null,
            block_all: false,
            modal_open: false,
            display: true
        };
    }

    componentWillMount() {
        if (this.props.task.running > 0) {
            let internal_id = setInterval(() =>
                this.setState({
                    time: this.state.time + 1
                }), 1000);

            this.setState(
                {
                    internalId: internal_id,
                    labelButton: 'Stop',
                    disableAccept: true,
                }
            );
            this.props.onClick('start');


        }
    }

    handlerImage = () => {
        this.setState(
            {
                isOpen: true
            }
        );
    };

    handleAcceptClick = () => {

        this.setState({modal_open: true});

    }

    modalAccept = () => {
        this.setState({modal_open: false});
        const index = this.props.tasks.findIndex((taks) => taks.user_task_id === this.props.task.user_task_id);
        this.props.acceptTaskUserRequest(this.props.task.user_task_id, index);
        this.setState({display: false});


    }


    handleStartClick = () => {
        if (this.state.labelButton == 'Start') {
            this.setState({
                labelButton: 'Stop',
                disableAccept: true,
            });

            let internal_id = setInterval(() =>
                this.setState({
                    time: this.state.time + 1
                }), 1000);

            let user_start = {
                task_id: this.props.task.task_id,
                section: this.props.type,
                user_task_id: this.props.task.user_task_id
            };

            this.props.startTaskUserRequest(user_start);
            this.props.onClick('start');

            this.setState(
                {
                    internalId: internal_id
                }
            );

        } else {
            this.setState({
                labelButton: 'Start',
                disableAccept: false,
            });
            this.props.stopTaskUserRequest(this.props.task.user_task_id);


            clearInterval(this.state.internalId);
            this.props.onClick('stop');
        }
    };

    render() {
        return (

            <div
                className={"list-group-item list-group-item-action " + (this.state.labelButton === 'Stop' ? style.run : style.unrun) + (this.state.time > this.props.task.time ? ' ' + style.warning : '') + ' ' + (this.state.display ? '' : style.hide) }>
                <div className={style.displayImage}>
                    <div className={"col-xs-2 col-sm-2 col-md-1 col-lg-1 " + style.no_padding}>
                        <img src={HOST_SERVER + this.props.task.image_url}
                             onClick={this.handlerImage}/>
                    </div>
                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <div className={style.header_line1}>
                            [Prod:{this.props.task.productID} <strong>#{this.props.task.order_number}</strong>
                            - {this.props.task.client}]
                            <Timer display={this.state.display_time}
                                   value={this.state.time}
                                   block={this.state.block_all}
                            />

                        </div>
                        <div className={style.header_line2}>
                            <span> Czas: <strong>{this.props.task.time / 60} min</strong> </span>
                            <span> Prio: <strong>{this.props.task.prio}</strong></span>
                            <span> Status: <strong>{this.props.task.status}</strong></span>
                        </div>
                        {this.props.task.graphic_block &&
                        <div className={style.errorColor}>Wymaga akceptacji działu grafika</div>}
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-4 col-lg-4">
                        <div className={style.buttons}>
                            <RaisedButton label={this.state.labelButton} primary={true}
                                          onTouchTap={this.handleStartClick}
                                          disabled={(this.props.block && this.state.labelButton == 'Start') || this.props.blockAccept }
                            />
                            <RaisedButton label="Akceptuj"
                                          disabled={this.state.disableAccept || this.props.block || this.props.blockAccept}
                                          onTouchTap={this.handleAcceptClick}

                            />

                        </div>
                    </div>


                    <div className="clearfix"/>
                </div>


                {this.state.isOpen &&
                <Lightbox
                    reactModalStyle={customStyles}
                    mainSrc={HOST_SERVER + this.props.task.image_url}
                    onCloseRequest={() => this.setState({isOpen: false})}
                    enableZoom={true}
                />
                }

                <Modal
                    cancelButton='Anuluj'
                    acceptButton='Akceptuj'
                    open={this.state.modal_open}
                    modalAccept={this.modalAccept}
                    modalText="Akceptacja zadania spowoduję usunięcie go z listy zadań. Czy zaakceptować?"
                />
            </div>
        );
    }

}

export default WorkflowElem;