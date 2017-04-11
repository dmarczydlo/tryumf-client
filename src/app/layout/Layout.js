import React from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import style from '../style/mail.scss';


export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {openSidebar: false};
    }

    handleToggleSidebar = () => {
        this.setState({openSidebar: !this.state.openSidebar})
    };

    logoutToogle = () => {
        this.setState({openSidebar: false})
    }



    render() {
        return (
            <div>
                <Header className='header' leftIconClick={this.handleToggleSidebar.bind(this)}/>
                <Sidebar toggleSidebar={this.handleToggleSidebar.bind(this)} logoutToogle={this.logoutToogle} open={this.state.openSidebar}/>
                <div className={style.container}>

                    {this.props.children}
                </div>

                <Footer/>
            </div>
        );
    }
}