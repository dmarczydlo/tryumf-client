/**
 * Created by marczak on 2017-04-05.
 */
import React from 'react'
import Paper from 'material-ui/Paper';
import style from '../../style/mail.scss'
import Avatar from 'material-ui/Avatar';
import LinearProgress from 'material-ui/LinearProgress';
import statusGet from '../../utils/statusGet';
import {formattedSeconds} from '../../utils/formatedSeconds';
class BlockReview extends React.Component {
    render() {
        const {userData} = this.props;

        const color = userData.all_time <= userData.time ? style.success : style.error;
        return (
            <div className={'col-xs-12 col-sm-6 col-md-3'}>
                <Paper className={style.blockReview} zDepth={3}>
                    <div className={style.insideReview}>
                        <div className={'col-xs-2 ' + style.no_padding}>
                            <Avatar src={`images/${userData.avatar}`} size={30}/>
                        </div>
                        <div className={"col-xs-10 " + style.no_padding}>
                            <div className={style.name}>
                                <span>{userData.name}</span>
                                <span>{userData.surname}</span>
                                <span>[<strong>#{userData.order_number}</strong>]</span>
                            </div>

                            <div>
                                Produkt: <strong>{userData.productID}</strong>
                            </div>
                            <div>
                                Klient: <strong>{userData.client}</strong>
                            </div>
                            <div>
                                Typ: <strong>{userData.type}</strong>
                            </div>
                            <div>
                                Czas: <strong>{formattedSeconds(userData.time)}</strong>
                            </div>
                            <div>
                                Praca: <strong>{formattedSeconds(userData.all_time)}</strong>
                            </div>
                            <LinearProgress mode="determinate" value={userData.all_time} max={userData.time}/>
                            <div
                                className={style.status + ' ' + color  }>
                                Status: {statusGet(userData.status)}
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </Paper>
            </div>
        );
    }
}

BlockReview.propTypes = {
    userData: React.PropTypes.object.isRequired,
};

export default BlockReview;