import { Call } from '../types/calls';
import { PartialBy } from '../types/PartialExtensions';
import { getStageNotationRegex } from './stageHelper';

type PartialCall = PartialBy<Call, 'editable' | 'halfLeadPlaceNotation' | 'leadEndPlaceNotation'>;

export const newCall = (call: PartialCall) : Call => ({
  editable: true,
  halfLeadPlaceNotation: '',
  leadEndPlaceNotation: '',
  ...call,
});

export const plainCall: Call = newCall({
  abbreviation: 'p',
  editable: false,
  name: 'Plain lead',
  stage: 0,
});

export const isValidCallNotation = (stage: number, notation?: string) => {
  if (!notation) { return true; }
  const stageRegex = getStageNotationRegex(stage);
  const validCallRegex = new RegExp(`^\\-$|^[\\-]?${stageRegex}{1}([\\.\\-]{1}${stageRegex})*$`);
  return validCallRegex.test(notation);
};

export const getCallAbbreviationRegex = (calls: Call[]) => calls
  .map((c) => c.abbreviation)
  .reduce((prev, next) => `${prev}|${next}`, 'p');
