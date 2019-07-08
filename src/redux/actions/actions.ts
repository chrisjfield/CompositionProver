import { EDIT_SETTINGS, EDIT_CALL } from "./actionTypes";
import { IEditSettingsAction, ICall, IEditCallAction } from "../../interfaces/interfaces";

export const editSettingsStage = (stage: number): IEditSettingsAction => ({
    type: EDIT_SETTINGS,
    payload: { methodStage: stage },
});

export const editCall = (call: ICall): IEditCallAction => ({
    type: EDIT_CALL,
    payload: call,
});