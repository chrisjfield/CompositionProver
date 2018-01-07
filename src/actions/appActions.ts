export const ADD_ERROR = 'ADD_ERROR';

export function addError(error: string) {
    return {
        type: ADD_ERROR,
        payload: error,
    };
}
