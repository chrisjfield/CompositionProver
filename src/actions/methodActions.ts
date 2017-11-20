import { IMethod } from '../interfaces/Interfaces';

export const UPDATE_METHODS = 'UPDATE_METHODS';
export const ADD_METHODS = 'ADD_METHODS';
export const DELETE_METHODS = 'DELETE_METHODS';

export function updateMethods(methods: IMethod[]) {
    return {
        type: UPDATE_METHODS,
        payload: methods,
    };
}

export function addMethod(newMethod: IMethod) {
    return {
        type: ADD_METHODS,
        payload: newMethod,
    };
}

export function deleteMethod(method: IMethod) {
    return {
        type: DELETE_METHODS,
        payload: method,
    };
}
