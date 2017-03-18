import React from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'


export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {openSidebar: false};
    }

    handleToggleSidebar = () => {
        this.setState({openSidebar: !this.state.openSidebar})
    };

    render() {
        return (
            <div>
                <Header className='header' leftIconClick={this.handleToggleSidebar.bind(this)}/>
                <Sidebar toggleSidebar={this.handleToggleSidebar.bind(this)} open={this.state.openSidebar}/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}