export const UPDATE_SINGLE = 'UPDATE_SINGLE';
export const UPDATE_BOB = 'UPDATE_BOB';
export const UPDATE_EXTREME = 'UPDATE_EXTREME';
export const UPDATE_STAGE = 'UPDATE_STAGE';
export const UPDATE_PLACENOTATION = 'UPDATE_PLACENOTATION';
export const UPDATE_COMPOSITION = 'UPDATE_COMPOSITION';
export const UPDATE_ROWS = 'UPDATE_ROWS';
export const UPDATE_TRUTH = 'UPDATE_TRUTH';

export function updateSingle(notation: string) {
    return {
        type: UPDATE_SINGLE,
        payload: notation,
    };
}

export function updateBob(notation: string) {
    return {
        type: UPDATE_BOB,
        payload: notation,
    };
}

export function updateExtreme(notation: string) {
    return {
        type: UPDATE_EXTREME,
        payload: notation,
    };
}

export function updateStage(stage: number) {
    return {
        type: UPDATE_STAGE,
        payload: stage,
    };
}

export function updatePlaceNotation(placeNotation: string) {
    return {
        type: UPDATE_PLACENOTATION,
        payload: placeNotation,
    };
}

export function updateComposition(composition: string) {
    return {
        type: UPDATE_COMPOSITION,
        payload: composition,
    };
}

export function updateRows(rows: string[]) {
    return {
        type: UPDATE_ROWS,
        payload: rows,
    };
}

export function updateTruth(truth: boolean) {
    return {
        type: UPDATE_TRUTH,
        payload: truth,
    };
}
