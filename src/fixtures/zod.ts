import { createTests } from '@bemedev/vitest-extended';
import { z } from 'zod';

export const createZodTests = <Z extends z.ZodTypeAny>(zod: Z) => {
  const fn = (arg: z.infer<Z>) => zod.safeParse(arg).success;
  const useTests = createTests(fn);
  return useTests;
};
