import { Call } from '../types/calls';
import { getStageNotationRegex } from './stateHelper';

export const plainCall: Call = {
  abbreviation: 'p',
  editable: false,
  halfLeadPlaceNotation: '',
  leadEndPlaceNotation: '',
  name: 'Plain lead',
  stage: 0,
};

export const isValidCallNotation = (stage: number, notation?: string) => {
  let valid = true;

  if (notation) {
    const stageRegex = getStageNotationRegex(stage);
    const validCallRegex = RegExp(`^[\\-]?${stageRegex}{1}([\\.\\-]{1}${stageRegex})*$`);
    valid = validCallRegex.test(notation);
  }

  return valid;
};

export const getCallAbbreviationRegex = (calls: Call[]) => {
  let regex = '';

  if (calls.length > 0) {
    calls.forEach((call) => { regex += `${call.abbreviation}|`; });
    regex += 'p';
  }

  return regex;
};
