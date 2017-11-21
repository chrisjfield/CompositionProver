import { combineReducers } from 'redux';

import appReducer from './appReducer';
import compositionReducer from './compositionReducer';
import methodReducer from './methodReducer';
import callReducer from './callReducer';

const combinedReducers = combineReducers({
    appReducer,
    compositionReducer,
    methodReducer,
    callReducer,
});

export default combinedReducers;
