import { Action, IMethodReducerState, IMethod } from '../interfaces/Interfaces';

import { UPDATE_METHODS, ADD_METHODS, DELETE_METHODS } from '../actions/methodActions';
import { SET_STAGE_DEFAULT_METHODS } from '../actions/stageActions';

import { minor } from '../defaults';

function methodReducer(state: IMethodReducerState = {
    methods: minor.methods,
},                     action: Action) {
    switch (action.type) {
    case UPDATE_METHODS:
        return {
            ...state,
            methods: action.payload,
        };
    case ADD_METHODS:
        return {
            ...state,
            methods: [...state.methods, action.payload],
        };
    case DELETE_METHODS:
        return {
            ...state,
            methods: [...state.methods.filter((method: IMethod) => method.methodId !== action.payload.methodId)],
        };
    case SET_STAGE_DEFAULT_METHODS:
        return {
            ...state,
            methods: action.payload.methods,
        };
    default:
        return state;
    }
}

export default methodReducer;
