import { Composition } from '../../types/compositions';
import mockCalls from './data/mockCalls';
import { mockValidCompositions, mockInValidCompositions } from './data/mockCompositions';
import mockMethods from './data/mockMethods';
import ResultGenerator from '../../helpers/resultGenerator';

describe('Basic single part composition', () => {
  const baseTestComp = mockValidCompositions[0];

  test('Full', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(336);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
      expect(result.courseEnds).toStrictEqual(['14365278', '16325478', '12345678']);
      expect(result.partEnds).toStrictEqual(['12345678']);
    });
  });

  test('Numerical', () => {
    const comp: Composition = { ...baseTestComp, type: 'Numerical' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(336);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
      expect(result.courseEnds).toStrictEqual(['14365278', '16325478', '12345678']);
      expect(result.partEnds).toStrictEqual(['12345678']);
    });
  });

  test('Positional', () => {
    const comp: Composition = { ...baseTestComp, type: 'Positional' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(336);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
      expect(result.courseEnds).toStrictEqual(['14365278', '16325478', '12345678']);
      expect(result.partEnds).toStrictEqual(['12345678']);
    });
  });
});

describe('Basic multi part composition', () => {
  const baseTestComp = mockValidCompositions[1];

  test('Full', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(224);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
      expect(result.courseEnds).toStrictEqual(['16345278', '12345678']);
      expect(result.partEnds).toStrictEqual(['16345278', '12345678']);
    });
  });

  test('Numerical', () => {
    const comp: Composition = { ...baseTestComp, type: 'Numerical' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(224);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
      expect(result.courseEnds).toStrictEqual(['16345278', '12345678']);
      expect(result.partEnds).toStrictEqual(['16345278', '12345678']);
    });
  });

  test('Positional', () => {
    const comp: Composition = { ...baseTestComp, type: 'Positional' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(224);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
      expect(result.courseEnds).toStrictEqual(['16345278', '12345678']);
      expect(result.partEnds).toStrictEqual(['16345278', '12345678']);
    });
  });
});

describe('Stedman composition', () => {
  const baseTestComp = mockValidCompositions[2];

  test('Full', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(63);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
      expect(result.partEnds).toStrictEqual(['12345678']);
    });
  });

  test('Numerical', () => {
    const comp: Composition = { ...baseTestComp, type: 'Numerical' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(63);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
      expect(result.courseEnds).toStrictEqual(['12345678']);
      expect(result.partEnds).toStrictEqual(['12345678']);
    });
  });
});

describe('Mixed stage composition', () => {
  const baseTestComp = mockValidCompositions[3];

  test('Full', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(84);
      expect(result.truth.true).toBe(false);
      expect(result.truth.comesRound).toBe(false);
      expect(result.truth.firstFalseRow).toBe('16375428');
      expect(result.changesOfMethod).toBe(5);
      expect(result.courseEnds.length).toBe(0);
      expect(result.partEnds).toStrictEqual(['16734582', '15873426']);
    });
  });
});

describe('Half lead composition', () => {
  const baseTestComp = mockValidCompositions[4];

  test('Full', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(96);
      expect(result.truth.true).toBe(true);
      expect(result.truth.comesRound).toBe(false);
      expect(result.changesOfMethod).toBe(2);
      expect(result.courseEnds.length).toBe(0);
      expect(result.partEnds).toStrictEqual(['16473825']);
    });
  });
});

describe('Forced places', () => {
  const baseTestComp = mockValidCompositions[5];

  test('Full', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    resultGenerator.calculateResult((result) => {
      expect(result.numberOfChanges).toBe(28);
      expect(result.truth.true).toBe(false);
      expect(result.truth.comesRound).toBe(true);
      expect(result.changesOfMethod).toBe(0);
    });
  });
});

describe('Invalid composition', () => {
  const baseTestComp = mockInValidCompositions[0];

  test('Invalid type constructor', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);
    (resultGenerator as any).composition.type = 'fake';

    expect(() => (resultGenerator as any).getInitialMethod()).toThrow('Didn\'t expect to get here: fake');
  });

  test('Invalid type part generation', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);
    (resultGenerator as any).composition.type = 'fake';

    expect(() => resultGenerator.calculateResult(() => {})).toThrow('Didn\'t expect to get here: fake');
  });
});

describe('Invalid method', () => {
  const baseTestComp = mockInValidCompositions[1];

  test('Invalid place notation', () => {
    const comp: Composition = { ...baseTestComp, type: 'Full' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    expect(() => resultGenerator.calculateResult(() => {})).toThrow('Place Notation "39" contains an invalid expression');
  });
});

describe('Infinite loop', () => {
  const baseTestComp = mockInValidCompositions[2];

  test('Endless loop', () => {
    const comp: Composition = { ...baseTestComp, type: 'Positional' };
    const resultGenerator = new ResultGenerator(mockMethods, mockCalls, comp);

    expect(() => resultGenerator.calculateResult(() => {})).toThrow('Loop encountered, tenor does not return to position 7');
  });
});
