import { combineReducers } from 'redux';

import callReducer from './currentCompositon/callReducer';
import methodReducer from './currentCompositon/methodReducer';
import compositionReducer from './currentCompositon/compositionReducer';
import settingsReducer from './currentCompositon/settingsReducer';

const currentCompositionReducer = combineReducers({
    calls: callReducer,
    methods: methodReducer,
    composition: compositionReducer,
    settings: settingsReducer,
});

export default currentCompositionReducer;

export type ICurrentCompositionState = ReturnType<typeof currentCompositionReducer>