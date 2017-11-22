import { combineReducers } from 'redux';

import compositionReducer from './compositionReducer';
import methodReducer from './methodReducer';
import callReducer from './callReducer';
import resultReducer from './resultReducer';

const combinedReducers = combineReducers({
    compositionReducer,
    methodReducer,
    callReducer,
    resultReducer,
});

export default combinedReducers;
