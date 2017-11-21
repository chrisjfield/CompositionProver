import { Action, ICompositionReducerState } from '../interfaces/Interfaces';

import { UPDATE_STAGE, UPDATE_PARTS, UPDATE_COMPOSITION } from '../actions/compositionActions';

import { minor } from '../defaults';

function compositionReducer(state: ICompositionReducerState = {
    stage: minor.numberOfBells,
    parts: 1,
    composition: undefined,
},                          action: Action) {
    switch (action.type) {
    case UPDATE_STAGE:
        return {
            ...state,
            stage: action.payload,
        };
    case UPDATE_PARTS:
        return {
            ...state,
            parts: action.payload,
        };
    case UPDATE_COMPOSITION:
        return {
            ...state,
            composition: action.payload,
        };
    default:
        return state;
    }
}

export default compositionReducer;
