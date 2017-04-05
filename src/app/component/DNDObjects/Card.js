import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import style from '../../style/mail.scss'
import Lightbox from 'react-image-lightbox';
import {HOST_SERVER} from '../../variables';


const customStyles = {
    overlay: {
        zIndex: '1900'
    }
}

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handlerShow = () => {
        this.setState(
            {
                isOpen: true
            }
        );
    };

    render() {
        const {card, isDragging, connectDragSource, connectDropTarget} = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <div className={style.containerElement}>

                <div
                    className={"col-xs-2 col-sm-2 col-md-1 col-lg-1 " + style.no_padding + ' ' + style.displayImageElement}>
                    <img src={HOST_SERVER + card.image_url}
                         onClick={this.handlerShow}/>
                </div>
                <div className="col-xs-10 col-sm-10 col-md-11 col-lg-11">
                    <div className={style.containerLineFirst}>
                        <span>Kod: <strong>{card.productID}</strong></span>
                        <span>[<i>#{card.order_number}</i>]</span>
                        <span>Klient: <strong>{card.client}</strong></span>
                    </div>
                    <div className={style.containerLineSecond}>
                        <span>Typ: <strong>{card.type}</strong></span>
                        <span>Czas: <strong>[{card.time / 60}] min</strong></span>
                        <span>Poziom um.: <strong>{card.min_lvl}</strong></span>
                    </div>
                </div>
                <div className="clearfix"></div>


                {this.state.isOpen &&
                <Lightbox
                    reactModalStyle={customStyles}
                    mainSrc={HOST_SERVER + card.image_url}
                    onCloseRequest={() => this.setState({isOpen: false})}
                    enableZoom={true}
                />
                }
            </div>
        ))
            ;
    }
}

const cardSource = {

    beginDrag(props) {
        return {
            index: props.index,
            listId: props.listId,
            card: props.card
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult && dropResult.listId !== item.listId) {
            props.removeCard(item.index, item.card);
        }
    }
};

const cardTarget = {

    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        const sourceListId = monitor.getItem().listId;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        if (props.listId === sourceListId) {
            props.moveCard(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex;
        }
    }
};

export default flow(
    DropTarget("CARD", cardTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource("CARD", cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(Card);