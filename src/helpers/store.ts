import { createStore, applyMiddleware, compose, Store } from 'redux';
import { autoRehydrate } from 'redux-persist';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import combinedReducers from '../reducers/combinedReducers';

const store: Store<{}> = createStore(
    combinedReducers,
    undefined,
    compose(applyMiddleware(thunk, logger),
            autoRehydrate(),
    ),
);

export default store;
