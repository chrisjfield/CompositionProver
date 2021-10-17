import {
  getCompositionDetail, getCompositionDetailProperty, getExpandedComposition,
  newComposition, isValidComposition, getCompositionRegex,
} from '../../helpers/compositionHelper';
import { Composition } from '../../types/compositions';
import { newCall } from '../../helpers/callHelper';
import { newMethod } from '../../helpers/methodHelper';

describe('new composition generation', () => {
  test('get basic new composition', () => {
    const call = newComposition({ id: 0, name: 'test', numberOfBells: 8 });
    expect(call).toStrictEqual({
      id: 0,
      name: 'test',
      numberOfBells: 8,
      type: 'Full',
      parts: 1,
      halfLead: false,
    });
  });

  test('get new composition with overrides', () => {
    const call = newComposition({
      id: 0, name: 'test', numberOfBells: 8, parts: 3,
    });
    expect(call).toStrictEqual({
      id: 0,
      name: 'test',
      numberOfBells: 8,
      type: 'Full',
      parts: 3,
      halfLead: false,
    });
  });
});

describe('get composition detail property name', () => {
  test('full', () => {
    expect(getCompositionDetailProperty({ type: 'Full' })).toBe('fullComposition');
  });

  test('numerical', () => {
    expect(getCompositionDetailProperty({ type: 'Numerical' })).toBe('numericalComposition');
  });

  test('positional', () => {
    expect(getCompositionDetailProperty({ type: 'Positional' })).toBe('positionalComposition');
  });

  test('never', () => {
    expect(() => getCompositionDetailProperty({ type: 'test' as never })).toThrow('Didn\'t expect to get here: test');
  });
});

describe('get composition detail', () => {
  const composition = newComposition({ id: 0, name: 'test', numberOfBells: 8 });
  test('full', () => {
    const testComposition: Composition = { ...composition, type: 'Full', fullComposition: 'pb5p' };
    expect(getCompositionDetail(testComposition)).toBe('pb5p');
  });

  test('numerical', () => {
    const testComposition: Composition = { ...composition, type: 'Numerical', numericalComposition: '1.5' };
    expect(getCompositionDetail(testComposition)).toBe('1.5');
  });

  test('positional', () => {
    const testComposition: Composition = { ...composition, type: 'Positional', positionalComposition: 'H' };
    expect(getCompositionDetail(testComposition)).toBe('H');
  });

  test('never', () => {
    const testComposition: Composition = { ...composition, type: 'test' as never, positionalComposition: 'H' };
    expect(() => getCompositionDetail(testComposition)).toThrow('Didn\'t expect to get here: test');
  });
});

describe('expand composition', () => {
  test('basic full', () => {
    expect(getExpandedComposition('pb5p.pb5p.pb5p.pb5b')).toBe('pb5p.pb5p.pb5p.pb5b');
  });

  test('basic numeric', () => {
    expect(getExpandedComposition('1.s5.9.1.5.7')).toBe('1.s5.9.1.5.7');
  });

  test('basic positional', () => {
    expect(getExpandedComposition('2H.W.5.6.H')).toBe('2H.W.5.6.H');
  });

  test('full with parts', () => {
    expect(getExpandedComposition(`
      part1=pb5p.pb5p;
      part2=pb5b;
      part1.part1.part2
    `)).toBe('pb5p.pb5p.pb5p.pb5p.pb5b');
  });

  test('numeric with parts', () => {
    expect(getExpandedComposition(`
    part1=1.s5;
    part2=9.1;
    part1.part2.part1
  `)).toBe('1.s5.9.1.1.s5');
  });

  test('positional with parts', () => {
    expect(getExpandedComposition(`
    part1=2H.W;
    part2=5.6;
    part1.part2.part1
  `)).toBe('2H.W.5.6.2H.W');
  });

  test('full with nested parts', () => {
    expect(getExpandedComposition(`
      part1=pb5p;
      part2=pb5b.part1;
      part1.part2
    `)).toBe('pb5p.pb5b.pb5p');
  });

  test('numeric with nested parts', () => {
    expect(getExpandedComposition(`
    part1=1.s5;
    part2=2.9.part1;
    part1.part2
  `)).toBe('1.s5.2.9.1.s5');
  });

  test('positional with nested parts', () => {
    expect(getExpandedComposition(`
    part1=2H.W;
    part2=5.6.part1;
    part1.part2
  `)).toBe('2H.W.5.6.2H.W');
  });

  test('full with parts and basic', () => {
    expect(getExpandedComposition(`
      part1=pb5p.pb5p;
      part2=pb5b;
      part1.pb5b.pb5s.part1.part2
    `)).toBe('pb5p.pb5p.pb5b.pb5s.pb5p.pb5p.pb5b');
  });

  test('numeric with parts and basic', () => {
    expect(getExpandedComposition(`
    part1=1.s5;
    part2=9.1;
    part1.part2.6.7.part1
  `)).toBe('1.s5.9.1.6.7.1.s5');
  });

  test('positional with parts and basic', () => {
    expect(getExpandedComposition(`
    part1=2H.W;
    part2=5.6;
    part1.part2.2sW.part1
  `)).toBe('2H.W.5.6.2sW.2H.W');
  });

  test('repeated part invalid', () => {
    expect(() => getExpandedComposition(`
    part1=pb5p.pb5p;
    part1=pb5b;
    part1.part1.part1
  `)).toThrow('Composition part "part1" is defined more than once.');
  });

  test('multiple definitions in a part invalid', () => {
    expect(() => getExpandedComposition(`
    part1=pb5p.pb5p.
    part2=pb5b;
    part1.part1.part2
  `)).toThrow('Composition part "part1=pb5p.pb5p.part2=pb5b" is invalid.');
  });

  test('no definitions in a part invalid', () => {
    expect(() => getExpandedComposition(`
    part1pb5p.pb5p;
    part2=pb5b;
    part1.part1.part2
  `)).toThrow('Composition part "part1pb5p.pb5p" is invalid.');
  });
});

describe('check composition validity', () => {
  const calls = [
    newCall({ name: 'bob', abbreviation: 'b', stage: 6 }),
    newCall({ name: 'single', abbreviation: 's', stage: 6 }),
    newCall({ name: 'custom', abbreviation: 'c', stage: 6 }),
  ];

  const methods = [
    newMethod({
      id: 0, name: 'test', abbreviation: 'ab1', stage: 6, placeNotation: '',
    }),
    newMethod({
      id: 1, name: 'test1', abbreviation: 'ab2', stage: 6, placeNotation: '',
    }),
  ];

  const composition = newComposition({ id: 0, name: 'test', numberOfBells: 6 });

  test('basic full', () => {
    const testComposition: Composition = {
      ...composition, type: 'Full', fullComposition: `
      ab1p.ab1b
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(true);
  });

  test('complex full', () => {
    const testComposition: Composition = {
      ...composition, type: 'Full', fullComposition: `
      part1=ab1p.ab1p;
      part2=ab2b.part1;
      part1.ab2b.ab1s.part1.part2
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(true);
  });

  test('full invalid method', () => {
    const testComposition: Composition = {
      ...composition, type: 'Full', fullComposition: `
      ab1p.ab3b
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('full invalid call', () => {
    const testComposition: Composition = {
      ...composition, type: 'Full', fullComposition: `
      ab1p.ab1q
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('basic numeric', () => {
    const testComposition: Composition = {
      ...composition, type: 'Numerical', startingMethod: 'ab1', numericalComposition: `
      1.s8
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(true);
  });

  test('complex numeric', () => {
    const testComposition: Composition = {
      ...composition, type: 'Numerical', startingMethod: 'ab1', numericalComposition: `
      part1=1.5;
      part2=1.part1;
      part1.c6.part1.part2
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(true);
  });

  test('numeric no starting method', () => {
    const testComposition: Composition = {
      ...composition, type: 'Numerical', numericalComposition: `
      1.5
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('numeric invalid starting method', () => {
    const testComposition: Composition = {
      ...composition, type: 'Numerical', startingMethod: 'ab3', numericalComposition: `
      1.5
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('numeric invalid call', () => {
    const testComposition: Composition = {
      ...composition, type: 'Numerical', startingMethod: 'ab1', numericalComposition: `
      1.q5
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('basic positional', () => {
    const testComposition: Composition = {
      ...composition, type: 'Positional', startingMethod: 'ab1', positionalComposition: `
      2H.sW
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(true);
  });

  test('complex positional', () => {
    const testComposition: Composition = {
      ...composition, type: 'Positional', startingMethod: 'ab1', positionalComposition: `
      part1=2sH;
      part2=W.4;
      part1.W.part1.part2
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(true);
  });

  test('positional no starting method', () => {
    const testComposition: Composition = {
      ...composition, type: 'Positional', positionalComposition: `
      2H.sW
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('positional invalid starting method', () => {
    const testComposition: Composition = {
      ...composition, type: 'Positional', startingMethod: 'ab3', positionalComposition: `
      2H.sW
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('positional invalid call', () => {
    const testComposition: Composition = {
      ...composition, type: 'Positional', startingMethod: 'ab1', positionalComposition: `
      2H.qW
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('positional invalid stage', () => {
    const testComposition: Composition = {
      ...composition, type: 'Positional', startingMethod: 'ab1', positionalComposition: `
      2H.sW.8
    `,
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(false);
  });

  test('blank composition is valid', () => {
    const testComposition: Composition = {
      ...composition, type: 'Full', fullComposition: '',
    };
    expect(isValidComposition(calls, methods, testComposition)).toBe(true);
  });

  test('never', () => {
    expect(() => getCompositionRegex('test' as never, '', '', '')).toThrow('Didn\'t expect to get here: test');
  });
});
