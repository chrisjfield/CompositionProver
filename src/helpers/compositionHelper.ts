import { Call } from '../types/calls';
import { Composition } from '../types/compositions';
import CompositionType from '../types/compositions/compositionType';
import { Method } from '../types/methods';
import { PartialBy, PartialExcept } from '../types/PartialExtensions';
import { getCallAbbreviationRegex } from './callHelper';
import assertUnreachable from './contextHelper';
import { getMethodAbbreviationRegex } from './methodHelper';
import { getStageCallingPositionRegex } from './stageHelper';

type PartialComposition = PartialBy<Composition, 'type' | 'parts' | 'halfLead'>;

export const newComposition = (composition: PartialComposition) : Composition => ({
  type: 'Full',
  parts: 1,
  halfLead: false,
  ...composition,
});

export const getCompositionDetailProperty = ({ type }: PartialExcept<Composition, 'type'>) => {
  switch (type) {
    case 'Full':
      return 'fullComposition';
    case 'Numerical':
      return 'numericalComposition';
    case 'Positional':
      return 'positionalComposition';
    default:
      return assertUnreachable(type);
  }
};

export const getCompositionDetail = (composition: Composition) => {
  switch (composition.type) {
    case 'Full':
      return composition.fullComposition;
    case 'Numerical':
      return composition.numericalComposition;
    case 'Positional':
      return composition.positionalComposition;
    default:
      return assertUnreachable(composition.type);
  }
};

export const getExpandedComposition = (composition: string) => {
  const compositionSections: string[] = composition.replace(/[\n\r\s]+/g, '').split(';');
  const partDictionary: { [id: string]: string; } = {};

  // Add all part definitions to the dictionary
  compositionSections.slice(0, -1).forEach((s) => {
    if ((s.match(/=/g) || []).length !== 1) { throw new Error(`Composition part "${s}" is invalid.`); }
    const [sectionName, sectionNotation] = s.split('=');

    if (sectionName in partDictionary) { throw new Error(`Composition part "${sectionName}" is defined more than once.`); }
    partDictionary[sectionName] = sectionNotation;
  });

  // Iterate backwards over the parts incase of nesting when expanding the composition
  let expandedComposition = compositionSections[compositionSections.length - 1];
  Object.keys(partDictionary).reverse().forEach((key) => {
    const compositionSection = partDictionary[key];
    expandedComposition = expandedComposition.replace(new RegExp(key, 'gi'), compositionSection);
  });

  return expandedComposition;
};

export const getCompositionRegex = (
  type: CompositionType, methodRegex: string, callRegex: string, callPositionRegex: string,
) => {
  let regex: string;
  switch (type) {
    case 'Full':
      regex = `(${methodRegex}){1}(${callRegex}){1}`;
      break;
    case 'Numerical':
      regex = `(${callRegex})?([0-9]+)(\\([0-9]+\\))?`;
      break;
    case 'Positional':
      regex = `([0-9]?)(${callRegex})?(${callPositionRegex}){1}`;
      break;
    default:
      return assertUnreachable(type);
  }

  return new RegExp(`^${regex}([\\.\\-]{1}${regex})*$`);
};

export const isValidComposition = (calls: Call[], methods: Method[], composition: Composition) => {
  const compositionDetail = getCompositionDetail(composition);
  if (!compositionDetail) { return true; }

  const method = methods.find((m) => m.abbreviation === composition.startingMethod);
  if (!method && ['Numerical', 'Positional'].includes(composition.type)) { return false; }

  const expandedComposition = getExpandedComposition(compositionDetail);
  const methodRegex = getMethodAbbreviationRegex(methods);
  const callRegex = getCallAbbreviationRegex(calls);
  const callPositionRegex = method?.stage ? getStageCallingPositionRegex(method.stage) : '';

  const compRegex = getCompositionRegex(
    composition.type, methodRegex, callRegex, callPositionRegex,
  );

  return compRegex.test(expandedComposition);
};

export const splitPositionalElement = (compElement: string): [string, string, number] => {
  const elementLen = compElement.length;
  const callPosition = compElement.substr(elementLen - 1);
  let callAbbr = 'b';
  let numberOfCalls = 1;

  if (elementLen === 2) {
    const firstChar = compElement.substr(elementLen - 2, 1);
    if (Number(firstChar)) {
      numberOfCalls = Number(firstChar);
    } else {
      callAbbr = firstChar;
    }
  }

  if (elementLen > 2) {
    const callChar = compElement.substr(elementLen - 2, 1);
    if (Number(callChar)) {
      numberOfCalls = Number(compElement.substr(0, elementLen - 1));
    } else {
      callAbbr = callChar;
      numberOfCalls = Number(compElement.substr(0, elementLen - 2));
    }
  }

  return [callPosition, callAbbr, numberOfCalls];
};

export const splitNumericElement = (numericElement: string): [number, string, number] => {
  const [element, courseEndString] = numericElement.replace(')', '').split('(');

  const courseEnd = Number(courseEndString);
  const callAbbr = Number(element) ? 'b' : element.substr(0, 1);
  const position = Number(element) || Number(element.substr(1, element.length));

  if (!position) { throw new Error(`"${element}" does not end with a valid numerical position.`); }
  if (courseEndString && !courseEnd) { throw new Error(`"${courseEndString}" is not a valid course number.`); }

  return [position, callAbbr, courseEnd];
};
