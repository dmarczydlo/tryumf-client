/**
 * Created by marczak on 2017-03-18.
 */

import React from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
export default function (ComposedComponent, type = null) {
    class Authenticate extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                open: false
            };
        }

        handleRequestClose = () => {
            this.setState({
                open: false,
            });
        };

        componentWillMount() {
            if (!this.props.auth.isAuth) {

                this.setState({
                    open: true,
                });
                this.context.router.push('/login');
            } else {
                if (type != null) {
                    if (type !== this.props.auth.user.group) {
                        this.context.router.push('/');
                    }
                }
            }
        }

        render() {
            return (
                <div>
                    <Snackbar
                        open={this.state.open}
                        message={"Brak dostępu"}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                    <ComposedComponent {...this.props} />

                </div>

            );
        }
    }

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    Authenticate.PropsTypes = {
        auth: React.PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth
        };
    }

    return connect(mapStateToProps)(Authenticate);
}


