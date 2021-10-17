import { getMethodAbbreviationRegex } from './methodHelper';
import { getCallAbbreviationRegex } from './callHelper';
import { getStageCallingPositionRegex } from './stageHelper';
import { Call } from '../types/calls';
import { Method } from '../types/methods';
import { Composition } from '../types/compositions';
import assertUnreachable from './contextHelper';
import { PartialBy, PartialExcept } from '../types/PartialExtensions';
import CompositionType from '../types/compositions/compositionType';

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
      regex = `(${callRegex})?([0-9]+)`;
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
