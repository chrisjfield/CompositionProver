import { IResult, IComposition, IMethod, ICall, ITruth, IMusicalChanges, IResultHelper, ILeadResults } from "../interfaces/interfaces";
import { getStageQueens, getStageTittums, getStageRollupsForward, getStageRollupsBackward, getInitialChange, getStageCharacter, getStageNumber } from "./stageHelper";
import { plainCall } from "./callHelper";

export const emptyResult: IResult = {
    changesOfMethod: 0,
    courseEnds: [],
    grid: [],
    leads: [],
    musicalChanges: {
        littleBellsBack: 0,
        littleBellsFront: 0,
        queens: 0,
        rollupsBack: 0,
        rollupsFront: 0,
        tittums: 0,
    },
    numberOfChanges: 0,
    partEnds: [],
    truth: {
        firstFalseRow: '',
        true: true,
    }
};

const emptyResultHelper: IResultHelper = {
    result: emptyResult,
    currentChange: '',
    expandedComposition: '',
    highestMethodStage: 0,
    initialChange: '',
    baseMethod: '',
    currentMethod: '',
    halfLeadsOn: false,
    halfLeadNext: false,
}

export const calculateResult = (composition: IComposition, methods: IMethod[], calls: ICall[], onComplete: (result: IResult) => void) => {
    var start = new Date().getTime();
    var end = start;
    while (end < start + 3000) {
        end = new Date().getTime();
    }
    let resultHelper: IResultHelper = JSON.parse(JSON.stringify(emptyResultHelper));

    if (!composition.composition) {
        throw new Error('No composition found');
    }

    // set the initial values
    resultHelper.initialChange = getInitialChange(composition.numberOfBells);
    resultHelper.expandedComposition = getExpandedComposition(composition.composition);
    resultHelper.halfLeadsOn = composition.halfLead;
    resultHelper.baseMethod = composition.startingMethod ? composition.startingMethod : '';

    for (let part = 1; part <= composition.parts; part += 1) {
        const lastPart: boolean = part === composition.parts;

        resultHelper = calculatePart(resultHelper, composition, methods, calls, lastPart);
    }

    // calculate the key stats - length, musicality and truth.
    resultHelper.result.numberOfChanges = resultHelper.result.grid.length;
    resultHelper.result.truth = getTruth(resultHelper.highestMethodStage, resultHelper.result.grid);
    resultHelper.result.musicalChanges = getMusicalChanges(resultHelper.highestMethodStage, resultHelper.result.grid);

    onComplete(resultHelper.result);
}

const getExpandedComposition = (composition: string) => {
    const compositionSections: string[] = composition.replace(/[\n\r\s]+/g, '').split(';');
    let compositionSectionDictionary: { [id: string]: string; } = {};
    let expandedComposition: string = '';

    for (let section = 0; section < compositionSections.length; section++) {
        let sectionNotation: string = '';
        let sectionName: string = '';

        // if it is not the last element it is a definition, else it is the actual composition.
        if (section !== compositionSections.length - 1) {
            const sectionDefinition = compositionSections[section].split('=');

            if (sectionDefinition.length !== 2) {
                throw new Error(`Composition abbreviation "${sectionDefinition}" is invalid.`);
            }

            sectionNotation = sectionDefinition[1];
            sectionName = sectionDefinition[0];

            if (sectionName in compositionSectionDictionary) {
                throw new Error(`Composition abbreviation "${sectionName}" is definted more than once.`);
            }
        } else {
            sectionNotation = compositionSections[section];
        }

        // loop through all previously defined sections and replace with the abbreviation with the actual notation
        for (const key in compositionSectionDictionary) {
            const compositionSection = compositionSectionDictionary[key];

            sectionNotation = sectionNotation.replace(key, compositionSection);
        }

        // if it is a definition store it, else return the composition
        if (section !== compositionSections.length - 1) {
            compositionSectionDictionary[sectionName] = sectionNotation;
        } else {
            expandedComposition = sectionNotation;
        }
    }

    return expandedComposition;
}

const calculatePart = (currentResultHelper: IResultHelper, composition: IComposition, methods: IMethod[], calls: ICall[], lastPart: boolean) => {
    let resultHelper = currentResultHelper;
    const compositionArray: string[] = resultHelper.expandedComposition.split('.').filter(x => x);

    for (let element = 0; element < compositionArray.length; element += 1) {
        const lastElement: boolean = (lastPart && element === compositionArray.length - 1);
        const compositionElement: string = compositionArray[element];

        switch (composition.type) {
            case 'Full':
                resultHelper = calculateFullElement(resultHelper, compositionElement, methods, calls, lastElement);
                break;
            case 'Numerical':
                resultHelper = calculateNumericalElement(resultHelper, compositionElement, methods, calls, lastElement);
                break;
            case 'Positional':
                resultHelper = calculatePositionalElement(resultHelper, compositionElement, methods, calls, lastElement);
                break;
        }
    }

    // add the part ends
    resultHelper.result.partEnds.push(resultHelper.currentChange);

    return resultHelper;
}

const calculateFullElement = (currentResultHelper: IResultHelper, compositionElement: String, methods: IMethod[], calls: ICall[], lastElement: boolean) => {
    // in the composition type, each element is a lead or half lead
    let resultHelper = currentResultHelper;
    const callAbbreviation: string = compositionElement.substr(compositionElement.length - 1);
    const methodAbbreviation: string = compositionElement.substr(0, compositionElement.length - 1);

    let call = calls.find(call => call.abbreviation === callAbbreviation);
    const method = methods.find(method => method.abbreviation === methodAbbreviation)

    if (!call && callAbbreviation === 'p') {
        call = plainCall;
    }

    if (!call) {
        throw new Error(`Composition element "${compositionElement}" does not end with a valid call.`);
    }

    if (!method) {
        throw new Error(`Composition element "${compositionElement}" does not start with a valid method.`);
    }

    let leadResults: ILeadResults = {
        call: callAbbreviation,
        method: methodAbbreviation,
        leadEnd: '',
        rows: [],
    };

    // get the place notation for the next lead (or half lead)
    const placeNotation: string[] = getPlaceNotation(currentResultHelper, method, call);

    for (let i = 0; i < placeNotation.length; i += 1) {
        const row: string = generateRow(currentResultHelper, placeNotation[i], method.stage);
        currentResultHelper.currentChange = row;
        currentResultHelper.result.grid.push(row);
        leadResults.rows.push(row);

        // if it comes round in the last lead before the end stop calculating - it's a snap finish
        if (lastElement && i !== placeNotation.length - 1 && row === currentResultHelper.initialChange) {
            // need to check if the last lead was a change of method and the stage before returning
            if (currentResultHelper.currentMethod && currentResultHelper.currentMethod !== method.abbreviation) {
                currentResultHelper.result.changesOfMethod += 1;
            }
            if (currentResultHelper.highestMethodStage < method.stage) {
                currentResultHelper.highestMethodStage = method.stage
            }

            return resultHelper;
        }
    }

    // calculate the change of methods and part end change where relevant
    leadResults.leadEnd = currentResultHelper.currentChange;
    currentResultHelper.result.leads.push(leadResults)

    if (currentResultHelper.currentMethod && currentResultHelper.currentMethod !== method.abbreviation) {
        currentResultHelper.result.changesOfMethod += 1;
    }
    if (currentResultHelper.highestMethodStage < method.stage) {
        currentResultHelper.highestMethodStage = method.stage
    }
    currentResultHelper.currentMethod = method.abbreviation;

    // part ends can only occur at a true lead end
    if (!currentResultHelper.halfLeadsOn || currentResultHelper.halfLeadNext) {
        const lastBell: string = currentResultHelper.currentChange[method.stage - 1];

        // Add the course end if the change ends with the tenor
        if (lastBell === getStageCharacter(method.stage)) {
            currentResultHelper.result.courseEnds.push(currentResultHelper.currentChange);
        }
    }

    // half lead will switch if using it
    if (currentResultHelper.halfLeadsOn) {
        currentResultHelper.halfLeadNext = !currentResultHelper.halfLeadNext;
    }

    return resultHelper;
}

const calculateNumericalElement = (currentResultHelper: IResultHelper, compositionElement: String, methods: IMethod[], calls: ICall[], lastElement: boolean) => {
    let resultHelper = currentResultHelper;

    return resultHelper;
}

const calculatePositionalElement = (currentResultHelper: IResultHelper, compositionElement: String, methods: IMethod[], calls: ICall[], lastElement: boolean) => {
    let resultHelper = currentResultHelper;

    return resultHelper;
}

const getPlaceNotation = (currentResultHelper: IResultHelper, method: IMethod, call: ICall) => {
    // if it has a comma then shortened notation is being used
    // in that case need to filp, remove half lead and add in the lead end notations
    const shortNotation: string[] = method.placeNotation.split(',');
    let placeNotationArray: string[] = shortNotation[0].split(/(-)|\./g).filter(x => x);

    if (shortNotation.length > 1) {
        const reverseNotation: string[] = [...placeNotationArray].reverse().slice(1);
        reverseNotation.push(shortNotation[1]);
        placeNotationArray = placeNotationArray.concat(reverseNotation);
    }

    //if we are using half leads take the relevant half of the array
    const arrayHalfIndex = Math.floor(placeNotationArray.length / 2);

    if (currentResultHelper.halfLeadsOn && currentResultHelper.halfLeadNext) {
        //half lead next, so take second half
        placeNotationArray = placeNotationArray.slice(arrayHalfIndex, placeNotationArray.length);
    } else if (currentResultHelper.halfLeadsOn && !currentResultHelper.halfLeadNext) {
        //half lead not next, take first half
        placeNotationArray = placeNotationArray.slice(0, arrayHalfIndex);
    }

    //if we have a non-plain call, edit the notation to adapt for it.
    const callNotation = (currentResultHelper.halfLeadsOn && currentResultHelper.halfLeadNext) ? call.halfLeadPlaceNotation : call.leadEndPlaceNotation;
    if (callNotation) {
        const callNotationArray: string[] = callNotation.split('.');

        // adjust for the call
        for (let i = 0; i < callNotationArray.length; i += 1) {
            placeNotationArray.pop();
        }
        for (let i = 0; i < callNotationArray.length; i += 1) {
            placeNotationArray.push(callNotationArray[i]);
        }
    }

    return placeNotationArray;
}

const generateRow = (currentResultHelper: IResultHelper, placeNotationElement: string, methodStage: number) => {
    const currentChange: string = currentResultHelper.currentChange ? currentResultHelper.currentChange : currentResultHelper.initialChange;
    const rowArray: string[] = Array.from(currentChange);
    const placeNotationArray: string[] = Array.from(placeNotationElement);
    const nextChange: string[] = [];

    // for each non cross item in the notation we make a place
    placeNotationArray.forEach(element => {
        if (element !== '-') {
            const position: number = getStageNumber(element);

            if (!position || position > methodStage) {
                throw new Error(`Place Notation "${placeNotationArray}" contains an invalid expression.`);
            }

            nextChange[position - 1] = rowArray[position - 1];
        }
    })

    // go backwards through the previous row and put all cover bells in place, then cross all remaining bells
    for (let i = rowArray.length - 1; i >= 0; i -= 1) {
        // If it already has a value ignore it, if it has a neigbour with no value switch it, else keep it as it was
        if (!nextChange[i]) {
            if (i >= methodStage) {
                nextChange[i] = rowArray[i]; //cover bells
            } else if (i > 0 && !nextChange[i - 1]) {
                nextChange[i] = rowArray[i - 1]; //need swapping
                nextChange[i - 1] = rowArray[i];
            } else {
                nextChange[i] = rowArray[i]; //forced places
            }
        }
    }

    return nextChange.join('');
}

const getTruth = (stage: number, rows: string[]) => {
    let rowsToCheck: string[] = rows;
    const truth: ITruth = {
        true: true,
        firstFalseRow: '',
    };
    const numberOfRows: number = rows.length;
    const extent: number = getFactorial(stage);
    // plus one to account for exact multiples of an extent - these will have 0 allowed of the next repeat number)
    const maxNumberOfEachChanges: number = Math.ceil((numberOfRows + 1) / extent);
    let numberOfMaxRepeatsLeft: number = numberOfRows % extent;

    // each change may only occur maxNumberOfEachChanges times or maxNumberOfEachChanges - 1 to get the most even spread possible
    // there are only numberOfMaxRepeatsLeft instances of each change repeating maxNumberOfEachChanges times.
    // therefore take a change, check if it repeats the right number of times, if so remove all instances from array.
    // if it repeats max times, take 1 from number of repeats
    // if it repeats outside the allowed range or number of max repeats drops below 0 it is false.
    while (truth.true && rowsToCheck.length > 0) {
        const rowToCheck: string = rowsToCheck[0];
        const countOfRows: number = rowsToCheck.filter(row => row === rowToCheck).length;

        // check if row is repeated an ok number of times
        if (countOfRows === maxNumberOfEachChanges) {
            numberOfMaxRepeatsLeft -= 1;
        } else if (countOfRows !== maxNumberOfEachChanges - 1) {
            truth.true = false;
            truth.firstFalseRow = rowToCheck;
        }

        // check if we have gone over the max number or maximum repeats
        if (numberOfMaxRepeatsLeft < 0) {
            truth.true = false;
            truth.firstFalseRow = rowToCheck;
        }

        // filter the rows left to check
        rowsToCheck = rowsToCheck.filter(row => row !== rowToCheck);
    }

    return truth;
}

const getFactorial = (number: number) => {
    let rval = 1;
    for (let i = 2; i <= number; i += 1)
        rval = rval * i;
    return rval;
}

const getMusicalChanges = (stage: number, rows: string[]) => {
    const queens: string = getStageQueens(stage);
    const tittums: string = getStageTittums(stage);
    const rollupsForward: string = getStageRollupsForward(stage);
    const rollupsBackward: string = getStageRollupsBackward(stage);
    const frontBellRunForward: string = '2345';
    const frontBellRunBackward: string = '5432';
    const musicalChanges: IMusicalChanges = {
        queens: getExactChangeCount(rows, queens),
        tittums: getExactChangeCount(rows, tittums),
        littleBellsBack: getBackChangeCount(rows, frontBellRunForward, frontBellRunBackward),
        littleBellsFront: getFrontChangeCount(rows, frontBellRunForward, frontBellRunBackward),
        rollupsBack: getBackChangeCount(rows, rollupsForward, rollupsBackward),
        rollupsFront: getFrontChangeCount(rows, rollupsForward, rollupsBackward),
    };

    return musicalChanges;
}

const getExactChangeCount = (rows: string[], change1: string) => {
    const filteredRows: string[] = rows.filter(row => row === change1);
    const count: number = filteredRows ? filteredRows.length : 0;

    return count;
}

const getFrontChangeCount = (rows: string[], change1: string, change2: string) => {
    const filteredRows: string[] = rows.filter(row => row.startsWith(change1) || row.startsWith(change2));
    const count: number = filteredRows ? filteredRows.length : 0;

    return count;
}

const getBackChangeCount = (rows: string[], change1: string, change2: string) => {
    const filteredRows: string[] = rows.filter(row => row.endsWith(change1) || row.endsWith(change2));
    const count: number = filteredRows ? filteredRows.length : 0;

    return count;
}