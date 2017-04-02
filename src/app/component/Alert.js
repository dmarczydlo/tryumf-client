/**
 * Created by marczak on 2017-04-02.
 */
import React from "react";
import style from "../style/mail.scss";

class Alert extends React.Component {

    render() {
        return (
            <div>
                <div className={style.alert_block+' '+ (this.props.type == 'info'? style.info : (this.props.type == 'success'? style.success : style.error)) }>
                    <div className={style.alert_message}>
                        {this.props.message}
                    </div>
                </div>
            </div>
        );
    }
}

Alert.propTypes = {
    display: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
}

export default Alert;