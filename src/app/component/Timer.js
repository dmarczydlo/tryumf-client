/**
 * Created by marczak on 2017-03-26.
 */

import React from 'react';
import style from '../style/mail.scss';
import {formattedSeconds} from '../utils/formatedSeconds';
class Timer extends React.Component {

    render() {


        return (
            <span className={style.timer}>
                <span className={this.props.display ? style.display : style.no_display + ' ' + style.block_div}>
                    <span className={style.data}>
                        {formattedSeconds(this.props.value)}
                    </span>
                </span>
            </span>
        );
    }
}

Timer.propTypes = {
    display: React.PropTypes.bool.isRequired
}

Timer.propTypes = {
    value: React.PropTypes.number.isRequired
}


export default Timer;