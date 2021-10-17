import { Composition } from '../../types/compositions';
import Method from '../../types/methods/method';
import { newComposition } from '../../helpers/compositionHelper';
import {
  getMethodAbbreviationRegex, getMethodListForStage, isValidMethodNotation,
  methodValidForStage, newMethod, sortMethods,
} from '../../helpers/methodHelper';

jest.mock('../../data/methodsList', () => `<?xml version="1.0" encoding="UTF-8"?>
<collection>
  <methodSet>
    <properties>
      <stage>4</stage>
    </properties>
    <method>
      <title>Plain Bob Minimus</title>
      <notation>-14-14,12</notation>
    </method>
    <method>
      <title>Double Bob Minimus</title>
      <notation>-14-34,12</notation>
    </method>
  </methodSet>
  <methodSet>
    <properties>
      <stage>5</stage>
    </properties>
    <method>
      <title>Plain Bob Doubles</title>
      <notation>5.1.5.1.5,125</notation>
    </method>
  </methodSet>
</collection>`);

describe('new method generation', () => {
  test('get basic new method', () => {
    const method = newMethod({
      id: 0, name: 'bob', abbreviation: 'ab1', placeNotation: '', stage: 4,
    });
    expect(method).toStrictEqual({
      id: 0, name: 'bob', abbreviation: 'ab1', placeNotation: '', stage: 4, defaultBob: 'b', defaultSingle: 's',
    });
  });

  test('get new method with overrides', () => {
    const method = newMethod({
      id: 0, name: 'bob', abbreviation: 'ab1', placeNotation: '', stage: 4, defaultBob: 'c',
    });
    expect(method).toStrictEqual({
      id: 0, name: 'bob', abbreviation: 'ab1', placeNotation: '', stage: 4, defaultBob: 'c', defaultSingle: 's',
    });
  });
});

describe('method valid for stage', () => {
  const methods: Method[] = [
    newMethod({
      id: 0, name: 'test', abbreviation: 'ab1', stage: 7, placeNotation: '',
    }),
  ];

  test('method valid', () => {
    const composition: Composition = newComposition({
      id: 0, name: 'test', startingMethod: 'ab1', numberOfBells: 8,
    });

    expect(methodValidForStage(methods, composition)).toBe(true);
  });

  test('method invalid', () => {
    const composition: Composition = newComposition({
      id: 0, name: 'test', startingMethod: 'ab1', numberOfBells: 6,
    });

    expect(methodValidForStage(methods, composition)).toBe(false);
  });

  test('method does not exist', () => {
    const composition: Composition = newComposition({
      id: 0, name: 'test', startingMethod: 'ab2', numberOfBells: 8,
    });

    expect(methodValidForStage(methods, composition)).toBe(false);
  });
});

describe('sort methods', () => {
  const method1: Method = newMethod({
    id: 0, name: 'test', abbreviation: 'ab1', stage: 7, placeNotation: '',
  });
  const method2: Method = newMethod({
    id: 0, name: 'test2', abbreviation: 'ab2', stage: 9, placeNotation: '',
  });

  test('lower stage comes second', () => {
    expect(sortMethods(method1, method2)).toBe(1);
  });

  test('higher stage comes first', () => {
    expect(sortMethods(method2, method1)).toBe(-1);
  });

  test('stages same name first', () => {
    expect(sortMethods(method1, { ...method2, stage: 7 })).toBe(-1);
  });

  test('stages same name after', () => {
    expect(sortMethods({ ...method2, stage: 7 }, method1)).toBe(1);
  });
});

describe('get method abbrev regex', () => {
  test('generate regex single method', () => {
    const methods: Method[] = [
      newMethod({
        id: 0, name: 'test', abbreviation: 'ab1', stage: 7, placeNotation: '',
      }),
    ];

    expect(getMethodAbbreviationRegex(methods)).toBe('ab1');
  });

  test('generate regex multiple methods', () => {
    const methods: Method[] = [
      newMethod({
        id: 0, name: 'test', abbreviation: 'ab1', stage: 7, placeNotation: '',
      }),
      newMethod({
        id: 1, name: 'test1', abbreviation: 'ab2', stage: 8, placeNotation: '',
      }),
    ];

    expect(getMethodAbbreviationRegex(methods)).toBe('ab1|ab2');
  });

  test('no methods throws error', () => {
    expect(() => getMethodAbbreviationRegex([])).toThrow('No methods found');
  });
});

describe('method notation validity', () => {
  test('no notation is invalid', () => {
    const notation: string = '';
    const stage: number = 4;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('single element method is valid', () => {
    const notation: string = '14';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('mutli element method is valid', () => {
    const notation: string = '14.16';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('cross method is valid', () => {
    const notation: string = '-';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('multi - element method with cross is valid', () => {
    const notation: string = '14-16';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('repeated bells in element is invalid', () => {
    const notation: string = '114';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('reverse bell order in element is invalid', () => {
    const notation: string = '41';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('bell not in stage is invalid', () => {
    const notation: string = '19';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('multi element one invalid', () => {
    const notation: string = '14-61';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('repeat crosses invalid', () => {
    const notation: string = '14--16';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('repeat crosses at start invalid', () => {
    const notation: string = '--16';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('repeat dots invalid', () => {
    const notation: string = '14..16';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('dots at start invalid', () => {
    const notation: string = '.16';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('notation with comma valid', () => {
    const notation: string = '14-16,14';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('notation with multiple elements after comma valid', () => {
    const notation: string = '14-16.18,14.5-18';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(true);
  });

  test('notation ending comma invalid', () => {
    const notation: string = '14-61,';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });

  test('notation with multiple commas invalid', () => {
    const notation: string = '14-16.18,14,18';
    const stage: number = 8;

    const valid = isValidMethodNotation(stage, notation);
    expect(valid).toBe(false);
  });
});

describe('fetch method from xml', () => {
  test('fetch minimus methods', () => {
    const methods = getMethodListForStage(4);
    expect(methods.every((m) => m.stage === 4)).toBe(true);
    expect(methods.length).toBe(2);
    expect(methods).toContainEqual({
      name: 'Plain Bob Minimus',
      abbreviation: 'Pla4',
      stage: 4,
      placeNotation: '-14-14,12',
      defaultBob: 'b',
      defaultSingle: 's',
    });
  });
});
