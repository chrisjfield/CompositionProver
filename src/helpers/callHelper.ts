import { getStageNotationRegex } from "../defaults/stages";
import { ICall } from "../interfaces/interfaces";

export const isValidCallNotation = (stage: number, notation?: string) => {
    let valid = true;

    if (notation) {
        const stageRegex = getStageNotationRegex(stage);
        const validCallRegex = RegExp(`^${stageRegex}{1}([\\.\\-]{1}${stageRegex})*$`);
        valid = validCallRegex.test(notation);
    }

    return valid;
}

export const getCallAbbreviationRegex = (calls: ICall[]) => {
    let regex = ''

    if (calls.length > 0) {
        calls.forEach(call => regex += `${call.abbreviation}|`)
        regex += 'p';
    }

    return regex;
}