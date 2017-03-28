import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {hashHistory} from 'react-router';
import style from '../style/mail.scss';
class Loginform extends React.Component {



    constructor(props) {
        super(props);
        this.state =
            {
                email: '',
                password: '',
                errors: '',
                showError: false
            }
        //bing onchagne function
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({errors: '', showError: false});

        this.props.userLoginRequest(this.state).then(
            () => {
                this.context.router.push('/');
            },
            (err) => {
                this.setState({errors: err.response.data.error, showError: true})
            }
        );
    }

    handleRequestClose() {
        this.setState({
            showError: false,
        });
    }


    render() {
        return (
            <div className={style.loginForm}>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <div>
                            <h2>Login</h2>
                            <TextField
                                ref='email'
                                name='email'
                                floatingLabelText='Email'
                                fullWidth={true}
                                onChange={this.onChange}
                                value={this.state.email}
                            />

                            <TextField
                                ref='password'
                                name='password'
                                type='password'
                                floatingLabelText='Password'
                                fullWidth={true}
                                onChange={this.onChange}
                                value={this.state.password}
                            />

                            <RaisedButton label="Login" type="submit"
                                          primary={true}/>

                            <Snackbar
                                open={this.state.showError}
                                message={this.state.errors}
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                            />


                        </div>

                    </div>
                </form>
            </div>
        );
    }
}

Loginform.contextTypes = {
    router: React.PropTypes.object.isRequired
}
Loginform.propTypes = {
    userLoginRequest: React.PropTypes.func.isRequired
}

export default Loginform;