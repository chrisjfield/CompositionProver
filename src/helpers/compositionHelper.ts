import { Dispatch } from 'redux';

import { updateRows, updateLeadEnds, updateTruth } from '../actions/appActions';
import { getPositionFromNotationCharacter } from '../helpers/placeNotationHelper';

export function generateRows(dispatch: Dispatch<{}>, composition: string, stage: number, placeNotation: string, initialChange: number[],
                             bob: string, extreme: string, single: string) {
    const compositionArray: string[] = composition.split('.');
    const numberOfBells: number = stage;
    const currentLeadEnds: string[] = [];
    const coverBell: string = (numberOfBells % 2) ? ' ' + String(numberOfBells + 1) : '';
    const currentRows: string[] = [initialChange.join(' ') + coverBell];
    let latestChange: number[] = [...initialChange];
    let latestChangeString: string = '';
    let nextRow: number[] = [];   
    let truth: boolean = true;

    compositionArray.forEach((leadCall: string) => {
        const leadPlaceNotation: string[] = getLeadPlaceNotation(leadCall, placeNotation, bob, extreme, single);

        leadPlaceNotation.forEach((notation) => {
            nextRow = [];
    
            for (let i = 0, len = notation.length; i < len; i += 1) {
                const position: number = getPositionFromNotationCharacter(notation[i]);

                if (position) {
                    nextRow[position - 1] = latestChange[position - 1];
                }
            }
            
            for (let j = 0; j < numberOfBells; j += 1) {
                // If it already has a value ignore it, if it has a neigbour with no value switch it, else keep it as it was
                if (!nextRow[j] && !nextRow[j + 1] && numberOfBells >= j + 2) {
                    nextRow[j] = latestChange[j + 1];
                    nextRow[j + 1] = latestChange[j];
                } else if (!nextRow[j]) {
                    nextRow[j] = latestChange[j];
                }
            }
    
            latestChange = [...nextRow];
            latestChangeString = nextRow.join(' ') + coverBell;
            if (truth) {
                truth = currentRows.indexOf(latestChangeString) <= 0;
            }
            currentRows.push(latestChangeString);
        });
        currentLeadEnds.push(latestChangeString);
    });

    dispatch(updateRows(currentRows));
    dispatch(updateLeadEnds(currentLeadEnds));
    dispatch(updateTruth(truth));
}

function getLeadPlaceNotation(leadCall: string, methodPlaceNotation: string, bob: string, extreme: string, single: string) {
    const placeNotationArray: string[] = methodPlaceNotation.split('.');

    switch (leadCall) {
    case 'b':
        placeNotationArray.pop();
        placeNotationArray.push(bob);
        break;
    case 'e':
        placeNotationArray.pop();
        placeNotationArray.push(extreme);
        break;
    case 's':
        placeNotationArray.pop();
        placeNotationArray.push(single);
        break;
    }
        
    return placeNotationArray;
}
