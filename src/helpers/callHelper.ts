import { getStageRegex } from "../defaults/stages";

export const isValidCallNotation = (stage: number, notation?: string) => {
    let valid = true;

    if (notation) {
        const stageRegex = getStageRegex(stage);
        const validCallRegex = RegExp(`^(?!\\.)(${stageRegex}){1}([\\.]{1}${stageRegex})*$`);
        valid = validCallRegex.test(notation);
    }

    return valid;
}