import { Action, IResultReducerState } from '../interfaces/Interfaces';

import { SET_RESULTS } from '../actions/resultsActions';

function resultsReducer(state: IResultReducerState = null, action: Action) {
    switch (action.type) {
    case SET_RESULTS:
        return {
            ...state,
            grid: action.payload.grid,
            leadEnds: action.payload.leadEnds,
            courseEnds: action.payload.courseEnds,
            partEnds: action.payload.partEnds,
            numberOfChanges: action.payload.numberOfChanges,
            changesOfMethod: action.payload.changesOfMethod,
            truth: action.payload.truth,
        };
    default:
        return state;
    }
}

export default resultsReducer;
