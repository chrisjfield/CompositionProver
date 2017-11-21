export const UPDATE_STAGE = 'UPDATE_STAGE';
export const UPDATE_PARTS = 'UPDATE_PARTS';
export const UPDATE_COMPOSITION = 'UPDATE_COMPOSITION';

export function updateStage(stage: number) {
    return {
        type: UPDATE_STAGE,
        payload: stage,
    };
}

export function updateParts(parts: number) {
    return {
        type: UPDATE_PARTS,
        payload: parts,
    };
}

export function updateComposition(composition: string) {
    return {
        type: UPDATE_COMPOSITION,
        payload: composition,
    };
}
