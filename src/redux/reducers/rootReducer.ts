import { combineReducers } from 'redux';

import currentCompositionReducer from './currentCompositionReducer';
import savedCompositionsReducer from './savedCompositionsReducer';

const rootReducer = combineReducers({
    currentComposition: currentCompositionReducer,
    savedComposition: savedCompositionsReducer,
});

export default rootReducer;

export type IAppState = ReturnType<typeof rootReducer>