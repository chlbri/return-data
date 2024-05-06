import { createZodTests } from '#fixtures/zod';
import { z } from 'zod';
import { informationSchema } from './information';

const useTests = createZodTests(
  informationSchema(z.number().int().gte(1).lte(100)),
);

useTests(
  ['Empty payload information => true', [{ status: 100 }], true],
  [
    'Information with payload 0, not in (1 - 100) => false',
    [{ status: 103, payload: 0 }],
    false,
  ],
  [
    'Information with payload 1, in (1 - 100) => true',
    [{ status: 103, payload: 1 }],
    true,
  ],
  [
    'Information with messages => true',
    [{ status: 113, messages: ['new API comming soon'] }],
    true,
  ],
  [
    'Information with messages and payload 0, not in (1 - 100) => false',
    [
      {
        status: 113,
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
