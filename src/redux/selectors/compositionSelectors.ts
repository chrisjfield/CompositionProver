import { IAppState } from "../reducers/rootReducer";

export function getCurrentComposition(state: IAppState) {
    return state.currentComposition.composition;
}

export function getCurrentCompositionWithDetails(state: IAppState) {
    return state.currentComposition;
}
