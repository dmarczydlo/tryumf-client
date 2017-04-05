/**
 * Created by marczak on 2017-04-05.
 */
import React from 'react'
import BlockReview from './BlockReview';

const testData = [
    {
        name: 'Jacek',
        surname: 'Polak',
        productID: 'ABCD13221',
        order_number: '3242332',
        client: 'SUPER ALTK',
        time: 3000,
        all_time: 2500,
        type: 'ZO',
        avatar: 'm2.png',
        status: 2,
    },

    {
        name: 'Edward',
        surname: 'Konopka',
        productID: 'XXXX221',
        order_number: '3242332',
        client: 'K2UPP PP',
        time: 2000,
        all_time: 300,
        type: 'ZT',
        avatar: 'm4.png',
        status: 3,
    },

    {
        name: 'Zuzanna',
        surname: 'Chwast',
        productID: 'AAA221',
        order_number: '3242332',
        client: 'ABC PP',
        time: 1000,
        all_time: 1200,
        type: 'AA',
        avatar: 'f4.png',
        status: 2
    },
    {
        name: 'Zuzanna',
        surname: 'Chwast',
        productID: 'AAA221',
        order_number: '3242332',
        client: 'ABC PP',
        time: 1000,
        all_time: 1200,
        type: 'AA',
        avatar: 'f4.png',
        status: 3,
    },
    {
        name: 'Zuzanna',
        surname: 'Chwast',
        productID: 'AAA221',
        order_number: '3242332',
        client: 'ABC PP',
        time: 1000,
        all_time: 1200,
        type: 'AA',
        avatar: 'f4.png',
        status: 2
    },
    {
        name: 'Zuzanna',
        surname: 'Chwast',
        productID: 'AAA221',
        order_number: '3242332',
        client: 'ABC PP',
        time: 1000,
        all_time: 1200,
        type: 'AA',
        avatar: 'f4.png',
        status: 2
    },
    {
        name: 'Zuzanna',
        surname: 'Chwast',
        productID: 'AAA221',
        order_number: '3242332',
        client: 'ABC PP',
        time: 1000,
        all_time: 1200,
        type: 'AA',
        avatar: 'f4.png',
        status: 1
    },
    {
        name: 'Zuzanna',
        surname: 'Chwast',
        productID: 'AAA221',
        order_number: '3242332',
        client: 'ABC PP',
        time: 1000,
        all_time: 1200,
        type: 'AA',
        avatar: 'f4.png',
        status: 2
    }
];


class ContainerReview extends React.Component {
    render() {
        return (
            <div>
                {testData.map((user, i) => <BlockReview key={i} userData={user}/>)}
            </div>
        );
    }
}

ContainerReview.propTypes = {
    type: React.PropTypes.string.isRequired,
};

export default ContainerReview;
