import { IStageEnum, IStage, IResultsHelper } from '../interfaces/Interfaces';
import { minimus, doubles, minor, triples, major, caters, royal, cinques, maximus } from '../defaults';
import { getNotationCharacterFromPosition } from '../helpers/placeNotationHelper';

export const ringingStages: IStageEnum[] = [
    { stage: 'Minimus', numberOfBells: 4 },
    { stage: 'Doubles', numberOfBells: 5 },
    { stage: 'Minor', numberOfBells: 6 },
    { stage: 'Triples', numberOfBells: 7 },
    { stage: 'Major', numberOfBells: 8 },
    { stage: 'Caters', numberOfBells: 9 },
    { stage: 'Royal', numberOfBells: 10 },
    { stage: 'Cinques', numberOfBells: 11 },
    { stage: 'Maximus', numberOfBells: 12 },
];

export function getStageDefaults(stage: number) {
    let stageDefault: IStage;
    switch (stage) {
    case 4: 
        stageDefault = minimus;
        break;
    case 5: 
        stageDefault = doubles;
        break;
    case 6: 
        stageDefault = minor;
        break;
    case 7: 
        stageDefault = triples;
        break;
    case 8: 
        stageDefault = major;
        break;
    case 9: 
        stageDefault = caters;
        break;
    case 10: 
        stageDefault = royal;
        break;
    case 11: 
        stageDefault = cinques;
        break;
    case 12: 
        stageDefault = maximus;
        break;
    }

    return stageDefault;
}

export function getInitialResults(stage: number) {
    // add a cover bell if needed
    const stageWithCover: number = (stage % 2) ? stage + 1 : stage;

    // generate the initial array and string
    const initialChange: string[] = [];
    for (let i = 1; i <= stageWithCover; i += 1) { 
        initialChange.push(getNotationCharacterFromPosition(i));
    }
    const initialChangeString: string = initialChange.join(' ');

    const resultsDefault: IResultsHelper = {
        initialChange,
        latestChange: initialChange,
        latestMethod: undefined,
        latestRow: undefined,
        results: {
            initialChangeString,
            changesOfMethod: 0,
            grid: [],
            leadEnds: [],
            courseEnds: [],
            partEnds: [],
            numberOfChanges: 0,
            truth: false,
            musicalChanges: {
                queens: 0,
                tittums: 0,
                littleBellsBack: 0,
                littleBellsFront: 0,
                rollupsBack: 0,
                rollupsFront: 0,
            },
        },
    };

    return resultsDefault;
}

export function getStageQueens(stage: number) {
    let queens: string;
    switch (stage) {
    case 4: 
        queens = '1 3 2 4';
        break;
    case 5: 
        queens = '1 3 5 2 4 6';
        break;
    case 6: 
        queens = '1 3 5 2 4 6';
        break;
    case 7: 
        queens = '1 3 5 7 2 4 6 8';
        break;
    case 8: 
        queens = '1 3 5 7 2 4 6 8';
        break;
    case 9: 
        queens = '1 3 5 7 9 2 4 6 8 0';
        break;
    case 10: 
        queens = '1 3 5 7 9 2 4 6 8 0';
        break;
    case 11: 
        queens = '1 3 5 7 9 E 2 4 6 8 0 T';
        break;
    case 12: 
        queens = '1 3 5 7 9 E 2 4 6 8 0 T';
        break;
    }

    return queens;
}

export function getStageTittums(stage: number) {
    let tittums: string;
    switch (stage) {
    case 4: 
        tittums = '1 3 2 4';
        break;
    case 5: 
        tittums = '1 4 2 5 3 6';
        break;
    case 6: 
        tittums = '1 4 2 5 3 6';
        break;
    case 7: 
        tittums = '1 5 2 6 3 7 4 8';
        break;
    case 8: 
        tittums = '1 5 2 6 3 7 4 8';
        break;
    case 9: 
        tittums = '1 6 2 7 3 8 4 9 5 0';
        break;
    case 10: 
        tittums = '1 6 2 7 3 8 4 9 5 0';
        break;
    case 11: 
        tittums = '1 7 2 8 3 9 4 0 5 E 6 T';
        break;
    case 12: 
        tittums = '1 7 2 8 3 9 4 0 5 E 6 T';
        break;
    }

    return tittums;
}

export function getStageRollupsForward(stage: number) {
    let rollups: string;
    switch (stage) {
    case 4: 
        rollups = '1 2 3 4';
        break;
    case 5: 
        rollups = '3 4 5 6';
        break;
    case 6: 
        rollups = '3 4 5 6';
        break;
    case 7: 
        rollups = '5 6 7 8';
        break;
    case 8: 
        rollups = '5 6 7 8';
        break;
    case 9: 
        rollups = '7 8 9 0';
        break;
    case 10: 
        rollups = '7 8 9 0';
        break;
    case 11: 
        rollups = '9 0 E T';
        break;
    case 12: 
        rollups = '9 0 E T';
        break;
    }

    return rollups;
}

export function getStageRollupsBackward(stage: number) {
    let rollups: string;
    switch (stage) {
    case 4: 
        rollups = '4 3 2 1';
        break;
    case 5: 
        rollups = '6 5 4 3';
        break;
    case 6: 
        rollups = '6 5 4 3';
        break;
    case 7: 
        rollups = '8 7 6 5';
        break;
    case 8: 
        rollups = '8 7 6 5';
        break;
    case 9: 
        rollups = '0 9 8 7';
        break;
    case 10: 
        rollups = '0 9 8 7';
        break;
    case 11: 
        rollups = 'T E 0 9';
        break;
    case 12: 
        rollups = 'T E 0 9';
        break;
    }

    return rollups;
}
