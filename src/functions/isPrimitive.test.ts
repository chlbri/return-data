import { createTests } from '@bemedev/vitest-extended';
import { z } from 'zod';
import { isPrimitive } from './isPrimitive';

const useTests = createTests(isPrimitive);

useTests(
  ['number matches', [z.number().min(7)], true],
  ['string matches', [z.string().email()], true],
  ['boolean matches', [z.boolean()], true],
  ['undefined matches', [z.undefined()], true],
  ['null matches', [z.null()], true],
  [
    "object doesn't match",
    [
      z.object({
        age: z.number().max(200),
        name: z.string().min(2),
      }),
    ],
    false,
  ],
  ["date doesn't match", [z.date()], false],
);
