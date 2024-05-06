import { createZodTests } from '#fixtures/zod';
import { z } from 'zod';
import { redirectSchema } from './redirect';

const useTests = createZodTests(
  redirectSchema(z.number().int().gte(1).lte(100)),
);

useTests(
  ['Empty payload => true', [{ status: 300 }], true],
  [
    'Redirect with payload 0, not in (1 - 100) => false',
    [{ status: 303, payload: 0 }],
    false,
  ],
  [
    'Redirect with payload 1, in (1 - 100) => true',
    [{ status: 303, payload: 1 }],
    true,
  ],
  [
    'Redirect with messages => true',
    [{ status: 347, messages: ['new API comming soon'] }],
    true,
  ],
  [
    'Redirect with messages and payload 0, not in (1 - 100) => false',
    [
      {
        status: 309,
        payload: 0,
        messages: [
          'You are in a country no covering by our team',
          'Some services are not available',
          'Your language is not available, please use English',
        ],
      },
    ],
    false,
  ],
);
