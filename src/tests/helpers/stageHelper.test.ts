import {
  getStageCallingPositionRegex, getStageCharacter, getStageNumber,
  getTenorIndexFromCallPosition, getStageQueens, getStageTittums,
  getStageRollupsForward, getStageRollupsBackward, getInitialChange, getStageNotationRegex,
} from '../../helpers/stageHelper';

describe('stage character conversion', () => {
  test('get valid character', () => {
    expect(getStageCharacter(4)).toBe('4');
    expect(getStageCharacter(8)).toBe('8');
    expect(getStageCharacter(10)).toBe('0');
    expect(getStageCharacter(11)).toBe('E');
    expect(getStageCharacter(12)).toBe('T');
  });

  test('unsupported stage', () => {
    expect(() => getStageCharacter(15)).toThrow('Invalid stage');
  });
});

describe('stage number conversion', () => {
  test('get valid number', () => {
    expect(getStageNumber('4')).toBe(4);
    expect(getStageNumber('8')).toBe(8);
    expect(getStageNumber('0')).toBe(10);
    expect(getStageNumber('E')).toBe(11);
    expect(getStageNumber('T')).toBe(12);
  });

  test('unsupported stage', () => {
    expect(() => getStageNumber('15')).toThrow('Invalid stage');
  });
});

describe('get stage call postion regex', () => {
  test('get valid call', () => {
    expect(getStageCallingPositionRegex(4)).toBe('I|O|H|[1-4]');
    expect(getStageCallingPositionRegex(5)).toBe('I|O|W|H|[1-5]');
    expect(getStageCallingPositionRegex(6)).toBe('I|O|M|W|H|[1-6]');
    expect(getStageCallingPositionRegex(7)).toBe('I|O|M|W|H|[1-7]');
    expect(getStageCallingPositionRegex(8)).toBe('I|O|M|W|H|[1-8]');
    expect(getStageCallingPositionRegex(9)).toBe('I|O|M|W|H|[1-9]');
    expect(getStageCallingPositionRegex(10)).toBe('I|O|M|W|H|[1-9]|10');
    expect(getStageCallingPositionRegex(11)).toBe('I|O|M|W|H|[1-9]|10|11');
    expect(getStageCallingPositionRegex(12)).toBe('I|O|M|W|H|[1-9]|10|11|12');
  });

  test('unsupported stage', () => {
    expect(() => getStageCallingPositionRegex(15)).toThrow('Invalid stage');
  });
});

describe('get stage call postion regex', () => {
  test('get valid call', () => {
    expect(getStageNotationRegex(4)).toBe('(?=[1-4])([1]?[2]?[3]?[4]?)');
    expect(getStageNotationRegex(8)).toBe('(?=[1-8])([1]?[2]?[3]?[4]?[5]?[6]?[7]?[8]?)');
    expect(getStageNotationRegex(10)).toBe('(?=[0-9])([1]?[2]?[3]?[4]?[5]?[6]?[7]?[8]?[9]?[0]?)');
    expect(getStageNotationRegex(11)).toBe('(?=[0-9E])([1]?[2]?[3]?[4]?[5]?[6]?[7]?[8]?[9]?[0]?[E]?)');
    expect(getStageNotationRegex(12)).toBe('(?=[0-9ET])([1]?[2]?[3]?[4]?[5]?[6]?[7]?[8]?[9]?[0]?[E]?[T]?)');
  });

  test('unsupported stage', () => {
    expect(() => getStageNotationRegex(15)).toThrow('Invalid stage');
  });
});

describe('get tenor index for call postion', () => {
  test('get valid index', () => {
    expect(getTenorIndexFromCallPosition('H', 8)).toBe(7);
    expect(getTenorIndexFromCallPosition('W', 8)).toBe(6);
    expect(getTenorIndexFromCallPosition('M', 8)).toBe(5);
    expect(getTenorIndexFromCallPosition('I', 8)).toBe(1);
    expect(getTenorIndexFromCallPosition('O', 8)).toBe(2);
    expect(getTenorIndexFromCallPosition('7', 12)).toBe(6);
    expect(getTenorIndexFromCallPosition('1', 10)).toBe(0);
  });

  test('unsupported stage', () => {
    expect(() => getTenorIndexFromCallPosition('M', 5)).toThrow('Calling position M is not valid on 5 bells');
    expect(() => getTenorIndexFromCallPosition('6', 5)).toThrow('Calling position 6 is not valid on 5 bells');
  });
});

describe('get queens', () => {
  test('generate queens', () => {
    expect(getStageQueens(4)).toBe('1324');
    expect(getStageQueens(5)).toBe('135246');
    expect(getStageQueens(6)).toBe('135246');
    expect(getStageQueens(7)).toBe('13572468');
    expect(getStageQueens(8)).toBe('13572468');
    expect(getStageQueens(9)).toBe('1357924680');
    expect(getStageQueens(10)).toBe('1357924680');
    expect(getStageQueens(11)).toBe('13579E24680T');
    expect(getStageQueens(12)).toBe('13579E24680T');
  });

  test('unsupported stage', () => {
    expect(() => getStageQueens(3)).toThrow('Invalid stage');
    expect(() => getStageQueens(15)).toThrow('Invalid stage');
  });
});

describe('get tittums', () => {
  test('generate tittums', () => {
    expect(getStageTittums(4)).toBe('1324');
    expect(getStageTittums(5)).toBe('142536');
    expect(getStageTittums(6)).toBe('142536');
    expect(getStageTittums(7)).toBe('15263748');
    expect(getStageTittums(8)).toBe('15263748');
    expect(getStageTittums(9)).toBe('1627384950');
    expect(getStageTittums(10)).toBe('1627384950');
    expect(getStageTittums(11)).toBe('172839405E6T');
    expect(getStageTittums(12)).toBe('172839405E6T');
  });

  test('unsupported stage', () => {
    expect(() => getStageTittums(3)).toThrow('Invalid stage');
    expect(() => getStageTittums(15)).toThrow('Invalid stage');
  });
});

describe('get rollups forward', () => {
  test('generate rollups forward', () => {
    expect(getStageRollupsForward(4)).toBe('1234');
    expect(getStageRollupsForward(5)).toBe('3456');
    expect(getStageRollupsForward(6)).toBe('3456');
    expect(getStageRollupsForward(7)).toBe('5678');
    expect(getStageRollupsForward(8)).toBe('5678');
    expect(getStageRollupsForward(9)).toBe('7890');
    expect(getStageRollupsForward(10)).toBe('7890');
    expect(getStageRollupsForward(11)).toBe('90ET');
    expect(getStageRollupsForward(12)).toBe('90ET');
  });

  test('unsupported stage', () => {
    expect(() => getStageRollupsForward(3)).toThrow('Invalid stage');
    expect(() => getStageRollupsForward(15)).toThrow('Invalid stage');
  });
});

describe('get rollups backwards', () => {
  test('generate rollups backwards', () => {
    expect(getStageRollupsBackward(4)).toBe('4321');
    expect(getStageRollupsBackward(5)).toBe('6543');
    expect(getStageRollupsBackward(8)).toBe('8765');
    expect(getStageRollupsBackward(9)).toBe('0987');
    expect(getStageRollupsBackward(12)).toBe('TE09');
  });

  test('unsupported stage', () => {
    expect(() => getStageRollupsBackward(3)).toThrow('Invalid stage');
    expect(() => getStageRollupsBackward(15)).toThrow('Invalid stage');
  });
});

describe('get initial change', () => {
  test('generate rollups backwards', () => {
    expect(getInitialChange(4)).toBe('1234');
    expect(getInitialChange(8)).toBe('12345678');
    expect(getInitialChange(12)).toBe('1234567890ET');
  });

  test('unsupported stage', () => {
    expect(() => getInitialChange(15)).toThrow('Invalid stage');
  });
});
