import { getMethodAbbreviationRegex } from './methodHelper';
import { getCallAbbreviationRegex } from './callHelper';
import { getStageCallingPositionRegex } from './stageHelper';
import { Call } from '../types/calls';
import { Method } from '../types/methods';
import { Composition } from '../types/compositions';
import assertUnreachable from './contextHelper';
import PartialBy from '../types/PartialBy';

type PartialComposition = PartialBy<Composition, 'type' | 'parts' | 'halfLead'>;

export const newComposition = (composition: PartialComposition) : Composition => ({
  type: 'Full',
  parts: 1,
  halfLead: false,
  ...composition,
});

export const getCompositionDetailProperty = ({ type }: Composition) => {
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

export const isValidComposition = (calls: Call[], methods: Method[], composition: Composition) => {
  let valid = true;
  const compositionDetail = getCompositionDetail(composition);

  if (compositionDetail) {
    // compositions can have definitions at the start in the form: part=x.x;
    // compositions are all in the form x.x, or part.part, or a combination i.e. part.x

    // First get the regex for valid "x" values for a composition type
    // Then split on ";" to get the part definitions and check they are valid
    // Second check the final element is valid where x can be the "x" definition or a part
    // const stageRegex = getStageNotationRegex(stage);

    const methodRegex = getMethodAbbreviationRegex(methods);
    const callRegex = getCallAbbreviationRegex(calls);

    let baseRegex = '';
    switch (composition.type) {
      case 'Full':
        baseRegex = `(${methodRegex}){1}(${callRegex}){1}`;
        break;
      case 'Numerical':
        if (!composition.startingMethod) { return false; }

        baseRegex = `(${callRegex})?([0-9]+)`;
        break;
      case 'Positional': {
        if (!composition.startingMethod) { return false; }

        const method = methods.find((m) => m.abbreviation === composition.startingMethod);
        if (!method) { return false; }

        const callingPositionRegex = getStageCallingPositionRegex(method.stage);

        baseRegex = `([0-9]?)(${callRegex})?(${callingPositionRegex}){1}`;
        break;
      }
      default:
        throw new Error(`Invalid composition type: ${composition.type}`);
    }

    let partRegex: string = '';

    const compositionParts = compositionDetail.replace(/[\n\r\s]+/g, '').split(';');
    const setInvalid = () => { valid = false; };

    for (let i = 0; i < compositionParts.length; i += 1) {
      let notation;
      let partName;

      if (i !== compositionParts.length - 1) {
        const partDefinition = compositionParts[i].split('=');

        if (partDefinition.length !== 2) {
          return false;
        }

        [partName, notation] = partDefinition;
      } else {
        notation = compositionParts[i];
      }

      if (`|${partRegex}|`.includes(`|${partName}|`)) {
        return false;
      }

      let validNotationRegex: RegExp;
      if (partRegex) {
        validNotationRegex = RegExp(`^((${baseRegex})|(${partRegex}))$`);
      } else {
        validNotationRegex = RegExp(`^(${baseRegex})?$`);
      }

      notation.split('.').forEach((element) => {
        if (!validNotationRegex.test(element)) {
          setInvalid();
        }
      });

      if (partName) {
        partRegex = partRegex ? `${partRegex}|${partName}` : partName;
      }
    }
  }

  return valid;
};
