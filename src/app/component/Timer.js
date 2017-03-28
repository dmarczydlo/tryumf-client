/**
 * Created by marczak on 2017-03-26.
 */

import React from 'react';
import style from '../style/mail.scss';
const formattedSeconds = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600) % 24
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":")
};
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