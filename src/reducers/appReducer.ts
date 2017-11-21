import { Action, IAppReducerState } from '../interfaces/Interfaces';

import { 
    UPDATE_SINGLE, UPDATE_BOB, UPDATE_EXTREME, UPDATE_ROWS, UPDATE_TRUTH,
    UPDATE_STAGE, UPDATE_PLACENOTATION, UPDATE_COMPOSITION, UPDATE_LEADENDS,
} from '../actions/appActions';

function appReducer(state: IAppReducerState = {
    single: '1234',
    bob: '14',
    extreme: '16',
    stage: 6,
    placeNotation: 'X.16.X.16.X.16.X.16.X.16.X.16',
    composition: 'p.p.p.p.p',
    rows: [],
    leadEnds: [],
    initialChange: [1,2,3,4,5,6],
    truth: true,
},                  action: Action) {
    switch (action.type) {
    case UPDATE_SINGLE:
        return {
            ...state,
            single: action.payload,
        };
    case UPDATE_BOB:
        return {
            ...state,
            bob: action.payload,
        };
    case UPDATE_EXTREME:
        return {
            ...state,
            extreme: action.payload,
        };
    case UPDATE_STAGE:
        const initialChange: number[] = [];
        for (let i = 1; i <= action.payload; i += 1) { initialChange.push(i);}

        return {
            ...state,
            initialChange,
            stage: action.payload,
            
        };
    case UPDATE_ROWS:
        return {
            ...state,
            rows: action.payload,
        };
    case UPDATE_LEADENDS:
        return {
            ...state,
            leadEnds: action.payload,
        };
    case UPDATE_PLACENOTATION:
        return {
            ...state,
            placeNotation: action.payload,
        };
    case UPDATE_COMPOSITION:
        return {
            ...state,
            composition: action.payload,
        };
    case UPDATE_TRUTH:
        return {
            ...state,
            truth: action.payload,
        };
    default:
        return state;
    }
}

export default appReducer;
