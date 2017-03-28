/**
 * Created by marczak on 2017-03-18.
 */

import React from 'react';
import Admin from './Admin';
import Graphic from './Graphic';
import Graver from './Graver';

class Page extends React.Component {

    renderPage() {
        const group = this.props.auth.user.group;


        switch (group) {
            case 'admin':
                return (
                    <Admin/>
                )
            case 'grawernia':
                return (
                    <Graver/>
                )
            case 'grafika':
                return (
                    <Graphic/>
                )
            default:
                return (
                    <Graphic/>
                )
        }

        return (
            <Graphic/>
        )
    }

    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        );
    }
}

export default Page;