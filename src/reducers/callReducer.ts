import { Action, ICallReducerState, ICall } from '../interfaces/Interfaces';

import { UPDATE_CALLS, ADD_CALL, DELETE_CALL } from '../actions/callActions';

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
    default:
        return state;
    }
}

export default callReducer;
