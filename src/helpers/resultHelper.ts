import { emptyResultHelper } from '../defaults/results';
import { plainCall } from './callHelper';
import { Composition } from '../types/compositions';
import { Method } from '../types/methods';
import { Call } from '../types/calls';
import {
  LeadResult, Result, ResultHelper, Truth,
} from '../types/results';
import MusicalChanges from '../types/results/musicalChanges';
import { getCompositionDetail } from './compositionHelper';
import {
  getInitialChange,
  getStageCharacter,
  getStageNumber,
  getStageQueens,
  getStageRollupsBackward,
  getStageRollupsForward,
  getStageTittums,
  getTenorIndexFromCallPosition,
} from './stageHelper';

const getExpandedComposition = (composition: string) => {
  const compositionSections: string[] = composition.replace(/[\n\r\s]+/g, '').split(';');
  const compositionSectionDictionary: { [id: string]: string; } = {};
  let expandedComposition: string = '';

  for (let section = 0; section < compositionSections.length; section += 1) {
    let sectionNotation: string = '';
    let sectionName: string = '';

    // if it is not the last element it is a definition, else it is the actual composition.
    if (section !== compositionSections.length - 1) {
      const sectionDefinition = compositionSections[section].split('=');

      if (sectionDefinition.length !== 2) {
        throw new Error(`Composition abbreviation "${sectionDefinition}" is invalid.`);
      }

      [sectionName, sectionNotation] = sectionDefinition;

      if (sectionName in compositionSectionDictionary) {
        throw new Error(`Composition abbreviation "${sectionName}" is definted more than once.`);
      }
    } else {
      sectionNotation = compositionSections[section];
    }

    // loop through all previously defined sections
    // replace with the abbreviation with the actual notation
    Object.keys(compositionSectionDictionary).forEach((key) => {
      const compositionSection = compositionSectionDictionary[key];
      const globalReplaceRegex = new RegExp(key, 'gi');

      sectionNotation = sectionNotation.replace(globalReplaceRegex, compositionSection);
    });

    // if it is a definition store it, else return the composition
    if (section !== compositionSections.length - 1) {
      compositionSectionDictionary[sectionName] = sectionNotation;
    } else {
      expandedComposition = sectionNotation;
    }
  }

  return expandedComposition;
};

const getPlaceNotation = (
  currentResultHelper: ResultHelper, method: Method, call: Call,
): [string[], number] => {
  // if it has a comma then shortened notation is being used
  // in that case need to filp, remove half lead and add in the lead end notations
  const shortNotation: string[] = method.placeNotation.split(',');
  let placeNotationArray: string[] = shortNotation[0].split(/(-)|\./g).filter((x) => x);

  if (shortNotation.length > 1) {
    // if the comma is near the end it denotes a repeating section first
    if (placeNotationArray.length > 1) {
      const reverseNotation: string[] = [...placeNotationArray].reverse().slice(1);
      reverseNotation.push(shortNotation[1]);
      placeNotationArray = placeNotationArray.concat(reverseNotation);
    } else { // if a comma is early it denotes a repeating section at the end
      const repeatingNotation = shortNotation[1].split(/(-)|\./g).filter((x) => x);
      const reverseNotation: string[] = [...repeatingNotation].reverse().slice(1);
      placeNotationArray = placeNotationArray.concat(repeatingNotation).concat(reverseNotation);
    }
  }

  // if we are using half leads take the relevant half of the array
  const arrayHalfIndex = Math.floor(placeNotationArray.length / 2);

  if (currentResultHelper.halfLeadsOn && currentResultHelper.halfLeadNext) {
    // half lead next, so take second half
    placeNotationArray = placeNotationArray.slice(arrayHalfIndex, placeNotationArray.length);
  } else if (currentResultHelper.halfLeadsOn && !currentResultHelper.halfLeadNext) {
    // half lead not next, take first half
    placeNotationArray = placeNotationArray.slice(0, arrayHalfIndex);
  }

  // if we have a non-plain call, edit the notation to adapt for it.
  // if half lead is not next this means we are in the firts half so half lead calls apply
  const callNotation = (currentResultHelper.halfLeadsOn && !currentResultHelper.halfLeadNext)
    ? call.halfLeadPlaceNotation
    : call.leadEndPlaceNotation;

  let callNotationArray: string[] = [];
  if (callNotation) {
    callNotationArray = callNotation.split(/(-)|\./g).filter((x) => x);

    // adjust for the call
    for (let i = 0; i < callNotationArray.length; i += 1) {
      placeNotationArray.pop();
    }
    for (let i = 0; i < callNotationArray.length; i += 1) {
      placeNotationArray.push(callNotationArray[i]);
    }
  }

  return [placeNotationArray, callNotationArray.length];
};

const generateRow = (
  currentResultHelper: ResultHelper, placeNotationElement: string, methodStage: number,
) => {
  const currentChange: string = currentResultHelper.currentChange
    ? currentResultHelper.currentChange
    : currentResultHelper.result.initialChange;
  const rowArray: string[] = Array.from(currentChange);
  const placeNotationArray: string[] = Array.from(placeNotationElement);
  const nextChange: string[] = [];

  // for each non cross item in the notation we make a place
  placeNotationArray.forEach((element) => {
    if (element !== '-') {
      const position: number = getStageNumber(element);

      if (!position || position > methodStage) {
        throw new Error(`Place Notation "${placeNotationArray}" contains an invalid expression.`);
      }

      nextChange[position - 1] = rowArray[position - 1];
    }
  });

  // go backwards through the previous row and put all cover bells in place,
  // then cross all remaining bells
  for (let i = rowArray.length - 1; i >= 0; i -= 1) {
    // If it already has a value ignore it
    // if it has a neigbour with no value switch it, else keep it as it was
    if (!nextChange[i]) {
      if (i >= methodStage) {
        nextChange[i] = rowArray[i]; // cover bells
      } else if (i > 0 && !nextChange[i - 1]) {
        nextChange[i] = rowArray[i - 1]; // need swapping
        nextChange[i - 1] = rowArray[i];
      } else {
        nextChange[i] = rowArray[i]; // forced places
      }
    }
  }

  return nextChange.join('');
};

const generateLead = (
  currentResultHelper: ResultHelper,
  call: Call,
  callAbbreviation: string,
  method: Method,
  possibleLastLead: boolean,
) => {
  const newResultHelper: ResultHelper = currentResultHelper;

  // get the place notation for the next lead (or half lead)
  const [placeNotation, callLength] = getPlaceNotation(newResultHelper, method, call);

  const leadResults: LeadResult = {
    call: callAbbreviation,
    callLength,
    method: method.abbreviation,
    leadEnd: '',
    rows: [],
  };

  for (let i = 0; i < placeNotation.length; i += 1) {
    const row: string = generateRow(newResultHelper, placeNotation[i], method.stage);
    newResultHelper.currentChange = row;
    newResultHelper.result.grid.push(row);
    leadResults.rows.push(row);

    // if it comes round in the last lead before the end stop calculating - it's a snap finish
    if (possibleLastLead && i !== placeNotation.length - 1
      && row === newResultHelper.result.initialChange
    ) {
      // need to check if the last lead was a change of method and the stage before returning
      if (newResultHelper.currentMethod && newResultHelper.currentMethod !== method.abbreviation) {
        newResultHelper.result.changesOfMethod += 1;
      }
      if (newResultHelper.highestMethodStage < method.stage) {
        newResultHelper.highestMethodStage = method.stage;
      }

      leadResults.leadEnd = `(${newResultHelper.currentChange})`;
      newResultHelper.result.leads.push(leadResults);

      return newResultHelper;
    }
  }

  // calculate the change of methods and part end change where relevant
  leadResults.leadEnd = newResultHelper.currentChange;
  newResultHelper.result.leads.push(leadResults);

  if (newResultHelper.currentMethod && newResultHelper.currentMethod !== method.abbreviation) {
    newResultHelper.result.changesOfMethod += 1;
  }
  if (newResultHelper.highestMethodStage < method.stage) {
    newResultHelper.highestMethodStage = method.stage;
  }
  newResultHelper.currentMethod = method.abbreviation;
  newResultHelper.courseLeadCounter += 1;

  // course ends can only occur at a true lead end
  if (!newResultHelper.halfLeadsOn || newResultHelper.halfLeadNext) {
    const lastBell: string = newResultHelper.currentChange[method.stage - 1];

    // Add the course end if the change ends with the tenor
    // Set the lead counter back to 1 as it is a new course
    if (lastBell === getStageCharacter(method.stage)) {
      newResultHelper.result.courseEnds.push(newResultHelper.currentChange);
      newResultHelper.courseLeadCounter = 1;
    }
  }

  // half lead will switch if using it
  if (newResultHelper.halfLeadsOn) {
    newResultHelper.halfLeadNext = !newResultHelper.halfLeadNext;
  }

  return newResultHelper;
};

const calculateFullElement = (
  currentResultHelper: ResultHelper,
  compositionElement: string,
  methods: Method[],
  calls: Call[],
  lastElement: boolean,
) => {
  // in the composition type, each element is a lead or half lead
  const callAbbreviation: string = compositionElement.substr(compositionElement.length - 1);
  const methodAbbreviation: string = compositionElement.substr(0, compositionElement.length - 1);

  const method: Method | undefined = methods.find(
    (m) => m.abbreviation === methodAbbreviation,
  );

  if (!method) {
    throw new Error(`Composition element "${compositionElement}" does not start with a valid method.`);
  }

  let call: Call | undefined;

  if (callAbbreviation === 'b' && method.defaultBob) {
    call = calls.find((c) => c.abbreviation === method.defaultBob);
  } else if (callAbbreviation === 's' && method.defaultSingle) {
    call = calls.find((c) => c.abbreviation === method.defaultSingle);
  } else {
    call = calls.find((c) => c.abbreviation === callAbbreviation);
  }

  if (!call && callAbbreviation === 'p') {
    call = plainCall;
  }

  if (!call) {
    throw new Error(`Composition element "${compositionElement}" does not end with a valid call.`);
  }

  return generateLead(currentResultHelper, call, callAbbreviation, method, lastElement);
};

const calculateNumericalElement = (
  currentResultHelper: ResultHelper,
  compositionElement: string,
  methods: Method[],
  calls: Call[],
  lastElement: boolean,
  lastElementOfPart: boolean,
) => {
  let newResultHelper: ResultHelper = currentResultHelper;

  const method: Method | undefined = methods.find(
    (m) => m.abbreviation === newResultHelper.baseMethod,
  );
  let call: Call | undefined;
  let position: number | undefined;

  if (!method) {
    throw new Error(`Method "${newResultHelper.baseMethod}" is not a valid method.`);
  }

  let callAbbreviation: string = 'b';
  if (!Number(compositionElement)) {
    callAbbreviation = compositionElement.substr(0, 1);

    // set the call to the method default if b/s, else the call type
    if (callAbbreviation === 'b' && method.defaultBob) {
      call = calls.find((c) => c.abbreviation === method.defaultBob);
    } else if (callAbbreviation === 's' && method.defaultSingle) {
      call = calls.find((c) => c.abbreviation === method.defaultSingle);
    } else {
      call = calls.find((c) => c.abbreviation === callAbbreviation);
    }

    position = Number(compositionElement.substr(1, compositionElement.length));
  } else {
    call = calls.find((c) => c.abbreviation === method.defaultBob);
    position = Number(compositionElement);
  }

  if (!call) {
    throw new Error(`Composition element "${compositionElement}" does not start with a valid call.`);
  }

  if (!position) {
    throw new Error(`Composition element "${compositionElement}" does not end with a valid numerical position.`);
  }

  // set the method stage as there is no changing method
  newResultHelper.highestMethodStage = method.stage;

  // if we need to finish a course before carrying on cycle through leads until a course end,
  // or we get back to the same lead end
  // catch for funky methods where you can get stuck in a loop but the tenor is never at home
  let loopStartChange: string = newResultHelper.currentChange;
  let currentCourseCount: number = newResultHelper.result.courseEnds.length;

  if (position < newResultHelper.courseLeadCounter) {
    do {
      newResultHelper = generateLead(newResultHelper, plainCall, 'p', method, false);
    }
    while (newResultHelper.result.courseEnds.length === currentCourseCount
      && loopStartChange !== newResultHelper.currentChange);

    if (loopStartChange === newResultHelper.currentChange) {
      throw new Error(`Composition has a course which never completes, cannot apply call ${compositionElement}.`);
    }
  }

  // cycle through leads untill we reach the one with the call
  // do while to avoid infinite loop with call at the last lead of course
  do {
    if (newResultHelper.courseLeadCounter === position) {
      newResultHelper = generateLead(newResultHelper, call, callAbbreviation, method, lastElement);
    } else {
      newResultHelper = generateLead(newResultHelper, plainCall, 'p', method, false);
    }
  }
  while (newResultHelper.courseLeadCounter > 1
    && newResultHelper.courseLeadCounter <= position);

  // if it is the last call of the part continue untill the next course end, or repeated leadend.
  // Numerical parts must end at course ends for the notation to make sense
  loopStartChange = newResultHelper.currentChange;
  currentCourseCount = newResultHelper.result.courseEnds.length;
  const lastCourseEnd: string = newResultHelper.result.courseEnds[currentCourseCount - 1];

  if (lastElementOfPart && !lastElement && newResultHelper.currentChange !== lastCourseEnd) {
    do {
      newResultHelper = generateLead(newResultHelper, plainCall, 'p', method, false);
    }
    while (newResultHelper.result.courseEnds.length === currentCourseCount
      && loopStartChange !== newResultHelper.currentChange);

    if (loopStartChange === newResultHelper.currentChange) {
      throw new Error('Composition has a part which never completes.');
    }
    // if it is the last call of the last part continue until rounds, or repeated leadend.
  } else if (
    lastElement && newResultHelper.currentChange !== newResultHelper.result.initialChange
  ) {
    do {
      newResultHelper = generateLead(newResultHelper, plainCall, 'p', method, true);
    }
    while (newResultHelper.currentChange !== newResultHelper.result.initialChange
      && loopStartChange !== newResultHelper.currentChange);
    // no need to throw errors here,
    // can just display the composition with a plain course to finish and no rounds.
  }

  return newResultHelper;
};

const calculatePositionalElement = (
  currentResultHelper: ResultHelper,
  compositionElement: string,
  methods: Method[],
  calls: Call[],
  lastElement: boolean,
  lastElementOfPart: boolean,
) => {
  let newResultHelper: ResultHelper = currentResultHelper;
  const method: Method | undefined = methods.find(
    (m) => m.abbreviation === newResultHelper.baseMethod,
  );

  if (!method) {
    throw new Error(`Method "${newResultHelper.baseMethod}" is not a valid method.`);
  }

  // get where we expect the tenor to end up at the next call
  const callingPosition: string = compositionElement.substr(compositionElement.length - 1);
  const expectedTenorIndex: number = getTenorIndexFromCallPosition(callingPosition, method.stage);

  let call: Call | undefined;
  let numberOfCalls: number = 1;

  let callAbbreviation: string = 'b';
  if (compositionElement.length >= 2) {
    callAbbreviation = compositionElement.substr(compositionElement.length - 2, 1);
    if (!Number(callAbbreviation)) {
      if (callAbbreviation === 'b' && method.defaultBob) {
        call = calls.find((c) => c.abbreviation === method.defaultBob);
      } else if (callAbbreviation === 's' && method.defaultSingle) {
        call = calls.find((c) => c.abbreviation === method.defaultSingle);
      } else {
        call = calls.find((c) => c.abbreviation === callAbbreviation);
      }

      if (!call) {
        throw new Error(`Composition element "${compositionElement}" contains an invalid call abbreviation.`);
      }

      numberOfCalls = Number(compositionElement.substr(0, compositionElement.length - 2)) || 1;
    } else {
      numberOfCalls = Number(compositionElement.substr(0, compositionElement.length - 1)) || 1;
    }
  }

  if (!call) {
    call = calls.find((c) => c.abbreviation === method.defaultBob);
  }

  if (!call) {
    throw new Error(`Composition element "${compositionElement}" can't find default call`);
  }

  // set the method stage as there is no changing method, and ensure half leads are off
  newResultHelper.highestMethodStage = method.stage;
  newResultHelper.halfLeadsOn = false;

  // run the generation for the number of times the position is called.
  for (let i = 0; i < numberOfCalls; i += 1) {
    const loopStartChange: string = newResultHelper.currentChange;
    let callFound: boolean = false;

    do {
      // clone the array and try generating a lead with the call
      let withCall: ResultHelper = JSON.parse(JSON.stringify(newResultHelper));
      withCall = generateLead(withCall, call, callAbbreviation, method, false);

      // if the generated lead gives the right tenor position then great
      // else add a plain lead and loop
      if (withCall.currentChange.indexOf(getStageCharacter(method.stage)) === expectedTenorIndex) {
        newResultHelper = withCall;
        callFound = true;
      } else {
        newResultHelper = generateLead(newResultHelper, plainCall, 'p', method, false);
      }
    }
    while (!callFound && loopStartChange !== newResultHelper.currentChange);

    if (loopStartChange === newResultHelper.currentChange) {
      throw new Error(`Composition has a call which can't be made, cannot apply call ${compositionElement}.`);
    }
  }

  // if it is the last call in a part keep going until the tenor is in home
  // if it is the last call, keep going to rounds
  const loopStartChange = newResultHelper.currentChange;
  const currentCourseCount = newResultHelper.result.courseEnds.length;
  const lastCourseEnd: string = newResultHelper.result.courseEnds[currentCourseCount - 1];

  if (lastElementOfPart && !lastElement && newResultHelper.currentChange !== lastCourseEnd) {
    do {
      newResultHelper = generateLead(newResultHelper, plainCall, 'p', method, false);
    }
    while (newResultHelper.result.courseEnds.length === currentCourseCount
      && loopStartChange !== newResultHelper.currentChange);

    if (loopStartChange === newResultHelper.currentChange) {
      throw new Error('Composition has a part which never completes.');
    }
    // if it is the last call of the last part continue until rounds, or repeated leadend.
  } else if (
    lastElement && newResultHelper.currentChange !== newResultHelper.result.initialChange
  ) {
    do {
      newResultHelper = generateLead(newResultHelper, plainCall, 'p', method, true);
    }
    while (newResultHelper.currentChange !== newResultHelper.result.initialChange
      && loopStartChange !== newResultHelper.currentChange);
    // no need to throw errors here,
    // can just display the composition with a plain course to finish and no rounds.
  }

  return newResultHelper;
};

const generatePart = (
  currentResultHelper: ResultHelper,
  composition: Composition,
  methods: Method[],
  calls: Call[],
  lastPart: boolean,
) => {
  let resultHelper = currentResultHelper;
  const compositionArray: string[] = resultHelper.expandedComposition.split('.').filter((x) => x);

  for (let element = 0; element < compositionArray.length; element += 1) {
    const lastElement: boolean = (lastPart && element === compositionArray.length - 1);
    const lastElementOfPart: boolean = (!lastPart && element === compositionArray.length - 1);
    const compositionElement: string = compositionArray[element];

    switch (composition.type) {
      case 'Full':
        resultHelper = calculateFullElement(
          resultHelper, compositionElement, methods, calls, lastElement,
        );
        break;
      case 'Numerical':
        resultHelper = calculateNumericalElement(
          resultHelper, compositionElement, methods, calls, lastElement, lastElementOfPart,
        );
        break;
      case 'Positional':
        resultHelper = calculatePositionalElement(
          resultHelper, compositionElement, methods, calls, lastElement, lastElementOfPart,
        );
        break;
      default:
        throw new Error(`Invalid composition type: ${composition.type}`);
    }
  }

  // add the part ends
  resultHelper.result.partEnds.push(resultHelper.currentChange);

  return resultHelper;
};

const getFactorial = (number: number) => {
  let rval = 1;
  for (let i = 2; i <= number; i += 1) rval *= i;
  return rval;
};

const getTruth = (stage: number, rows: string[], initialChange: string) => {
  let rowsToCheck: string[] = rows;
  const truth: Truth = {
    true: true,
    comesRound: false,
    firstFalseRow: '',
  };

  if (rows[rows.length - 1] === initialChange) {
    truth.comesRound = true;
  }

  const numberOfRows: number = rows.length;
  const extent: number = getFactorial(stage);
  // plus one to account for exact multiples of an extent
  // these will have 0 allowed of the next repeat number
  const maxNumberOfEachChanges: number = Math.ceil((numberOfRows + 1) / extent);
  let numberOfMaxRepeatsLeft: number = numberOfRows % extent;

  /*
    each change may only occur maxNumberOfEachChanges times or maxNumberOfEachChanges - 1
    to get the most even spread possible.
    There are only numberOfMaxRepeatsLeft instances of each change
    repeating maxNumberOfEachChanges times.
    Therefore take a change, check if it repeats the right number of times,
    if so remove all instances from array. if it repeats max times, take 1 from number of repeats
    if it repeats outside the allowed range or number of max repeats drops below 0 it is false.
  */
  while (truth.true && rowsToCheck.length > 0) {
    const rowToCheck: string = rowsToCheck[0];
    const countOfRows: number = rowsToCheck.filter((row) => row === rowToCheck).length;

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
    rowsToCheck = rowsToCheck.filter((row) => row !== rowToCheck);
  }

  return truth;
};

const getExactChangeCount = (rows: string[], change1: string) => {
  const filteredRows: string[] = rows.filter((row) => row === change1);
  const count: number = filteredRows ? filteredRows.length : 0;

  return count;
};

const getFrontChangeCount = (rows: string[], change1: string, change2: string) => {
  const filteredRows: string[] = rows.filter(
    (r) => r.startsWith(change1) || r.startsWith(change2),
  );
  const count: number = filteredRows ? filteredRows.length : 0;

  return count;
};

const getBackChangeCount = (rows: string[], change1: string, change2: string) => {
  const filteredRows: string[] = rows.filter(
    (r) => r.endsWith(change1) || r.endsWith(change2),
  );
  const count: number = filteredRows ? filteredRows.length : 0;

  return count;
};

const getMusicalChanges = (stage: number, rows: string[]) => {
  const queens: string = getStageQueens(stage);
  const tittums: string = getStageTittums(stage);
  const rollupsForward: string = getStageRollupsForward(stage);
  const rollupsBackward: string = getStageRollupsBackward(stage);
  const frontBellRunForward: string = '2345';
  const frontBellRunBackward: string = '5432';
  const musicalChanges: MusicalChanges = {
    queens: getExactChangeCount(rows, queens),
    tittums: getExactChangeCount(rows, tittums),
    littleBellsBack: getBackChangeCount(rows, frontBellRunForward, frontBellRunBackward),
    littleBellsFront: getFrontChangeCount(rows, frontBellRunForward, frontBellRunBackward),
    rollupsBack: getBackChangeCount(rows, rollupsForward, rollupsBackward),
    rollupsFront: getFrontChangeCount(rows, rollupsForward, rollupsBackward),
  };

  return musicalChanges;
};

const calculateResult = (
  composition: Composition, methods: Method[], calls: Call[], onComplete: (result: Result) => void,
) => {
  let resultHelper: ResultHelper = JSON.parse(JSON.stringify(emptyResultHelper));
  const compositionDetail = getCompositionDetail(composition);

  if (!compositionDetail) {
    throw new Error('No composition found');
  }

  // set the initial values
  resultHelper.result.initialChange = getInitialChange(composition.numberOfBells);
  resultHelper.expandedComposition = getExpandedComposition(compositionDetail);
  resultHelper.halfLeadsOn = composition.halfLead;
  resultHelper.baseMethod = composition.startingMethod ? composition.startingMethod : '';
  resultHelper.currentChange = resultHelper.result.initialChange;

  for (let part = 1; part <= composition.parts; part += 1) {
    const lastPart: boolean = part === composition.parts;

    resultHelper = generatePart(resultHelper, composition, methods, calls, lastPart);
  }

  // calculate the key stats - length, musicality and truth.
  resultHelper.result.numberOfChanges = resultHelper.result.grid.length;
  resultHelper.result.truth = getTruth(
    resultHelper.highestMethodStage, resultHelper.result.grid, resultHelper.result.initialChange,
  );
  resultHelper.result.musicalChanges = getMusicalChanges(
    resultHelper.highestMethodStage, resultHelper.result.grid,
  );

  onComplete(resultHelper.result);
};

export default calculateResult;
