import { IAppState } from "../reducers/rootReducer";

export function getMethods(state: IAppState) {
    const stage = state.currentComposition.settings.methodStage;
    return state.currentComposition.methods.filter((method) => method.stage === stage);
}