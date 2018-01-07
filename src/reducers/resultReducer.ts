import { Action, IResultReducerState } from '../interfaces/Interfaces';

import { getInitialResults } from '../helpers/stagesHelper';

import { SET_RESULTS } from '../actions/resultsActions';
import { ADD_ERROR } from '../actions/appActions';

function resultsReducer(state: IResultReducerState = getInitialResults(6).results, action: Action) {
    switch (action.type) {
    case SET_RESULTS:
        return {
            ...state,
            leads: action.payload.leads,
            grid: action.payload.grid,
            courseEnds: action.payload.courseEnds,
            partEnds: action.payload.partEnds,
            numberOfChanges: action.payload.numberOfChanges,
            changesOfMethod: action.payload.changesOfMethod,
            truth: action.payload.truth,
            initialChangeString: action.payload.initialChangeString,
            musicalChanges: action.payload.musicalChanges,
            calculationError: null as string,
        };
    case ADD_ERROR:
        return {
            ...state,
            calculationError: action.payload,
        };
    default:
        return state;
    }
}

export default resultsReducer;
