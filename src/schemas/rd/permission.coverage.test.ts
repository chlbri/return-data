import { createZodTests } from '#fixtures/zod';
import { nanoid } from 'nanoid';
import { describe } from 'vitest';
import { z } from 'zod';
import { permissionSchema } from './permission';

describe('#1 => Numbers', () => {
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
      'Permission with messages, multi not well-formated notPermitteds, and payload 24, in (1 - 100) => true',
      [
        {
          status: 613,
          payload: 24,
          messages: [
            'You are in a country no covering by our team',
            'Some services are not available',
            'Your language is not available, please use English',
          ],
          /**
           * Multiples strings with unknown
           */
          notPermitteds: {
            [nanoid()]: 229,
            [nanoid()]: 29,
            [nanoid()]: 729,
            [nanoid()]: 9,
            [nanoid()]: 11,
            [nanoid()]: 7,
          },
        },
      ],
      true,
    ],
  );
});

describe('#2 => Objects', () => {
  const useTests = createZodTests(
    permissionSchema(z.object({ age: z.number().int().gte(1).lte(100) })),
  );
  useTests(
    ['Empty payload => true', [{ status: 600 }], true],
    [
      'Permission with payload 0, not in (1 - 100) => false',
      [{ status: 603, payload: { age: 0 } }],
      false,
    ],
    [
      'Permission with payload 1, in (1 - 100) => true',
      [{ status: 603, payload: { age: 1 } }],
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
          payload: { age: 0 },
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
      'Permission with messages, multi well-formatted notPermitteds, and payload 24, in (1 - 100) => true',
      [
        {
          status: 613,
          payload: { age: 24 },
          messages: [
            'You are in a country no covering by our team',
            'Some services are not available',
            'Your language is not available, please use English',
          ],
          notPermitteds: {
            age: 229,
          },
        },
      ],
      true,
    ],
  );
});
