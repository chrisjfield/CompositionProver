import { Action, ICallReducerState, ICall } from '../interfaces/Interfaces';

import { UPDATE_CALLS, ADD_CALL, DELETE_CALL } from '../actions/callActions';
import { SET_STAGE_DEFAULT_CALLS } from '../actions/stageActions';

import { minor } from '../defaults';

function callReducer(state: ICallReducerState = {
    calls: minor.calls,
},                   action: Action) {
    switch (action.type) {
    case UPDATE_CALLS:
        return {
            ...state,
            calls: action.payload,
        };
    case ADD_CALL:
        return {
            ...state,
            calls: [...state.calls, action.payload],
        };
    case DELETE_CALL:
        return {
            ...state,
            calls: [...state.calls.filter((call: ICall) => call.callSymbol !== action.payload.callSymbol)],
        };
    case SET_STAGE_DEFAULT_CALLS:
        return {
            ...state,
            calls: action.payload.calls,
        };
    default:
        return state;
    }
}

export default callReducer;
