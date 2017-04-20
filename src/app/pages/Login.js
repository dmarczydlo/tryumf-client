import React from 'react';
import Loginform from '../component/Loginform';
import {connect} from 'react-redux';
import {userLoginRequest} from '../actions/authAction';
class Login extends React.Component {

    render() {
        const {userLoginRequest} = this.props;
        return (
            <Loginform userLoginRequest={userLoginRequest}/>
        );
    }
}

Login.propTypes = {
    userLoginRequest: React.PropTypes.func.isRequired
}

export default connect((state)=>{return{} }, {userLoginRequest})(Login);