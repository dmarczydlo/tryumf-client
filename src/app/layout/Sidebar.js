import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/authAction';
import  {hashHistory} from 'react-router';
class Sidebar extends React.Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
        hashHistory.push('/login');
    }


    render() {
        const {isAuth} = this.props.auth;

        const isLogin = (
            <Drawer docked={false} open={this.props.open} onRequestChange={this.props.toggleSidebar}>
                <Link to={'/'}><MenuItem onClick={this.props.toggleSidebar}>Index</MenuItem></Link>
                <Link to={'user'}><MenuItem onClick={this.props.toggleSidebar}>Profil</MenuItem></Link>
                <Link to="/login"><MenuItem onClick={this.logout.bind(this)}>Wyloguj</MenuItem></Link>
            </Drawer>
        );

        const isGuest = (
            <Drawer docked={false} open={this.props.open} onRequestChange={this.props.toggleSidebar}>
                <Link to={'login'}><MenuItem onClick={this.props.toggleSidebar}>Login</MenuItem></Link>
            </Drawer>
        );


        return (
            <div>
                { isAuth ? isLogin : isGuest}
            </div>
        );

    }
}

Sidebar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, {logout})(Sidebar);