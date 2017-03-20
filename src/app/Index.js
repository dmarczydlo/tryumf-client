/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Layout from './layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Users from './pages/User/Users';
import UserEditAdd from './pages/User/Edit_Add';
import Authentication from './utils/authenticate';

class Index extends Component {

    render() {
        return (
            <MuiThemeProvider>
                <Router history={hashHistory}>
                    <Route path="/" component={Layout}>
                        <IndexRoute component={Home}/>
                        <Route path="login" component={Login}/>
                        <Route path="profile" component={Profile}/>
                        <Route path="users" component={Authentication(Users, 'admin')}/>
                        <Route path="users/add" component={Authentication(UserEditAdd, 'admin')}/>
                        <Route path="users/edit/:id" component={Authentication(UserEditAdd, 'admin')} />

                    </Route>
                </Router>
            </MuiThemeProvider>
        );
    }
}
export default Index;
