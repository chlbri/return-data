import { ReturnData } from '#rd';
import { expect, test } from 'vitest';

const builtError = new ReturnData({ error: 'error' } as any);

test('#1 => Expect error from getting type of wrong RD', () => {
  const toTest = () => builtError.type;
  expect(toTest).toThrow('not reachable');
});
