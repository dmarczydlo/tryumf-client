/**
 * Created by marczak on 2017-03-18.
 */

import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionBuild from 'material-ui/svg-icons/action/build';


import SwipeableViews from 'react-swipeable-views';
import AdminReview from '../component/AdminReview';
import AdminTasks from '../component/AdminTasks';
import AdminTaskSet from '../component/AdminSetTask';
class Admin extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <div>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <AdminTasks/>
                    </div>
                    <div>
                        <AdminTaskSet/>
                    </div>
                    <div>
                        <AdminReview/>
                    </div>

                </SwipeableViews>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab
                        icon={<ActionBuild />}
                        value={0}
                        label="Lista zadań"
                    />
                    <Tab
                        icon={<SocialPersonAdd />}
                        value={1}
                        label="Przydziel zadanie"
                    />
                    <Tab
                        icon={<MapsPersonPin />}
                        value={2}
                        label="Kontrola"
                    />
                </Tabs>


            </div>
        );
    }
}

export default Admin;