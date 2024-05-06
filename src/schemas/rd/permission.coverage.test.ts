import { createZodTests } from '#fixtures/zod';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { permissionSchema } from './permission';

const useTests = createZodTests(
  permissionSchema(z.number().int().gte(1).lte(100)),
);

useTests(
  ['Empty payload => true', [{ status: 600 }], true],
  [
    'Permission with payload 0, not in (1 - 100) => false',
    [{ status: 603, payload: 0 }],
    false,
  ],
  [
    'Permission with payload 1, in (1 - 100) => true',
    [{ status: 603, payload: 1 }],
    true,
  ],
  [
    'Permission with messages => true',
    [{ status: 613, messages: ['new API comming soon'] }],
    true,
  ],
  [
    'Permission with messages and payload 0, not in (1 - 100) => false',
    [
      {
        status: 613,
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
  [
    'Permission with messages, two notPermitteds, and payload 24, in (1 - 100) => true',
    [
      {
        status: 613,
        payload: 24,
        messages: [
          'You are in a country no covering by our team',
          'Some services are not available',
          'Your language is not available, please use English',
        ],
        notPermitteds: [nanoid(), nanoid()],
      },
    ],
    true,
  ],
);
