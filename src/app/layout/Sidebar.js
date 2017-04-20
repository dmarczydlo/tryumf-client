import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/authAction';

class Sidebar extends React.Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.logoutToogle();
        this.context.router.push('/login');
    }

    admin() {
        const {group} = this.props.auth.user;

        if (group == 'admin') {
            return (
                <div>
                    <Link to={'/users'}><MenuItem onClick={this.props.toggleSidebar}>Pracownicy</MenuItem></Link>
                    <Link to={'/raports'}><MenuItem onClick={this.props.toggleSidebar}>Raporty</MenuItem></Link>
                </div>

            )
        }
    }


    render() {
        const {isAuth} = this.props.auth;


        const isLogin = (
            <Drawer docked={false} open={this.props.open} onRequestChange={this.props.toggleSidebar}>
                <Link to={'/'}><MenuItem onClick={this.props.toggleSidebar}>Index</MenuItem></Link>
                <Link to={'/profile'}><MenuItem onClick={this.props.toggleSidebar}>Profil</MenuItem></Link>
                {this.admin()}
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
Sidebar.contextTypes = {
    router: React.PropTypes.object.isRequired
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