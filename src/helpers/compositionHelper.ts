import 'mdn-polyfills/Array.prototype.find';
import 'mdn-polyfills/String.prototype.endsWith';
import 'mdn-polyfills/String.prototype.startsWith';

import store from './store';

import { IStore, IResultsHelper, IMusicalChanges, ILeadResults, ITruth } from '../interfaces/Interfaces';

import { getPositionFromNotationCharacter, getNotationCharacterFromPosition } from '../helpers/placeNotationHelper';
import {
    getInitialResults, getStageQueens, getStageTittums,
    getStageRollupsForward, getStageRollupsBackward,
} from '../helpers/stagesHelper';

import { updateResults } from '../actions/resultsActions';

export function generateResults() {
    const currentStore: IStore = <IStore>store.getState();
    let resultsHelper: IResultsHelper = getInitialResults(currentStore.compositionReducer.stage);

    if (!currentStore.compositionReducer.composition) {
        throw 'No composition found';
    } else if (!currentStore.compositionReducer.parts) {
        throw 'Composition has 0 parts';
    }

    for (let i = 1; i <= currentStore.compositionReducer.parts; i += 1) {
        const lastPart: boolean = i === currentStore.compositionReducer.parts;
        resultsHelper = generatePart(currentStore, resultsHelper, lastPart);
    }
    resultsHelper.results.numberOfChanges = resultsHelper.results.grid.length;
    resultsHelper.results.truth = getTruth(currentStore.compositionReducer.stage, resultsHelper.results.grid);
    resultsHelper.results.musicalChanges = getMusicalChanges(currentStore.compositionReducer.stage, resultsHelper.results.grid);

    store.dispatch(updateResults(resultsHelper.results));
}

function generatePart(currentStore: IStore, resultsHelper: IResultsHelper, lastPart: boolean) {
    const compositionArray: string[] = currentStore.compositionReducer.composition.split('.');
    let partHelper = resultsHelper;

    for (let i = 0, len = compositionArray.length; i < len; i += 1) {
        const lastLead: boolean = (lastPart && i === compositionArray.length - 1);
        partHelper = generateLead(currentStore, partHelper, compositionArray[i], lastLead);
    }
    // Add the part end to the results
    partHelper.results.partEnds.push(partHelper.latestRow);

    return partHelper;
}

function generateLead(currentStore: IStore, resultsHelper: IResultsHelper, leadCall: string, lastLead: boolean) {
    let leadHelper = resultsHelper;
    const call: string = leadCall.substr(leadCall.length - 1);
    const method: string = leadCall.substr(0, leadCall.length - 1);
    const leadResults: ILeadResults = {
        call,
        method,
        leadEnd: null,
        rows: [],
    };
    const leadPlaceNotation: string[] = getLeadPlaceNotation(currentStore, method, call);

    // add to change of method if new method differs from previous and it's not the first.
    leadHelper.results.changesOfMethod =
        (leadHelper.latestMethod && leadHelper.latestMethod !== method)
            ? leadHelper.results.changesOfMethod + 1
            : leadHelper.results.changesOfMethod;
    leadHelper.latestMethod = method;

    for (let i = 0, len = leadPlaceNotation.length; i < len; i += 1) {
        leadHelper = generateRows(currentStore, leadHelper, leadPlaceNotation[i]);
        leadResults.rows.push(leadHelper.latestChange);
        // if it comes round in the last lead stop calculating - it's a snap finish
        if (lastLead && i !== leadPlaceNotation.length - 1
            && leadHelper.latestChange.toString() === leadHelper.initialChange.toString()) {
            return leadHelper;
        }
    }
    // Add the lead end to the results
    leadResults.leadEnd = leadHelper.latestRow;
    leadHelper.results.leads.push(leadResults);

    const lastBell: string = (currentStore.compositionReducer.stage % 2 === 0)
        ? leadHelper.latestChange[leadHelper.latestChange.length - 1]
        : leadHelper.latestChange[leadHelper.latestChange.length - 2];

    // Add the course end if the change ends with the tenor
    if (lastBell === getNotationCharacterFromPosition(currentStore.compositionReducer.stage)) {
        leadHelper.results.courseEnds.push(leadHelper.latestRow);
    }

    return leadHelper;
}

function getLeadPlaceNotation(currentStore: IStore, methodSymbol: string, callSymbol: string) {
    const stage: number = currentStore.compositionReducer.stage;
    const method = currentStore.methodReducer.methods.find(method => method.methodSymbol === methodSymbol && method.stage === stage);
    if (!method) {
        throw 'Could not find a method for the code: "' + methodSymbol + '"';
    } else if (method && !method.methodPlaceNotation) {
        throw 'No place notation found for method: "' + method.methodName + '"';
    }

    // if it has a comma then shortened notation is being used
    // in that case need to filp, remove half lead and add in the lead end notations
    const shortNotation: string[] = method.methodPlaceNotation.split(',');
    let placeNotationArray: string[] = shortNotation[0].split(/(x)|\./g).filter(x => x);

    if (shortNotation.length > 1) {
        const reverseNotation: string[] = [...placeNotationArray].reverse().slice(1);
        reverseNotation.push(shortNotation[1]);
        placeNotationArray = placeNotationArray.concat(reverseNotation);
    }
    const call = currentStore.callReducer.calls.find(call => call.callSymbol === callSymbol);
    if (!call && callSymbol !== 'p') {
        throw 'Could not find a call for the code: "' + callSymbol + '"';
    } else if (call && !call.callNotation && callSymbol !== 'p') {
        throw 'No place notation found for call: "' + call.callName + '"';
    }

    if (call && call.callNotation) {
        const callNotationArray: string[] = call.callNotation.split('.');

        // adjust for the lead call
        for (let i = 0, len = callNotationArray.length; i < len; i += 1) {
            placeNotationArray.pop();
        }
        for (let i = 0, len = callNotationArray.length; i < len; i += 1) {
            placeNotationArray.push(callNotationArray[i]);
        }
    }

    return placeNotationArray;
}

export function generateRows(currentStore: IStore, resultsHelper: IResultsHelper, notation: string) {
    const rowHelper: IResultsHelper = resultsHelper;
    const numberOfBells: number = currentStore.compositionReducer.stage;
    const latestChange: string[] = rowHelper.latestChange;
    const nextChange: string[] = [];
    const coverBell: number = (numberOfBells % 2) ? numberOfBells + 1 : undefined;

    for (let i = 0, len = notation.length; i < len; i += 1) {
        const position: number = getPositionFromNotationCharacter(notation[i]);
        if (notation[i] !== 'x' && (!position || position > 12)) {
            throw 'Place notation: "' + notation + '" could not be parsed - contains invalid notation.';
        }

        if (position) {
            nextChange[position - 1] = latestChange[position - 1];
        }
    }

    for (let j = 0; j < numberOfBells; j += 1) {
        // If it already has a value ignore it, if it has a neigbour with no value switch it, else keep it as it was
        if (!nextChange[j] && !nextChange[j + 1] && numberOfBells >= j + 2) {
            nextChange[j] = latestChange[j + 1];
            nextChange[j + 1] = latestChange[j];
        } else if (!nextChange[j]) {
            nextChange[j] = latestChange[j];
        }
    }

    rowHelper.latestChange = nextChange;

    // Add in the cover bell smf set the latest row as string
    if (coverBell) {
        nextChange.push(getNotationCharacterFromPosition(coverBell));
    }

    rowHelper.latestRow = nextChange.join(' ');
    rowHelper.results.grid.push(rowHelper.latestRow);

    return rowHelper;
}

function getMusicalChanges(stage: number, rows: string[]) {
    const queens: string = getStageQueens(stage);
    const tittums: string = getStageTittums(stage);
    const rollupsForward: string = getStageRollupsForward(stage);
    const rollupsBackward: string = getStageRollupsBackward(stage);
    const frontBellRunForward: string = '2 3 4 5';
    const frontBellRunBackward: string = '5 4 3 2';
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

function getExactChangeCount(rows: string[], change1: string) {
    const filteredRows: string[] = rows.filter(row => row === change1);
    const count: number = filteredRows ? filteredRows.length : 0;

    return count;
}

function getFrontChangeCount(rows: string[], change1: string, change2: string) {
    const filteredRows: string[] = rows.filter(row => row.startsWith(change1) || row.startsWith(change2));
    const count: number = filteredRows ? filteredRows.length : 0;

    return count;
}

function getBackChangeCount(rows: string[], change1: string, change2: string) {
    const filteredRows: string[] = rows.filter(row => row.endsWith(change1) || row.endsWith(change2));
    const count: number = filteredRows ? filteredRows.length : 0;

    return count;
}

function getTruth(stage: number, rows: string[]) {
    let rowsToCheck: string[] = rows;
    const truth: ITruth = {
        true: true,
        firstFalseRow: null,
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
        } else if (countOfRows === maxNumberOfEachChanges - 1) {
            numberOfMaxRepeatsLeft = numberOfMaxRepeatsLeft;
        } else {
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

function getFactorial(number: number) {
    let rval = 1;
    for (let i = 2; i <= number; i += 1)
        rval = rval * i;
    return rval;
}
