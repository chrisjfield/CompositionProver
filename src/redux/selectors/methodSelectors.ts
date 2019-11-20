import { IAppState } from "../reducers/rootReducer";

export function getMethods(state: IAppState) {
    const stage = state.currentComposition.settings.methodStage;
    return state.currentComposition.methods.filter((method) => method.stage === stage);
}

export function getCompositionMethods(state: IAppState) {
    const stage = state.currentComposition.composition.numberOfBells;
    return state.currentComposition.methods.filter((method) => method.stage <= stage);
}

export function getAllMethods(state: IAppState) {
    return state.currentComposition.methods;
}