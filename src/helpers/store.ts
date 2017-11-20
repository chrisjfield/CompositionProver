import { createStore, applyMiddleware, compose, Store } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import combinedReducers from '../reducers/combinedReducers';

const store: Store<{}> = createStore(
    combinedReducers,
    undefined,
    compose(applyMiddleware(thunk, logger)),
);

export default store;
