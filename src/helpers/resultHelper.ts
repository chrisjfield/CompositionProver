import { Call } from '../types/calls';
import { Method } from '../types/methods';
import { Truth, MusicalChanges } from '../types/results';
import {
  getInitialChange, getStageQueens, getStageRollupsBackward,
  getStageRollupsForward, getStageTittums,
} from './stageHelper';

const getFactorial = (number: number) => {
  let rval = 1;
  for (let i = 2; i <= number; i += 1) rval *= i;
  return rval;
};

export const getChangeCount = (rows: string[], change1: string) => rows
  .filter((row) => row === change1).length;

export const getChangeStartsWithCount = (rows: string[], startsWith: string[]) => rows
  .filter((r) => startsWith.some((c) => r.startsWith(c))).length;

export const getChangeEndsWithCount = (rows: string[], endsWith: string[]) => rows
  .filter((r) => endsWith.some((c) => r.endsWith(c))).length;

export const getMusicalChanges = (stage: number, rows: string[]): MusicalChanges => {
  const queens: string = getStageQueens(stage);
  const tittums: string = getStageTittums(stage);
  const backBellRuns = [getStageRollupsForward(stage), getStageRollupsBackward(stage)];
  const frontBellRuns = ['2345', '5432'];

  return {
    queens: getChangeCount(rows, queens),
    tittums: getChangeCount(rows, tittums),
    littleBellsBack: getChangeEndsWithCount(rows, frontBellRuns),
    littleBellsFront: getChangeStartsWithCount(rows, frontBellRuns),
    rollupsBack: getChangeEndsWithCount(rows, backBellRuns),
    rollupsFront: getChangeStartsWithCount(rows, backBellRuns),
  };
};

export const getTruth = (stage: number, rows: string[]): Truth => {
  const numberOfRows = rows.length;
  const rounds = getInitialChange(stage);
  const extent = getFactorial(stage);

  // plus one to account for exact multiples of an extent
  // these will have 0 rows repeating maxNumberOfEachChanges times
  const maxNumberOfEachChanges = Math.ceil((numberOfRows + 1) / extent);
  let numberOfMaxRepeatsLeft = numberOfRows % extent;

  /*
    each change may only occur maxNumberOfEachChanges times or maxNumberOfEachChanges - 1.
    There are only numberOfMaxRepeatsLeft of each change repeating maxNumberOfEachChanges times.
  */
  let firstFalseRow = '';
  const compTrue = [...new Set(rows)].every((ur) => {
    const countOfRows = rows.filter((r) => r === ur).length;
    if (countOfRows === maxNumberOfEachChanges) {
      numberOfMaxRepeatsLeft -= 1;
    } else if (countOfRows !== maxNumberOfEachChanges - 1) {
      firstFalseRow = ur;
      return false;
    }

    if (numberOfMaxRepeatsLeft < 0) { firstFalseRow = ur; return false; }
    return true;
  });

  return {
    true: compTrue,
    // starts with accounts for possible cover bells
    comesRound: rows[numberOfRows - 1].startsWith(rounds),
    firstFalseRow,
  };
};

const expandNotation = (notation: string) => {
  // follows https://rsw.me.uk/blueline/methods/notation
  const splitNotation = notation.split(',');
  const firstSplit = splitNotation[0].split(/(-)|\./g).filter((x) => x);
  const secondSplit = splitNotation[1]?.split(/(-)|\./g).filter((x) => x);
  // if there are no commas then return the array
  if (splitNotation.length === 1) { return firstSplit; }

  let notationArray: string[] = [];
  if (firstSplit.length > 1) {
    // if the comma is near the end repeat the first section
    const reverseNotation = [...firstSplit].reverse().slice(1).concat(secondSplit);
    notationArray = firstSplit.concat(reverseNotation);
  } else {
    // if a comma is early it denotes a repeating section at the end
    const reverseNotation = [...secondSplit].reverse().slice(1);
    notationArray = firstSplit.concat(secondSplit).concat(reverseNotation);
  }

  return notationArray;
};

const getHalfLeadNotation = (halfLeadNext: boolean, notationArray: string[]) => {
  const arrayHalfIndex = Math.floor(notationArray.length / 2);
  return halfLeadNext
    ? notationArray.slice(0, arrayHalfIndex)
    : notationArray.slice(arrayHalfIndex, notationArray.length);
};

export const getPlaceNotation = (
  halfLeadsOn: boolean, halfLeadNext: boolean, method: Method, call: Call,
): [string[], number] => {
  let placeNotationArray = expandNotation(method.placeNotation);
  if (halfLeadsOn) { placeNotationArray = getHalfLeadNotation(halfLeadNext, placeNotationArray); }

  const callNotation = (halfLeadsOn && halfLeadNext)
    ? call.halfLeadPlaceNotation
    : call.leadEndPlaceNotation;

  const callNotationArray = callNotation.split(/(-)|\./g).filter((x) => x);
  const callLen = callNotationArray.length;

  // adjust notation for the call, by replacing last n elements with the call notation
  placeNotationArray.splice(-callLen, callLen);
  placeNotationArray.push(...callNotationArray);

  // return the index the call should be displayed at on the grid
  const callIndex = Math.max(placeNotationArray.length - callLen - 1, 0);
  return [placeNotationArray, callIndex];
};
