import assertUnreachable from '../../helpers/contextHelper';

describe('assert unreachable', () => {
  test('error thrown', () => {
    expect(() => assertUnreachable('test' as never)).toThrow('Didn\'t expect to get here: test');
  });
});
