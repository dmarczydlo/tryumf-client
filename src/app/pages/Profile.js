/**
 * Created by marczak on 2017-03-18.
 */

import React from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import style from '../style/mail.scss';
import {getUserDataRequest} from '../actions/userActions';
import TextField from 'material-ui/TextField';
import {avatarValue} from '../variables';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {updateProfileRequest} from '../actions/userActions';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
class Profile extends React.Component {


    handleAvatarChange = (event, index, value) => {
        this.setState(
            {
                avatar_select: value,
                avatar_icon: '/images/' + value
            })
    };


    constructor(props) {
        super(props);

        this.state = {
            avatar_icon: '',
            avatar_select: 0,
            password: '',
            showMessage: false,
            message: '',
        }
    }

    componentDidMount() {
        this.props.getUserDataRequest(this.props.user_id).then(
            (res) => {
                this.setState({

                    avatar_select: this.props.user.avatar,
                    avatar_icon: '/images/' + this.props.user.avatar,
                })
            }
        )
    }

    handleRequestClose = () => {
        this.setState({
            showMessage: false,
        });
    };

    handleClick = (e) => {
        const saveVal = {
            password: this.refs.password.getValue(),
            avatar: this.state.avatar_select
        };

        this.props.updateProfileRequest(this.props.user_id, saveVal).then(
            () => {
                this.setState({message: 'Dane zostały zaktualizowane', showMessage: true})

            },
            (err) => {
                this.setState({message: err.response.data.error, showMessage: true})
            }
        );

    };


    render() {
        if (this.props.user.name != undefined) {
            return (
                <div>
                    <Card>
                        <CardHeader
                            title={this.props.user.name + ' ' + this.props.user.surname}
                            subtitle="Profil użytkownika"
                            avatar={this.state.avatar_icon}
                        />
                        <span
                            className={style.profileLabel}>Poziom uprawnień: <strong>{this.props.user.level}</strong></span>
                        <span className={style.profileLabel}>Email: <strong>{this.props.user.email}</strong></span>

                        <TextField
                            className={style.profileLabel}
                            floatingLabelText="Hasło"
                            ref="password"
                        />
                        <br/>
                        <SelectField
                            className={style.profileLabel}
                            ref='avatar'
                            floatingLabelText='Avatar'
                            value={this.state.avatar_select}
                            name='avatar'
                            onChange={this.handleAvatarChange}
                            autoWidth={true}
                        >
                            {avatarValue.map(function (avatar) {
                                return <MenuItem key={avatar.id} value={avatar.img} primaryText={avatar.name}/>
                            })}
                        </SelectField>

                        <br/>
                        <RaisedButton label="Aktualizuj profil" primary={true} className={style.buttonUpdate}
                                      onTouchTap={this.handleClick}/>
                    </Card>

                    <Snackbar
                        open={this.state.showMessage}
                        message={this.state.message}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />

                </div>
            );
        } else {
            return <div className={style.blockCenter}><CircularProgress size={100} thickness={5}/></div>
        }
    }
}


function

mapStateToProps(state) {
    return {
        user: state.user,
        user_id: state.auth.user.sub
    };
}

Profile.propTypes = {
    getUserDataRequest: React.PropTypes.func.isRequired
}

Profile.propTypes = {
    updateProfileRequest: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {getUserDataRequest, updateProfileRequest})(Profile);

