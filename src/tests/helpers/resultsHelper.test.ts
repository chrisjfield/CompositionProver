import { Composition } from '../../types/compositions';
import defaultCalls from '../../defaults/calls';
import defaultCompositions from '../../defaults/compositions';
import defaultMethods from '../../defaults/methods';
import calculateResult from '../../helpers/resultHelper';

test('basic full comp', () => {
  const comp: Composition = { ...defaultCompositions[0], type: 'Full' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(336);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
    expect(result.changesOfMethod).toBe(0);
  });
});

test('basic numerical comp', () => {
  const comp: Composition = { ...defaultCompositions[0], type: 'Numerical' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(336);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
    expect(result.changesOfMethod).toBe(0);
  });
});

test('basic positional comp', () => {
  const comp: Composition = { ...defaultCompositions[0], type: 'Positional' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(336);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
    expect(result.changesOfMethod).toBe(0);
  });
});

test('stedman full comp', () => {
  const comp: Composition = { ...defaultCompositions[1], type: 'Full' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(63);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
    expect(result.changesOfMethod).toBe(0);
  });
});

test('stedman numerical comp', () => {
  const comp: Composition = { ...defaultCompositions[1], type: 'Numerical' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(63);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
    expect(result.changesOfMethod).toBe(0);
  });
});

test('stedman positional comp', () => {
  const comp: Composition = { ...defaultCompositions[1], type: 'Positional' };
  expect(() => calculateResult(comp, defaultMethods, defaultCalls, () => {})).toThrowError('No composition found');
});

test('multi stage false', () => {
  const comp: Composition = { ...defaultCompositions[2], type: 'Full' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(60);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(false);
    expect(result.changesOfMethod).toBe(3);
  });
});

test('false comp - too many repeated changes', () => {
  const comp: Composition = { ...defaultCompositions[3], type: 'Full' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(200);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(true);
  });
});

test('multiple calls at position', () => {
  const comp: Composition = { ...defaultCompositions[4], type: 'Positional' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(448);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
  });
});

test('test random calls', () => {
  const comp: Composition = { ...defaultCompositions[5], type: 'Full' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(70);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(false);
  });
});

test('test random calls positional', () => {
  const comp: Composition = { ...defaultCompositions[5], type: 'Positional' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(182);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(false);
  });
});

test('test multi course numerical', () => {
  const comp: Composition = { ...defaultCompositions[5], type: 'Numerical' };

  calculateResult(comp, defaultMethods, defaultCalls, (result) => {
    expect(result.numberOfChanges).toBe(154);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(false);
  });
});

test('test invalid call full', () => {
  const comp: Composition = { ...defaultCompositions[6], type: 'Full' };
  expect(() => calculateResult(comp, defaultMethods, defaultCalls, () => {})).toThrowError('does not end with a valid call');
});

test('test invalid call numerical', () => {
  const comp: Composition = { ...defaultCompositions[6], type: 'Numerical' };
  expect(() => calculateResult(comp, defaultMethods, defaultCalls, () => {})).toThrowError('does not start with a valid call');
});

test('test invalid call positional', () => {
  const comp: Composition = { ...defaultCompositions[6], type: 'Positional' };
  expect(() => calculateResult(comp, defaultMethods, defaultCalls, () => {})).toThrowError('contains an invalid call abbreviation');
});

test('test invalid method full', () => {
  const comp: Composition = { ...defaultCompositions[7], type: 'Full' };
  expect(() => calculateResult(comp, defaultMethods, defaultCalls, () => {})).toThrowError('does not start with a valid method');
});

test('test invalid method numerical', () => {
  const comp: Composition = { ...defaultCompositions[7], type: 'Numerical' };
  expect(() => calculateResult(comp, defaultMethods, defaultCalls, () => {})).toThrowError('is not a valid method');
});

test('test invalid method positional', () => {
  const comp: Composition = { ...defaultCompositions[7], type: 'Positional' };
  expect(() => calculateResult(comp, defaultMethods, defaultCalls, () => {})).toThrowError('is not a valid method');
});

test('test invalid numerical position', () => {
  const comp: Composition = { ...defaultCompositions[7], startingMethod: 'pb8', type: 'Numerical' };
  expect(() => calculateResult(comp, defaultMethods, defaultCalls, () => {})).toThrowError('does not end with a valid numerical position');
});
