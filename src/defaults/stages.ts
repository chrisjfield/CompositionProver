import { IStage } from "../interfaces/interfaces";

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

export const getStageRegex = (stage: number) => {
    let regexString = '';
    for (let i = 1; i <= stage; i++) {
        regexString += `[${getStageCharacter(i)}]?`;
    }

    return regexString;
}

export const getStageCharacter = (stage: number) => {
    let char: string = ''
    switch (stage) {
        case 10:
            char = '0';
            break;
        case 11:
            char = 'E';
            break;
        case 12:
            char = 'T';
            break;
        default:
            char = stage.toString();
    }

    return char;
}