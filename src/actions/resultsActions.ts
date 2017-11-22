import { IResultReducerState } from '../interfaces/Interfaces';

export const SET_RESULTS = 'SET_RESULTS';

export function updateResults(results: IResultReducerState) {
    return {
        type: SET_RESULTS,
        payload: results,
    };
}
