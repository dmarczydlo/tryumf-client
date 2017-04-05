import React, {Component} from 'react';
import update from 'react/lib/update';
import Card from './Card';
import style from '../../style/mail.scss';
import CircularProgress from 'material-ui/CircularProgress';
import {DropTarget} from 'react-dnd';
import {setTaskToUserRequest, removeTaskToUserRequest, moveTaskToUserRequest} from '../../actions/taskAction';
import {formattedSeconds} from '../../utils/formatedSeconds';

class Container extends Component {
    changeUserData(data) {
        this.setState(
            {
                cards: data
            }
        );
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
            date: this.props.date
        };
    }

    pushCard(card) {
        console.log('push ' + this.state.user_id + ' date = ' + this.state.date);
        if (this.state.user_id > 0 && this.state.date) {
            setTaskToUserRequest(card.task_id, this.state.user_id, this.state.date)
        }
        this.setState(update(this.state, {
            cards: {
                $push: [card]
            }
        }));
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.id == 2) {
            this.setState({
                user_id: nextProps.user_id,
                date: nextProps.date
            });
        }
    }

    removeCard(index) {
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    moveCard(dragIndex, hoverIndex) {
        console.log('move' + this.state.user_id + ' elem ' + hoverIndex);
        const {cards} = this.state;
        const dragCard = cards[dragIndex];

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
                            if (this.props.id == 2) {
                            sumTime += card.time;
                            }
                            return (
                                <Card
                                    key={i}
                                    index={i}
                                    listId={this.props.id}
                                    card={card}
                                    removeCard={this.removeCard.bind(this)}
                                    moveCard={this.moveCard.bind(this)}/>
                            );
                        })}
                    </div>
                    {this.props.id == 2 && <div className={style.sumTimeEmployee}>Całkowity czas: {formattedSeconds(sumTime)}</div>}
                </div>
            );
        } else {
            return <div className={style.blockCenter}><CircularProgress size={100} thickness={5} /></div>
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
    }
};

export default DropTarget("CARD", cardTarget, (connect, monitor) => ( {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(Container);