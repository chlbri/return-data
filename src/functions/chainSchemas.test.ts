import { partialCall } from '@bemedev/usefull-functions';
import { createTests as create } from '@bemedev/vitest-extended';
import { describe } from 'vitest';
import { z } from 'zod';
import { chainSchemas } from './chainSchemas';

const createTests = <O, T = O>(value: T) => {
  const fn = partialCall(chainSchemas<O, T>, value);

  const useTests = create(fn);
  return useTests;
};

describe('#1 => For string values ("chlbri.blac@bemedev.com")', () => {
  const data = 'chlbri.blac@bemedev.com';
  const useTests = createTests<string>(data);

  useTests(
    ['simple (string) => true', [z.string()], { success: true, data }],
    [
      'email => true',
      [z.string(), z.string().email()],
      { success: true, data },
    ],
    [
      'url => false',
      [z.string(), z.string().url()],
      {
        success: false,
        error: new z.ZodError([
          {
            validation: 'url',
            code: 'invalid_string',
            message: 'Invalid url',
            path: [],
          },
        ]),
      },
    ],
  );
});

describe('#2 => For number values (44)', () => {
  const data = 44;
  const useTests = createTests<number>(data);

  useTests(
    ['simple (number) => true', [z.number()], { success: true, data }],
    [
      '> 5 => true',
      [z.number(), z.number().min(5)],
      { success: true, data },
    ],
    [
      '< 5 => false',
      [z.number(), z.number().max(5), z.literal(44)],
      {
        success: false,
        error: new z.ZodError([
          {
            code: 'too_big',
            maximum: 5,
            type: 'number',
            inclusive: true,
            exact: false,
            message: 'Number must be less than or equal to 5',
            path: [],
          },
        ]),
      },
    ],
  );
});

describe('#3 => For boolean values : (true)', () => {
  const data = true;
  const useTests = createTests<boolean>(data);
  const message = 'Required false, but find true';

  useTests(
    ['simple (boolean) => true', [z.boolean()], { success: true, data }],
    [
      'true => true',
      [z.boolean(), z.boolean().refine(arg => arg === true)],
      { success: true, data },
    ],
    [
      'false => false',
      [z.boolean(), z.boolean().refine(arg => arg === false, message)],
      {
        success: false,
        error: new z.ZodError([
          {
            code: 'custom',
            message,
            path: [],
          },
        ]),
      },
    ],
  );
});
