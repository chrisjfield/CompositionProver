import { IStage } from "../interfaces/interfaces";
import { getStageCharacter } from "../helpers/stageHelper";

export const ringingStages: IStage[] = [
    { name: 'Minimus', stage: 4 },
    { name: 'Doubles', stage: 5 },
    { name: 'Minor', stage: 6 },
    { name: 'Triples', stage: 7 },
    { name: 'Major', stage: 8 },
    { name: 'Caters', stage: 9 },
    { name: 'Royal', stage: 10 },
    { name: 'Cinques', stage: 11 },
    { name: 'Maximus', stage: 12 },
];

export const getStageNotationRegex = (stage: number) => {
    // generates a regex expression that matches a single valid 
    //place notation for the given stage
    let regexString = '';

    // get a lookahead to guarantee at least 1 character present
    if (stage < 10) {
        regexString += `(?=[1-${getStageCharacter(stage)}])`;
    } else if (stage === 10) {
        regexString += `(?=[0-9])`;
    } else if (stage === 11) {
        regexString += `(?=[0-9E])`;
    } else if (stage === 12) {
        regexString += `(?=[0-9ET])`;
    }

    regexString += '(';
    for (let i = 1; i <= stage; i++) {
        regexString += `[${getStageCharacter(i)}]?`;
    }
    regexString += ')';

    return regexString;
}
