import { EDIT_SETTINGS, EDIT_CALL, EDIT_METHOD, ADD_METHOD, DELETE_METHOD, EDIT_CURRENT_COMPOSITION, EDIT_METHODS, EDIT_CALLS } from './actionTypes';
import { IEditSettingsAction, ICall, IEditCallAction, IMethod, IEditMethodAction, IAddMethodAction, IDeleteMethodAction, INewMethod, IComposition, ICompositionAction, IEditMethodsAction, IEditCallsAction } from '../../interfaces/interfaces';

export const editSettingsStage = (stage: number): IEditSettingsAction => ({
    type: EDIT_SETTINGS,
    payload: { methodStage: stage },
});

export const editCall = (call: ICall): IEditCallAction => ({
    type: EDIT_CALL,
    payload: call,
});

export const editCalls = (calls: ICall[]): IEditCallsAction => ({
    type: EDIT_CALLS,
    payload: calls,
});

export const editMethod = (method: IMethod): IEditMethodAction => ({
    type: EDIT_METHOD,
    payload: method,
});

export const editMethods = (methods: IMethod[]): IEditMethodsAction => ({
    type: EDIT_METHODS,
    payload: methods,
});

export const addMethod = (method: INewMethod): IAddMethodAction => ({
    type: ADD_METHOD,
    payload: method,
});

export const newMethod = (stage: number): IAddMethodAction => {
    const newMethod: INewMethod = {
        name: 'New Custom Method',
        abbreviation: 'ncm' + stage.toString(),
        stage: stage,
        placeNotation: '',
        defaultBob: 'b',
        defaultSingle: 's',
    }

    return {
        type: ADD_METHOD,
        payload: newMethod,
    }
};

export const deleteMethod = (id: number): IDeleteMethodAction => ({
    type: DELETE_METHOD,
    payload: id,
});

export const editCurrentComposition = (composition: IComposition): ICompositionAction => ({
    type: EDIT_CURRENT_COMPOSITION,
    payload: composition,
})
