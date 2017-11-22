import { combineReducers } from 'redux';

import appReducer from './appReducer';
import compositionReducer from './compositionReducer';
import methodReducer from './methodReducer';
import callReducer from './callReducer';
import resultReducer from './resultReducer';

const combinedReducers = combineReducers({
    appReducer,
    compositionReducer,
    methodReducer,
    callReducer,
    resultReducer,
});

export default combinedReducers;
