/**
 * Created by marczak on 2017-03-28.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class Modal extends React.Component {
    state = {
        open: this.props.open,
    };


    componentWillReceiveProps(next) {
        this.setState({open: next.open});
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label={this.props.cancelButton}
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label={this.props.acceptButton}
                primary={true}
                onTouchTap={this.props.modalAccept}
            />,
        ];

        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.modalText}
                </Dialog>
            </div>
        );
    }
}

Modal.propTypes = {
    modalAccept: React.PropTypes.func.isRequired
}

Modal.propTypes = {
    modalText: React.PropTypes.string.isRequired
}

Modal.propTypes = {
    acceptButton: React.PropTypes.string.isRequired
}


Modal.propTypes = {
    cancelButton: React.PropTypes.string.isRequired
}