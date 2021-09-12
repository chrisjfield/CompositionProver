import { IAppState } from "../reducers/rootReducer";

export function getCalls(state: IAppState) {
    const stage = state.currentComposition.settings.methodStage;
    return state.currentComposition.calls.filter((call) => call.stage === stage);
}