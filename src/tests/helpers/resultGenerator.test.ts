import { Composition } from '../../types/compositions';
import defaultCalls from '../../defaults/calls';
import defaultCompositions from '../../defaults/compositions';
import defaultMethods from '../../defaults/methods';
import ResultGenerator from '../../helpers/resultGenerator';

test('basic full comp', () => {
  const comp: Composition = { ...defaultCompositions[0], type: 'Full' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  resultGenerator.calculateResult((result) => {
    expect(result.numberOfChanges).toBe(336);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
    expect(result.changesOfMethod).toBe(0);
  });
});

// test('basic numerical comp', () => {
//   const comp: Composition = { ...defaultCompositions[0], type: 'Numerical' };
//   const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

//   resultGenerator.calculateResult((result) => {
//     expect(result.numberOfChanges).toBe(336);
//     expect(result.truth.true).toBe(true);
//     expect(result.truth.comesRound).toBe(true);
//     expect(result.changesOfMethod).toBe(0);
//   });
// });

test('basic positional comp', () => {
  const comp: Composition = { ...defaultCompositions[0], type: 'Positional' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  resultGenerator.calculateResult((result) => {
    expect(result.numberOfChanges).toBe(336);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
    expect(result.changesOfMethod).toBe(0);
  });
});

test('stedman full comp', () => {
  const comp: Composition = { ...defaultCompositions[1], type: 'Full' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  resultGenerator.calculateResult((result) => {
    expect(result.numberOfChanges).toBe(63);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
    expect(result.changesOfMethod).toBe(0);
  });
});

// test('stedman numerical comp', () => {
//   const comp: Composition = { ...defaultCompositions[1], type: 'Numerical' };
//   const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

//   resultGenerator.calculateResult((result) => {
//     expect(result.numberOfChanges).toBe(63);
//     expect(result.truth.true).toBe(true);
//     expect(result.truth.comesRound).toBe(true);
//     expect(result.changesOfMethod).toBe(0);
//   });
// });

test('stedman positional comp', () => {
  const comp: Composition = { ...defaultCompositions[1], type: 'Positional' };
  expect(() => new ResultGenerator(defaultMethods, defaultCalls, comp)).toThrowError('No composition detail provided for type Positional');
});

test('multi stage false', () => {
  const comp: Composition = { ...defaultCompositions[2], type: 'Full' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  resultGenerator.calculateResult((result) => {
    expect(result.numberOfChanges).toBe(60);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(false);
    expect(result.changesOfMethod).toBe(3);
  });
});

test('false comp - too many repeated changes', () => {
  const comp: Composition = { ...defaultCompositions[3], type: 'Full' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  resultGenerator.calculateResult((result) => {
    expect(result.numberOfChanges).toBe(200);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(true);
  });
});

test('multiple calls at position', () => {
  const comp: Composition = { ...defaultCompositions[4], type: 'Positional' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  resultGenerator.calculateResult((result) => {
    expect(result.numberOfChanges).toBe(448);
    expect(result.truth.true).toBe(true);
    expect(result.truth.comesRound).toBe(true);
  });
});

test('test random calls', () => {
  const comp: Composition = { ...defaultCompositions[5], type: 'Full' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  resultGenerator.calculateResult((result) => {
    expect(result.numberOfChanges).toBe(70);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(false);
  });
});

test('test random calls positional', () => {
  const comp: Composition = { ...defaultCompositions[5], type: 'Positional' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  resultGenerator.calculateResult((result) => {
    expect(result.numberOfChanges).toBe(182);
    expect(result.truth.true).toBe(false);
    expect(result.truth.comesRound).toBe(false);
  });
});

// test('test multi course numerical', () => {
//   const comp: Composition = { ...defaultCompositions[5], type: 'Numerical' };
//   const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

//   resultGenerator.calculateResult((result) => {
//     expect(result.numberOfChanges).toBe(154);
//     expect(result.truth.true).toBe(false);
//     expect(result.truth.comesRound).toBe(false);
//   });
// });

test('test invalid call full', () => {
  const comp: Composition = { ...defaultCompositions[6], type: 'Full' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  expect(() => resultGenerator.calculateResult(() => {})).toThrowError('is not a valid call');
});

// test('test invalid call numerical', () => {
//   const comp: Composition = { ...defaultCompositions[6], type: 'Numerical' };
//   const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

//   expect(() => resultGenerator.calculateResult(() => {}))
// .toThrowError('does not start with a valid call');
// });

test('test invalid call positional', () => {
  const comp: Composition = { ...defaultCompositions[6], type: 'Positional' };
  const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

  expect(() => resultGenerator.calculateResult(() => {})).toThrowError('is not a valid call');
});

test('test invalid method full', () => {
  const comp: Composition = { ...defaultCompositions[7], type: 'Full' };

  expect(() => new ResultGenerator(defaultMethods, defaultCalls, comp)).toThrowError('is not a valid method');
});

// test('test invalid method numerical', () => {
//   const comp: Composition = { ...defaultCompositions[7], type: 'Numerical' };
//   const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

//   expect(() => resultGenerator.calculateResult(() => {})).toThrowError('is not a valid method');
// });

test('test invalid method positional', () => {
  const comp: Composition = { ...defaultCompositions[7], type: 'Positional' };

  expect(() => new ResultGenerator(defaultMethods, defaultCalls, comp)).toThrowError('"fake" is not a valid method');
});

// test('test invalid numerical position', () => {
//   const comp: Composition = { ...defaultCompositions[7],
// startingMethod: 'pb8', type: 'Numerical' };
//   const resultGenerator = new ResultGenerator(defaultMethods, defaultCalls, comp);

//   expect(() => resultGenerator.calculateResult(() => {})).
// toThrowError('does not end with a valid numerical position');
// });
