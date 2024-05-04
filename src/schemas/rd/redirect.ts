import { redirectStatusSchema } from '#schemas/status/redirect';
import { z } from 'zod';
import { messages } from './helpers';

const _any = z
  .object({
    status: redirectStatusSchema,
    payload: z.any().optional(),
    messages,
  })
  .strict();

export function redirectSchema<T extends readonly []>(
  ...payload: T
): typeof _any;

export function redirectSchema<T extends readonly [z.ZodTypeAny]>(
  ...payload: T
): z.ZodObject<{
  status: typeof redirectStatusSchema;
  payload: z.ZodOptional<T[0]>;
  messages: typeof messages;
}>;

export function redirectSchema<
  T extends readonly [z.ZodTypeAny] | readonly [],
>(...payload: T) {
  if (payload.length === 1)
    return z
      .object({
        status: redirectStatusSchema,
        payload: payload[0].optional(),
        messages,
      })
      .strict();

  return _any;
}
