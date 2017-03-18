/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Layout from './layout/Layout';
import Login from './pages/Login';
import Index_Page from './pages/Home';

class Index extends Component {

    render() {



        return (

            <MuiThemeProvider>
                <Router history={hashHistory}>
                    <Route path="/" component={Layout}>
                        <IndexRoute component={Index_Page}/>
                        <Route path="user" component={Index_Page}/>
                        <Route path="login" component={Login}/>
                        <Route path="/test" component={Index_Page}/>
                    </Route>
                </Router>
            </MuiThemeProvider>
        );
    }
}




export default Index;
