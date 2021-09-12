import { useRef, useEffect } from 'react';
import { getStageCharacter } from './stageHelper';

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => { ref.current = value; });

  return ref.current;
};

export const getStageNotationRegex = (stage: number) => {
  // generates a regex expression that matches a single valid
  // place notation for the given stage
  let regexString = '';

  // get a lookahead to guarantee at least 1 character present
  if (stage < 10) {
    regexString += `(?=[1-${getStageCharacter(stage)}])`;
  } else if (stage === 10) {
    regexString += '(?=[0-9])';
  } else if (stage === 11) {
    regexString += '(?=[0-9E])';
  } else if (stage === 12) {
    regexString += '(?=[0-9ET])';
  }

  regexString += '(';
  for (let i = 1; i <= stage; i += 1) {
    regexString += `[${getStageCharacter(i)}]?`;
  }
  regexString += ')';

  return regexString;
};
