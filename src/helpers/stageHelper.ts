export const getStageCharacter = (stage: number) => {
  if (stage > 12) { throw (new Error('Invalid stage')); }

  switch (stage) {
    case 10:
      return '0';
    case 11:
      return 'E';
    case 12:
      return 'T';
    default:
      return String(stage);
  }
};

export const getStageNumber = (stage: string) => {
  switch (stage) {
    case '0':
      return 10;
    case 'E':
      return 11;
    case 'T':
      return 12;
    default: {
      const stageNumber = Number(stage);
      if (!stageNumber || stageNumber > 12) { throw (new Error('Invalid stage')); }
      return stageNumber;
    }
  }
};

export const getStageCallingPositionRegex = (stage: number) => {
  switch (stage) {
    case 4:
      return 'I|O|H|[1-4]';
    case 5:
      return 'I|O|W|H|[1-5]';
    case 6:
    case 7:
    case 8:
    case 9:
      return `I|O|M|W|H|[1-${stage}]`;
    case 10:
      return 'I|O|M|W|H|[1-9]|10';
    case 11:
      return 'I|O|M|W|H|[1-9]|10|11';
    case 12:
      return 'I|O|M|W|H|[1-9]|10|11|12';
    default:
      throw (new Error('Invalid stage'));
  }
};

export const getTenorIndexFromCallPosition = (position: string, stage: number) => {
  const positionUpper = position.toUpperCase();

  if (positionUpper === 'I') { return 1; }
  if (positionUpper === 'O') { return 2; }
  if (positionUpper === 'H' && stage >= 4) { return stage - 1; }
  if (positionUpper === 'W' && stage >= 5) { return stage - 2; }
  if (positionUpper === 'M' && stage >= 6) { return stage - 3; }

  const positionNumber = Number(positionUpper);
  if (positionNumber && positionNumber <= stage) { return positionNumber - 1; }

  throw new Error(`Calling position ${position} is not valid on ${stage.toString()} bells.`);
};

export const getStageQueens = (stage: number) => {
  switch (stage) {
    case 4:
      return '1324';
    case 5:
    case 6:
      return '135246';
    case 7:
    case 8:
      return '13572468';
    case 9:
    case 10:
      return '1357924680';
    case 11:
    case 12:
      return '13579E24680T';
    default:
      throw (new Error('Invalid stage'));
  }
};

export const getStageTittums = (stage: number) => {
  switch (stage) {
    case 4:
      return '1324';
    case 5:
    case 6:
      return '142536';
    case 7:
    case 8:
      return '15263748';
    case 9:
    case 10:
      return '1627384950';
    case 11:
    case 12:
      return '172839405E6T';
    default:
      throw (new Error('Invalid stage'));
  }
};

export const getStageRollupsForward = (stage: number) => {
  switch (stage) {
    case 4:
      return '1234';
    case 5:
    case 6:
      return '3456';
    case 7:
    case 8:
      return '5678';
    case 9:
    case 10:
      return '7890';
    case 11:
    case 12:
      return '90ET';
    default:
      throw (new Error('Invalid stage'));
  }
};

export const getStageRollupsBackward = (stage: number) => {
  const forwardRollup = getStageRollupsForward(stage);
  return forwardRollup.split('').reverse().join('');
};

export const getInitialChange = (stage: number) => {
  const initialChange: string[] = [];

  for (let i = 1; i <= stage; i += 1) {
    initialChange.push(getStageCharacter(i));
  }
  const initialChangeString: string = initialChange.join('');

  return initialChangeString;
};
