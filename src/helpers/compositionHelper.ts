import { IMethod, ICall } from "../interfaces/interfaces";
import { getMethodAbbreviationRegex } from "./methodHelper";
import { getCallAbbreviationRegex } from "./callHelper";


export const isValidFullComposition = (calls: ICall[], methods: IMethod[], composition?: string) => {
    let valid = true;

    if (composition) {
        // compositions can have definitions at the start in the form: part=x.x;
        // compositions are all in the form x.x, or part.part, or a combination i.e. part.x

        // First get the regex for valid "x" values for a composition type
        // Then split on ";" to get the part definitions and check they are valid
        // Second check the final element is valid where x can be the "x" definition or a part
        // const stageRegex = getStageNotationRegex(stage);

        const methodRegex = getMethodAbbreviationRegex(methods);
        const callRegex = getCallAbbreviationRegex(calls);
        let partRegex: String = '';

        const compositionParts = composition.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, ' ').split(';');
        const setInvalid = () => { valid = false };

        for (let i = 0; i < compositionParts.length; i++) {
            let notation;
            let partName;

            if (i !== compositionParts.length - 1) {
                const partDefinition = compositionParts[i].split('=');

                if (partDefinition.length !== 2) {
                    return false;
                }

                notation = partDefinition[1];
                partName = partDefinition[0];
            } else {
                notation = compositionParts[i];
            }

            if (`|${partRegex}|`.includes(`|${partName}|`)) {
                return false;
            }

            let validNotationRegex: RegExp;
            if (partRegex) {
                validNotationRegex = RegExp(`^(((${methodRegex}){1}(${callRegex})?)|(${partRegex}))$`);
            } else {
                validNotationRegex = RegExp(`^(${methodRegex}){1}(${callRegex})?$`);
            }

            notation.split('.').forEach(element => {
                if (!validNotationRegex.test(element)) {
                    setInvalid();
                }
            })

            if (partName) {
                partRegex = partRegex ? `${partRegex}|${partName}` : partName;
            }
        }
    }

    return valid;
}

export const isValidNumericalComposition = (composition?: string) => {
    let valid = true;

    // if (composition) {
    //     const stageRegex = getStageNotationRegex(stage);
    //     const validCallRegex = RegExp(`^${stageRegex}{1}([\\.\\-]{1}${stageRegex})*$`);
    //     valid = validCallRegex.test(notation);
    // }

    return valid;
}

export const isValidPositionalComposition = (composition?: string) => {
    let valid = true;

    // if (composition) {
    //     const stageRegex = getStageNotationRegex(stage);
    //     const validCallRegex = RegExp(`^${stageRegex}{1}([\\.\\-]{1}${stageRegex})*$`);
    //     valid = validCallRegex.test(notation);
    // }

    return valid;
}