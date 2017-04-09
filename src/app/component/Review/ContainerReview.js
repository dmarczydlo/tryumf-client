/**
 * Created by marczak on 2017-04-05.
 */
import React from 'react'
import BlockReview from './BlockReview';

import style from '../../style/mail.scss';
import CircularProgress from 'material-ui/CircularProgress';
import {REFRESH_VIEW_DATA} from '../../variables'
class ContainerReview extends React.Component {
    render() {

        if (typeof this.props.onlineData !== 'undefined') {
            return (
                <div>
                    <div>Dane odświeżają się co {REFRESH_VIEW_DATA/1000}s</div>
                    {this.props.onlineData.map((user, i) => <BlockReview key={i} userData={user}/>)}
                </div>
            );
        } else {
            return <div className={style.blockCenter}><CircularProgress size={100} thickness={5} /></div>
        }
    }
}

ContainerReview.propTypes = {
    type: React.PropTypes.string.isRequired,
};

export default ContainerReview;
