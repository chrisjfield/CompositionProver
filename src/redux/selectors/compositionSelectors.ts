import { IAppState } from "../reducers/rootReducer";

export function getCurrentComposition(state: IAppState) {
    return state.currentComposition.composition;
}
