import { IStage } from '../interfaces/Interfaces';
import { getStageDefaults } from '../helpers/stagesHelper';
import { updateStage } from '../actions/compositionActions';

export const SET_STAGE_DEFAULT_CALLS = 'SET_STAGE_DEFAULT_CALLS';
export const SET_STAGE_DEFAULT_METHODS = 'SET_STAGE_DEFAULT_METHODS';

export function setStageDefaults(stage: number) {
    const stageDefaults: IStage = getStageDefaults(stage);

    return (dispatch: Function) => {
        return Promise.all([
            dispatch(setStageDefaultCalls(stageDefaults)),
            dispatch(setStageDefaultMethods(stageDefaults)),
            dispatch(updateStage(stageDefaults.numberOfBells)),
        ]);
    };
}

function setStageDefaultCalls(stage: IStage) {
    return {
        type: SET_STAGE_DEFAULT_CALLS,
        payload: stage,
    };
}

function setStageDefaultMethods(stage: IStage) {
    return {
        type: SET_STAGE_DEFAULT_METHODS,
        payload: stage,
    };
}
