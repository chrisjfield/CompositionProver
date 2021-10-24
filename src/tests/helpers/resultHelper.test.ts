import { Call } from '../../types/calls';
import { Method } from '../../types/methods';
import { newCall, plainCall } from '../../helpers/callHelper';
import { newMethod } from '../../helpers/methodHelper';
import {
  getChangeCount, getChangeEndsWithCount, getChangeStartsWithCount,
  getMusicalChanges, getPlaceNotation, getTruth,
} from '../../helpers/resultHelper';

describe('get exact change count', () => {
  const rows = ['1234', '1432', '1234'];

  test('no row found', () => {
    const count = getChangeCount(rows, '4321');
    expect(count).toBe(0);
  });

  test('one row found', () => {
    const count = getChangeCount(rows, '1432');
    expect(count).toBe(1);
  });

  test('multiple rows found', () => {
    const count = getChangeCount(rows, '1234');
    expect(count).toBe(2);
  });
});

describe('get front rollups', () => {
  const rows = ['1234', '1432', '1234', '3421'];

  test('no row found', () => {
    const count = getChangeStartsWithCount(rows, ['432']);
    expect(count).toBe(0);
  });

  test('one row found', () => {
    const count = getChangeStartsWithCount(rows, ['143']);
    expect(count).toBe(1);
  });

  test('multiple rows found', () => {
    const count = getChangeStartsWithCount(rows, ['123']);
    expect(count).toBe(2);
  });

  test('multiple starts with values found', () => {
    const count = getChangeStartsWithCount(rows, ['123', '143']);
    expect(count).toBe(3);
  });
});

describe('get back rollups', () => {
  const rows = ['1234', '1432', '1234', '3421'];

  test('no row found', () => {
    const count = getChangeEndsWithCount(rows, ['123']);
    expect(count).toBe(0);
  });

  test('one row found', () => {
    const count = getChangeEndsWithCount(rows, ['432']);
    expect(count).toBe(1);
  });

  test('multiple rows found', () => {
    const count = getChangeEndsWithCount(rows, ['234']);
    expect(count).toBe(2);
  });

  test('multiple starts with values found', () => {
    const count = getChangeEndsWithCount(rows, ['234', '432']);
    expect(count).toBe(3);
  });
});

describe('get musical changes', () => {
  test('no music', () => {
    const rows = ['15263782'];
    const music = getMusicalChanges(8, rows);

    expect(music.littleBellsBack).toBe(0);
    expect(music.littleBellsFront).toBe(0);
    expect(music.queens).toBe(0);
    expect(music.rollupsBack).toBe(0);
    expect(music.rollupsFront).toBe(0);
    expect(music.tittums).toBe(0);
  });

  test('one of everything music', () => {
    const rows = [
      '12345678', '87654321', '23456781',
      '18765432', '13572468', '15263748',
    ];
    const music = getMusicalChanges(8, rows);

    expect(music.littleBellsBack).toBe(1);
    expect(music.littleBellsFront).toBe(1);
    expect(music.queens).toBe(1);
    expect(music.rollupsBack).toBe(1);
    expect(music.rollupsFront).toBe(1);
    expect(music.tittums).toBe(1);
  });

  test('mulitple of everything music', () => {
    const rows = [
      '12345678', '87654321', '23456781', '54321876', '18765432',
      '18762345', '13572468', '15263748', '13572468', '15263748',
      '43215678', '87651234',
    ];
    const music = getMusicalChanges(8, rows);

    expect(music.littleBellsBack).toBe(2);
    expect(music.littleBellsFront).toBe(2);
    expect(music.queens).toBe(2);
    expect(music.rollupsBack).toBe(2);
    expect(music.rollupsFront).toBe(2);
    expect(music.tittums).toBe(2);
  });
});

describe('get truth', () => {
  test('comes round true', () => {
    const rows = [
      '123', '213', '231', '321',
      '312', '132', '123',
    ];
    const truth = getTruth(3, rows);

    expect(truth.comesRound).toBe(true);
    expect(truth.true).toBe(true);
    expect(truth.firstFalseRow).toBe('');
  });

  test('comes round false', () => {
    const rows = [
      '123', '213', '231', '132',
      '132', '123',
    ];
    const truth = getTruth(3, rows);

    expect(truth.comesRound).toBe(true);
    expect(truth.true).toBe(false);
    expect(truth.firstFalseRow).toBe('123');
  });

  test('does not come round true', () => {
    const rows = [
      '123', '213', '231', '321',
      '312', '132',
    ];
    const truth = getTruth(3, rows);

    expect(truth.comesRound).toBe(false);
    expect(truth.true).toBe(true);
    expect(truth.firstFalseRow).toBe('');
  });

  test('does not come round false', () => {
    const rows = [
      '123', '213', '231', '213',
      '231',
    ];
    const truth = getTruth(3, rows);

    expect(truth.comesRound).toBe(false);
    expect(truth.true).toBe(false);
    expect(truth.firstFalseRow).toBe('213');
  });

  test('multiple extents true', () => {
    const rows = [
      '123', '213', '231', '321',
      '312', '132', '123', '213',
      '231', '321', '312', '132',
      '123',
    ];
    const truth = getTruth(3, rows);

    expect(truth.comesRound).toBe(true);
    expect(truth.true).toBe(true);
    expect(truth.firstFalseRow).toBe('');
  });

  test('multiple extents false', () => {
    const rows = [
      '123', '213', '231', '321',
      '312', '132', '123', '213',
      '231', '321', '321', '132',
      '123',
    ];
    const truth = getTruth(3, rows);

    expect(truth.comesRound).toBe(true);
    expect(truth.true).toBe(false);
    expect(truth.firstFalseRow).toBe('321');
  });
});

describe('get place notation', () => {
  const method: Method = newMethod({
    id: 0,
    abbreviation: 't',
    name: 'test',
    stage: 8,
    placeNotation: '-18-18-18-18,12',
  });
  const call: Call = newCall({
    abbreviation: 'b',
    name: 'bob',
    stage: 8,
    leadEndPlaceNotation: '14',
    halfLeadPlaceNotation: '58',
  });

  test('plain method no call', () => {
    const testMethod: Method = { ...method, placeNotation: '-18-18-18-18' };
    const [notation, callIndex] = getPlaceNotation(false, false, testMethod, plainCall);
    expect(notation).toStrictEqual([
      '-', '18', '-', '18', '-', '18', '-', '18',
    ]);
    expect(callIndex).toBe(7);
  });

  test('plain method with call', () => {
    const testMethod: Method = { ...method, placeNotation: '-18-18-18-18' };
    const [notation, callIndex] = getPlaceNotation(false, false, testMethod, call);
    expect(notation).toStrictEqual([
      '-', '18', '-', '18', '-', '18', '-', '14',
    ]);
    expect(callIndex).toBe(6);
  });

  test('plain method with multi blow call', () => {
    const testMethod: Method = { ...method, placeNotation: '-18-18-18-18' };
    const testCall: Call = { ...call, leadEndPlaceNotation: '14-14' };

    const [notation, callIndex] = getPlaceNotation(false, false, testMethod, testCall);
    expect(notation).toStrictEqual([
      '-', '18', '-', '18', '-', '14', '-', '14',
    ]);
    expect(callIndex).toBe(4);
  });

  test('symmetric method no call', () => {
    const [notation, callIndex] = getPlaceNotation(false, false, method, plainCall);
    expect(notation).toStrictEqual([
      '-', '18', '-', '18', '-', '18', '-', '18',
      '-', '18', '-', '18', '-', '18', '-', '12',
    ]);
    expect(callIndex).toBe(15);
  });

  test('symmetric method with call', () => {
    const [notation, callIndex] = getPlaceNotation(false, false, method, call);
    expect(notation).toStrictEqual([
      '-', '18', '-', '18', '-', '18', '-', '18',
      '-', '18', '-', '18', '-', '18', '-', '14',
    ]);
    expect(callIndex).toBe(14);
  });

  test('symmetric method with multi blow call', () => {
    const testCall: Call = { ...call, leadEndPlaceNotation: '14-14' };

    const [notation, callIndex] = getPlaceNotation(false, false, method, testCall);
    expect(notation).toStrictEqual([
      '-', '18', '-', '18', '-', '18', '-', '18',
      '-', '18', '-', '18', '-', '14', '-', '14',
    ]);
    expect(callIndex).toBe(12);
  });

  test('front symmetric method no call', () => {
    const testMethod: Method = { ...method, placeNotation: '12,-18-18' };
    const [notation, callIndex] = getPlaceNotation(false, false, testMethod, plainCall);
    expect(notation).toStrictEqual([
      '12', '-', '18', '-', '18', '-', '18', '-',
    ]);
    expect(callIndex).toBe(7);
  });

  test('front symmetric method with call', () => {
    const testMethod: Method = { ...method, placeNotation: '12,-18-18' };
    const [notation, callIndex] = getPlaceNotation(false, false, testMethod, call);
    expect(notation).toStrictEqual([
      '12', '-', '18', '-', '18', '-', '18', '14',
    ]);
    expect(callIndex).toBe(6);
  });

  test('front symmetric method with multi blow call', () => {
    const testMethod: Method = { ...method, placeNotation: '12,-18-18' };
    const testCall: Call = { ...call, leadEndPlaceNotation: '14-14' };

    const [notation, callIndex] = getPlaceNotation(false, false, testMethod, testCall);
    expect(notation).toStrictEqual([
      '12', '-', '18', '-', '18', '14', '-', '14',
    ]);
    expect(callIndex).toBe(4);
  });

  test('first half lead - plain method no call', () => {
    const testMethod: Method = { ...method, placeNotation: '-12-18-14-18' };
    const [notation, callIndex] = getPlaceNotation(true, true, testMethod, plainCall);
    expect(notation).toStrictEqual([
      '-', '12', '-', '18',
    ]);
    expect(callIndex).toBe(3);
  });

  test('first half lead - plain method with call', () => {
    const testMethod: Method = { ...method, placeNotation: '-12-18-14-18' };
    const [notation, callIndex] = getPlaceNotation(true, true, testMethod, call);
    expect(notation).toStrictEqual([
      '-', '12', '-', '58',
    ]);
    expect(callIndex).toBe(2);
  });

  test('first half lead - plain method with multi blow call', () => {
    const testMethod: Method = { ...method, placeNotation: '-12-18-14-18' };
    const testCall: Call = { ...call, halfLeadPlaceNotation: '58-58' };

    const [notation, callIndex] = getPlaceNotation(true, true, testMethod, testCall);
    expect(notation).toStrictEqual([
      '-', '58', '-', '58',
    ]);
    expect(callIndex).toBe(0);
  });

  test('second half lead - plain method no call', () => {
    const testMethod: Method = { ...method, placeNotation: '-12-18-14-18' };
    const [notation, callIndex] = getPlaceNotation(true, false, testMethod, plainCall);
    expect(notation).toStrictEqual([
      '-', '14', '-', '18',
    ]);
    expect(callIndex).toBe(3);
  });

  test('second half lead - plain method with call', () => {
    const testMethod: Method = { ...method, placeNotation: '-12-18-14-18' };
    const [notation, callIndex] = getPlaceNotation(true, false, testMethod, call);
    expect(notation).toStrictEqual([
      '-', '14', '-', '14',
    ]);
    expect(callIndex).toBe(2);
  });

  test('second half lead - plain method with multi blow call', () => {
    const testMethod: Method = { ...method, placeNotation: '-12-18-14-18' };
    const testCall: Call = { ...call, leadEndPlaceNotation: '16-14' };

    const [notation, callIndex] = getPlaceNotation(true, false, testMethod, testCall);
    expect(notation).toStrictEqual([
      '-', '16', '-', '14',
    ]);
    expect(callIndex).toBe(0);
  });
});
