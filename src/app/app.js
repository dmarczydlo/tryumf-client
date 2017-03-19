import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Index from './Index';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import setAuthorizationToken from './utils/authorizationToken';
import rootReducer from './reducers/rootReducer';
import jwt from 'jsonwebtoken';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);

let store = createStore(
    rootReducer,
    enhancer
);

injectTapEventPlugin();

if (localStorage.getItem('jwtoken')) {
    setAuthorizationToken(localStorage.jwtoken);
    store.dispatch(setAuthorizationToken(jwt.decode(localStorage.jwtoken)));
}


render(<Provider store={store}><Index /></Provider>, document.getElementById('app'));
