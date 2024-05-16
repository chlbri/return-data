import type { ReturnDataObject, Status } from '#typings';
import { createTests } from '@bemedev/vitest-extended';
import { TestArgs } from '@bemedev/vitest-extended/lib/types';

type Ro = ReturnDataObject<any, any>;

type Args<S extends Status> = [
  array: {
    readonly [key in S]: Ro;
  },
  f: (arg: Ro) => boolean,
];

export const createConstantTests = <S extends Status>(
  ...[array, f]: Args<S>
) => {
  type F = Args<S>[1];
  const useTests = createTests(f);
  const cases: TestArgs<F> = [];

  const entries = Object.entries(array) as [string, Ro][];
  entries.forEach(([key, value]) => {
    cases.push([key, [value], true]);
  });

  return () => useTests(...cases);
};
