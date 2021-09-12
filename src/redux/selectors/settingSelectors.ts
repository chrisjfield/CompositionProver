import { IAppState } from "../reducers/rootReducer";

export default function getSettingsStage(state: IAppState) {
    return state.currentComposition.settings.methodStage;
}