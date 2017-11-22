import store from './store';

import { IStore, IResultsHelper } from '../interfaces/Interfaces';

import { getPositionFromNotationCharacter } from '../helpers/placeNotationHelper';
import { getInitialResults } from '../helpers/stagesHelper';

import { updateResults } from '../actions/resultsActions';

export function generateResults() {
    const currentStore: IStore = <IStore>store.getState();
    let resultsHelper: IResultsHelper = getInitialResults(currentStore.compositionReducer.stage);

    for (let i = 1; i <= currentStore.compositionReducer.parts; i += 1) {
        const lastPart: boolean = i === currentStore.compositionReducer.parts;
        resultsHelper = generatePart(currentStore, resultsHelper, lastPart);
    }

    console.log(resultsHelper);
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
    const leadPlaceNotation: string[] = getLeadPlaceNotation(currentStore, method, call);
    
    // add to change of method if new method differs from previous and it's not the first.
    leadHelper.results.changesOfMethod = 
        (leadHelper.latestMethod && leadHelper.latestMethod !== method)
        ? leadHelper.results.changesOfMethod + 1 
        : leadHelper.results.changesOfMethod;
    leadHelper.latestMethod = method;

    for (let i = 0, len = leadPlaceNotation.length; i < len; i += 1) {
        leadHelper = generateRows(currentStore, leadHelper, leadPlaceNotation[i]);

        if (lastLead && leadHelper.latestChange.toString() === leadHelper.initialChange.toString()) {
            return leadHelper;
        }
    }
    // Add the lead end to the results
    leadHelper.results.leadEnds.push(leadHelper.latestRow);

    // Add the course end if the change ends with the tenor
    if (leadHelper.latestChange[leadHelper.latestChange.length - 1] === currentStore.compositionReducer.stage) {
        leadHelper.results.courseEnds.push(leadHelper.latestRow);
    }

    return leadHelper;
}

function getLeadPlaceNotation(currentStore: IStore, methodSymbol: string, callSymbol: string) {
    const method = currentStore.methodReducer.methods.find(method => method.methodSymbol === methodSymbol);
    const placeNotationArray: string[] = method.methodPlaceNotation.split('.');
    const call = currentStore.callReducer.calls.find(call => call.callSymbol === callSymbol);  

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
    const latestChange: number[] = rowHelper.latestChange;
    const nextChange: number[] = [];
    const coverBell: string = (numberOfBells % 2) ? ' ' + String(numberOfBells + 1) : '';
    
    for (let i = 0, len = notation.length; i < len; i += 1) {
        const position: number = getPositionFromNotationCharacter(notation[i]);

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
    rowHelper.latestRow = nextChange.join(' ') + coverBell;
    rowHelper.results.grid.push(rowHelper.latestRow);

    return rowHelper;
}
