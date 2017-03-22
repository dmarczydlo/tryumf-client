/**
 * Created by marczak on 2017-03-21.
 */

import React from 'react';
import Graphic from './SetTask/Graphic';
import Graver from './SetTask/Graver';
class AdminSetTask extends React.Component {
    render() {
        return (
            <div>
                <div className="col-md-6 col-xs-12">
                    <h2>Lista zadań</h2>
                </div>
                <div className="col-md-6 col-xs-12">
                    <div className="top-page">
                        <h2>Grafika</h2>
                        <Graphic />
                    </div>

                    <div className="bottom-page">
                        <h2>Grawernia</h2>
                        <Graver />
                    </div>
                </div>

            </div>
        );
    };
}

export default AdminSetTask;