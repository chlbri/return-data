import { createZodTests } from '#fixtures/zod';
import { z } from 'zod';
import { successSchema } from './success';

const useTests = createZodTests(
  successSchema(z.number().int().gte(1).lte(100)),
);

useTests(
  [
    'Success with payload 0, not in (1 - 100) => false',
    [{ status: 200, payload: 0 }],
    false,
  ],
  [
    'Success with payload 1, in (1 - 100) => true',
    [{ status: 203, payload: 1 }],
    true,
  ],
);
