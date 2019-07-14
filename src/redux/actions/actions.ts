import { EDIT_SETTINGS, EDIT_CALL, EDIT_METHOD, ADD_METHOD, DELETE_METHOD } from "./actionTypes";
import { IEditSettingsAction, ICall, IEditCallAction, IMethod, IEditMethodAction, IAddMethodAction, IDeleteMethodAction, INewMethod } from "../../interfaces/interfaces";

export const editSettingsStage = (stage: number): IEditSettingsAction => ({
    type: EDIT_SETTINGS,
    payload: { methodStage: stage },
});

export const editCall = (call: ICall): IEditCallAction => ({
    type: EDIT_CALL,
    payload: call,
});

export const editMethod = (method: IMethod): IEditMethodAction => ({
    type: EDIT_METHOD,
    payload: method,
});

export const addMethod = (method: INewMethod): IAddMethodAction => ({
    type: ADD_METHOD,
    payload: method,
});

export const deleteMethod = (id: number): IDeleteMethodAction => ({
    type: DELETE_METHOD,
    payload: id,
});
