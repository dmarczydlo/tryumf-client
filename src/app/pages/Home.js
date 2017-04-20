import React from 'react';
import {connect} from 'react-redux';
import Page from './Page';
import Login from './Login';

class Home extends React.Component {

    render() {

        const {isAuth} = this.props.auth;

        const loginHome = (
            <Page {...this.props} />
        );

        const guestHome = (
            <Login />
        );

        return (
            <div>
                {isAuth ? loginHome : guestHome}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default  connect(mapStateToProps)(Home)
