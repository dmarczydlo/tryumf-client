/**
 * Created by marczak on 2017-04-05.
 */
import React from 'react'
import Paper from 'material-ui/Paper';
import style from '../../style/mail.scss'
import Avatar from 'material-ui/Avatar';
import LinearProgress from 'material-ui/LinearProgress';
import statusGet from '../../utils/statusGet';
import {formattedSeconds} from '../../utils/formattedSeconds';
import Lightbox from 'react-image-lightbox';
import {HOST_SERVER} from '../../variables';

const customStyles = {
    overlay: {
        zIndex: '1900'
    }
}

class BlockReview extends React.Component {



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


    componentWillReceiveProps(nextProps) {
        if (nextProps.userData.toDoTime > 0)
            this.text = 'Zapas';
        else this.text = 'Strata';
    }


    render() {
        const {userData} = this.props;

        const color = userData.work_time <= userData.time ? style.success : style.error;
        return (
            <div className={'col-xs-12 col-sm-6 col-md-4'}>
                <Paper className={style.blockReview} zDepth={3}>
                    <div className={style.insideReview}>
                        <div className={style.blockPadding}>
                            <div className={'col-xs-2 ' + style.no_padding}>
                                <Avatar src={`images/${userData.avatar}`} size={30}/>
                            </div>
                            <div className={"col-xs-10 " + style.no_padding}>
                                <div className={style.name}>
                                    <span>{userData.name}</span>
                                    <span>{userData.surname}</span>
                                </div>

                                <div className="col-xs-12 col-sm-8">
                                    <div>
                                        <strong>Aktualne zadanie</strong>
                                    </div>

                                    <div>
                                        Zamówinie: #{userData.order_number}
                                    </div>

                                    <div>
                                        Produkt: {userData.productID}
                                    </div>
                                    <div>
                                        Typ: {userData.type}
                                    </div>
                                </div>



                                <div className={"col-xs-12 col-sm-4 " + style.displayImage}>
                                    <img src={HOST_SERVER + userData.image}
                                         onClick={this.handlerShow}/>
                                </div>
                                <div className="clearfix"></div>
                                <div className={"col-xs-12 col-sm-6 " + style.no_padding}>
                                    Czas: {formattedSeconds(userData.time)}
                                </div>
                                <div className={"col-xs-12 col-sm-6 " + style.no_padding}>
                                    Praca: {formattedSeconds(userData.work_time != null ? userData.work_time : 0)}
                                </div>
                                <div className="clearfix"></div>
                                <LinearProgress mode="determinate"
                                                value={userData.work_time != null ? parseInt(userData.work_time) : 0}
                                                max={userData.time}/>

                                <div className={style.marginTop4}>
                                    <strong>Dzisiejszy czas pracy</strong>
                                </div>
                                <div className={"col-xs-12 col-sm-6 " + style.no_padding}>
                                    Limit: {formattedSeconds(userData.maxTime)}
                                </div>
                                <div className={"col-xs-12 col-sm-6 " + style.no_padding}>
                                    Praca: {formattedSeconds(userData.sumTime)}
                                </div>
                                <div className="clearfix"></div>

                                <LinearProgress mode="determinate"
                                                value={parseInt(userData.sumTime)}
                                                max={parseInt(userData.maxTime)}/>

                                <div
                                    className={style.center + ' ' + style.marginTop4 + ' ' + (userData.toDoTime > 0 ? style.success : style.error) }>

                                    {this.text + ' ' + formattedSeconds(Math.abs(userData.toDoTime))}
                                </div>

                            </div>
                            <div className="clearfix"></div>


                        </div>
                        <div
                            className={style.status + ' ' + color + ' ' + style.center }>
                            Status: {statusGet(userData.status)}
                        </div>

                        {this.state.isOpen &&
                        <Lightbox
                            reactModalStyle={customStyles}
                            mainSrc={HOST_SERVER + userData.image}
                            onCloseRequest={() => this.setState({isOpen: false})}
                            enableZoom={true}
                        />
                        }

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