import { ICall } from '../interfaces/Interfaces';

export const UPDATE_CALLS = 'UPDATE_CALLS';
export const ADD_CALL = 'ADD_CALL';
export const DELETE_CALL = 'DELETE_CALL';

export function updateCalls(calls: ICall[]) {
    return {
        type: UPDATE_CALLS,
        payload: calls,
    };
}

export function addCall(newCall: ICall) {
    return {
        type: ADD_CALL,
        payload: newCall,
    };
}

export function deleteCall(call: ICall) {
    return {
        type: DELETE_CALL,
        payload: call,
    };
}
