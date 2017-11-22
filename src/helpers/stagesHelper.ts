import { IStageEnum, IStage, IResultsHelper } from '../interfaces/Interfaces';
import { minimus, doubles, minor, triples, major, caters, royal, cinques, maximus } from '../defaults';

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
    const initialChange: number[] = [];
    for (let i = 1; i <= stageWithCover; i += 1) { 
        initialChange.push(i);
    }
    const initialChangeString: string = initialChange.join(' ');

    const resultsDefault: IResultsHelper = {
        initialChange,
        latestChange: initialChange,
        latestMethod: undefined,
        latestRow: undefined,
        results: {
            changesOfMethod: 0,
            grid: [initialChangeString],
            leadEnds: [],
            courseEnds: [],
            partEnds: [],
            numberOfChanges: 0,
            truth: true,
        },
    };

    return resultsDefault;
}
