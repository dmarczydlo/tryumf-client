import React, {Component} from 'react';
import update from 'react/lib/update';
import Card from './Card';
import style from '../../style/mail.scss';
import CircularProgress from 'material-ui/CircularProgress';
import {DropTarget} from 'react-dnd';
import {setTaskToUserRequest, removeTaskToUserRequest, moveTaskToUserRequest} from '../../actions/taskAction';
import {formattedSeconds} from '../../utils/formattedSeconds';
import Snackbar from 'material-ui/Snackbar';
class Container extends Component {
    changeUserData(data) {
        this.setState(
            {
                cards: data
            }
        );
    }

    showProps = (message) => {
        this.setState({
            error: true,
            messageError: message
        });
    }

    handleRequestClose = () => {
        this.setState({
            error: false,
            messageError: ''
        });
    }

    componentDidMount() {
        if (this.props.id == 2)
            this.props.onRef(this)
    }

    componentWillUnmount() {
        if (this.props.id == 2)
            this.props.onRef(undefined)
    }

    constructor(props) {
        super(props);
        this.state = {
            cards: props.list,
            user_id: 0,
            date: this.props.date,
            error: false,
            messageError: ''
        };
    }

    pushCard(card) {
        if (this.state.user_id > 0 && this.state.date) {
            setTaskToUserRequest(card.task_id, this.state.user_id, this.state.date)
        }
        this.setState(update(this.state, {
            cards: {
                $push: [card]
            }
        }));
        if (this.props.id == 2) {

            this.props.changeTime(card.time);
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.id == 2) {
        this.setState({
            user_id: nextProps.user_id,
            date: nextProps.date
        });
        // }
    }


    removeCard(index, card) {


        if (this.state.user_id > 0 && this.props.id == 2) {
            removeTaskToUserRequest(card.task_id, this.state.user_id, this.state.date);
        }

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1]
                ]
            }
        }));

        if (this.props.id == 2) {
            this.props.changeTime(card.time * -1);
        }

    }

    moveCard(dragIndex, hoverIndex, card) {
        // console.log('move' + this.state.user_id + ' elem ' + hoverIndex);
        const {cards} = this.state;
        const dragCard = cards[dragIndex];

        moveTaskToUserRequest(card.task_id, this.state.user_id, this.state.date, hoverIndex);

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));

    }

    render() {
        if (!this.props.loading) {
            const {cards} = this.state;
            const {canDrop, isOver, connectDropTarget} = this.props;
            const isActive = canDrop && isOver;
            let sumTime = 0;
            const backgroundColor = isActive ? style.activeContainer : '';

            return connectDropTarget(
                <div>

                    <div className={backgroundColor + " list-group-item " + style.containerRoot }>
                        {cards[0] && cards.map((card, i) => {

                            return (
                                <Card
                                    sumTime={this.props.sumTime}
                                    employee={this.props.employee}
                                    key={i}
                                    index={i}
                                    user_id={this.state.user_id}
                                    listId={this.props.id}
                                    showProps={this.showProps}
                                    card={card}
                                    removeCard={this.removeCard.bind(this)}
                                    moveCard={this.moveCard.bind(this)}/>
                            );
                        })}
                    </div>
                    {this.props.id == 2 &&
                    < div className={style.sumTimeEmployee}>Całkowity
                        czas: {formattedSeconds(this.props.sumTime)}</div>}

                    <Snackbar
                        open={this.state.error}
                        message={this.state.messageError}
                        autoHideDuration={5000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            );
        } else {
            return <div className={style.blockCenter}><CircularProgress size={100} thickness={5}/></div>
        }
    }
}

const cardTarget = {
    drop(props, monitor, component) {
        const {id} = props;
        const sourceObj = monitor.getItem();
        if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
        return {
            listId: id
        };
    },


    canDrop(props, monitor)
    {
        if (props.id == 2) {
            let card = monitor.getItem().card;
            // console.log(props);
            // console.log(props);
        }
        return true;
    }

};

export default DropTarget("CARD", cardTarget, (connect, monitor) => (
    {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }))(Container);