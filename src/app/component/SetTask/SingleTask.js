/**
 * Created by marczak on 2017-03-30.
 */
import React from 'react';


class SingleTask extends React.Component {
    render() {
        return (
            <div className="list-group-item list-group-item-action">
                <div>
                    <span>{this.props.task.productID}</span>&nbsp;|&nbsp;
                    <span>{this.props.task.min_lvl}</span>&nbsp;|&nbsp;
                    <span>{this.props.task.client}</span>&nbsp;|&nbsp;
                    <span>{this.props.task.order_number}</span>&nbsp;|&nbsp;
                    <span>{this.props.task.status}</span>&nbsp;|&nbsp;
                    <span>{this.props.task.time/60}</span>&nbsp;|&nbsp;
                    <span>{this.props.task.type}</span>


                </div>
            </div>
        );
    }

}

export default SingleTask;