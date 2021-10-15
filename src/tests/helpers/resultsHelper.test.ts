import calculateResult from '../../helpers/resultHelper';
import defaultCompositions from '../../defaults/compositions';
import defaultMethods from '../../defaults/methods';
import defaultCalls from '../../defaults/calls';
import { Composition } from '../../types/compositions';

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
