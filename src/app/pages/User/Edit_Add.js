/**
 * Created by marczak on 2017-03-19.
 */

import React from 'react';
import style from '../../style/mail.scss';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {getUserDataRequest, updateUserDataRequest, addUserDataRequest} from '../../actions/userActions';
import {connect} from 'react-redux';
import Slider from 'material-ui/Slider';
import Snackbar from 'material-ui/Snackbar';
import {avatarValue, groupValue} from '../../variables';
// import Spinner from 'react-native-loading-spinner-overlay';



class Edit_Add extends React.Component {


    handleSaveClick = () => {

        const saveVal = {
            name: this.refs.name.getValue(),
            surname: this.refs.surname.getValue(),
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
            group_id: this.state.group_select,
            level: this.state.level,
            avatar: this.state.avatar_select
        };

        if (this.props.params.id != null) {
            saveVal.id = this.props.params.id;
            this.props.updateUserDataRequest(saveVal).then(
                (res) => {
                    this.context.router.push('/users');
                },
                (err) => {
                    this.setState({error: err.response.data.error, showError: true})
                }
            );

        } else {
            this.props.addUserDataRequest(saveVal).then(
                (res) => {
                    this.context.router.push('/users');
                },
                (err) => {
                    this.setState({error: err.response.data.error, showError: true})
                }
            );
        }


    }

    handleGroupChange = (event, index, value) => {
        this.setState({group_select: value})
    };

    handleAvatarChange = (event, index, value) => {
        this.setState(
            {
                avatar_select: value,
                avatar_icon: '/images/' + value
            })
    };


    handleSecondSlider = (event, value) => {
        this.setState({level: value});
    };


    handleRequestClose = () => {
        this.setState({
            showError: false,
        });
    }

    handleChangeText = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }


    componentDidMount() {
        this.setState({
            loading: true
        });
        if (this.props.params.id != null) {
            this.props.getUserDataRequest(this.props.params.id).then(
                () => {
                    this.setState({
                        group_select: this.props.user.group_id,
                        name: this.props.user.name,
                        surname: this.props.user.surname,
                        email: this.props.user.email,
                        level: this.props.user.level,
                        loading: false,
                        avatar_icon: '/images/' + this.props.user.avatar,
                        avatar_select: this.props.user.avatar,
                    })
                },
                (err) => {
                }
            );
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            group_select: 0,
            avatar_select: 0,
            name: '',
            surname: '',
            email: '',
            password: '',
            level: 1,
            error: '',
            showError: false,
            loading: false,
            avatar_icon: ''
        };
    }

    render() {


        return (
            <div className={style.block}>
                <div className={'col-xs-12 col-sm-6 ' + style.userBlock }>
                    <TextField
                        ref='name'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChangeText}
                        floatingLabelText='Imię'
                        fullWidth={true}
                    />

                    <TextField
                        ref='surname'
                        name='surname'
                        value={this.state.surname}
                        floatingLabelText='Nazwisko'
                        fullWidth={true}
                        onChange={this.handleChangeText}
                    />

                    <TextField
                        ref='email'
                        name='email'
                        onChange={this.handleChangeText}
                        value={this.state.email}
                        floatingLabelText='Email'
                        fullWidth={true}
                    />

                    <TextField
                        ref='password'
                        name='password'
                        onChange={this.handleChangeText}
                        value={this.state.password}
                        floatingLabelText='Hasło'
                        fullWidth={true}
                    />

                    <SelectField
                        ref='group_id'
                        floatingLabelText='Grupa'
                        value={this.state.group_select}
                        name='group_id'
                        onChange={this.handleGroupChange}
                        fullWidth={true}
                        autoWidth={true}
                    >
                        {groupValue.map(function (group) {
                            return <MenuItem key={group.id} value={group.id} primaryText={group.name}/>
                        })}
                    </SelectField>


                </div>

                <div className={'col-xs-12 col-sm-6 ' + style.userBlock }>

                    <p>
                        <span>{'Poziom umiejętności: '}</span>
                        <span><strong>{this.state.level}</strong></span>
                    </p>
                    <Slider
                        min={1}
                        max={7}
                        step={1}
                        defaultValue={1}
                        value={this.state.level}
                        onChange={this.handleSecondSlider}
                    />

                    <SelectField
                        ref='avatar'
                        floatingLabelText='Avatar'
                        value={this.state.avatar_select}
                        name='avatar'
                        onChange={this.handleAvatarChange}
                        fullWidth={true}
                        autoWidth={true}
                    >
                        {avatarValue.map(function (avatar) {
                            return <MenuItem key={avatar.id} value={avatar.img} primaryText={avatar.name}/>
                        })}
                    </SelectField>

                    <div className={style.imgAvatar}>
                        <img src={this.state.avatar_icon}/>
                    </div>


                </div>

                <div className={'col-xs-12'}>
                    <div className={style.button_right_only}>
                        <FloatingActionButton onMouseDown={this.handleSaveClick}>
                            <ContentSave />
                        </FloatingActionButton>
                    </div>
                </div>
                <div className='clearfix'></div>

                <Snackbar
                    open={this.state.showError}
                    message={this.state.error}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />

            </div>


        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    };
}


Edit_Add.contextTypes = {
    router: React.PropTypes.object.isRequired
}
Edit_Add.propTypes = {
    getUserDataRequest: React.PropTypes.func.isRequired
}

Edit_Add.propTypes = {
    updateUserDataRequest: React.PropTypes.func.isRequired
}

Edit_Add.propTypes = {
    addUserDataRequest: React.PropTypes.func.isRequired
}

export default  connect(mapStateToProps, {getUserDataRequest, updateUserDataRequest, addUserDataRequest})(Edit_Add);