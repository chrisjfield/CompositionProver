import { Call } from '../../types/calls';
import {
  getCallAbbreviationRegex, isValidCallNotation, newCall, plainCall,
} from '../../helpers/callHelper';

describe('new call generation', () => {
  test('get basic new call', () => {
    const call = newCall({ name: 'bob', abbreviation: 'b', stage: 4 });
    expect(call).toStrictEqual({
      name: 'bob',
      abbreviation: 'b',
      stage: 4,
      editable: true,
      halfLeadPlaceNotation: '',
      leadEndPlaceNotation: '',
    });
  });

  test('get new call with overrides', () => {
    const call = newCall({
      name: 'bob', abbreviation: 'b', stage: 4, halfLeadPlaceNotation: '1234',
    });
    expect(call).toStrictEqual({
      name: 'bob',
      abbreviation: 'b',
      stage: 4,
      editable: true,
      halfLeadPlaceNotation: '1234',
      leadEndPlaceNotation: '',
    });
  });
});

describe('call regex generation', () => {
  test('no calls returns plain', () => {
    const calls: Call[] = [];

    const regex = getCallAbbreviationRegex(calls);
    expect(regex).toBe('p');
  });

  test('one call returns with plain', () => {
    const calls: Call[] = [
      newCall({ name: 'bob', abbreviation: 'b', stage: 4 }),
    ];

    const regex = getCallAbbreviationRegex(calls);
    expect(regex).toBe('p|b');
  });

  test('multiple call returns with plain', () => {
    const calls: Call[] = [
      newCall({ name: 'bob', abbreviation: 'b', stage: 4 }),
      newCall({ name: 'single', abbreviation: 's', stage: 4 }),
      newCall({ name: 'custom', abbreviation: 'c', stage: 4 }),
    ];

    const regex = getCallAbbreviationRegex(calls);
    expect(regex).toBe('p|b|s|c');
  });
});

describe('call notation validity', () => {
  test('no notation is valid', () => {
    const notation: string = '';
    const stage: number = 4;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('single element call is valid', () => {
    const notation: string = '14';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('mutli element call is valid', () => {
    const notation: string = '14.16';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('cross call is valid', () => {
    const notation: string = '-';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('multi - element call with cross is valid', () => {
    const notation: string = '14-16';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('repeated bells in element is invalid', () => {
    const notation: string = '114';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('reverse bell order in element is invalid', () => {
    const notation: string = '41';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('bell not in stage is invalid', () => {
    const notation: string = '19';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('multi element one invalid', () => {
    const notation: string = '14-61';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('repeat crosses invalid', () => {
    const notation: string = '14--16';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('repeat crosses at start invalid', () => {
    const notation: string = '--16';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('repeat dots invalid', () => {
    const notation: string = '14..16';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('dots at start invalid', () => {
    const notation: string = '.16';
    const stage: number = 8;

    const valid = isValidCallNotation(stage, notation);
    expect(valid).toBe(false);
  });
});

describe('plain call generation', () => {
  test('get plain call', () => {
    expect(plainCall).toStrictEqual({
      abbreviation: 'p',
      editable: false,
      name: 'Plain lead',
      stage: 0,
      halfLeadPlaceNotation: '',
      leadEndPlaceNotation: '',
    });
  });
});
