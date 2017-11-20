import { combineReducers } from 'redux';

import appReducer from './appReducer';
import callReducer from './callReducer';
import methodReducer from './methodReducer';

const combinedReducers = combineReducers({
    appReducer,
    callReducer,
    methodReducer,
});

export default combinedReducers;
