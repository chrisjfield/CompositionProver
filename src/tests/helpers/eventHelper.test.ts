import getTypedValue from '../../helpers/eventHelper';

describe('get event value', () => {
  test('get numberic value', () => {
    const event = { target: { type: 'number', value: '5' } } as React.ChangeEvent<HTMLInputElement>;

    expect(getTypedValue(event)).toBe(5);
  });

  test('get checkbox value', () => {
    const event = { target: { type: 'checkbox', checked: true } } as React.ChangeEvent<HTMLInputElement>;

    expect(getTypedValue(event)).toBe(true);
  });

  test('get string value', () => {
    const event = { target: { type: 'string', value: 'test' } } as React.ChangeEvent<HTMLInputElement>;

    expect(getTypedValue(event)).toBe('test');
  });
});
