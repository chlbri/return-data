import { z } from 'zod';
import { informationStatusSchema } from '#schemas/status/information';
import { messages } from './helpers';

const _any = z
  .object({
    status: informationStatusSchema,
    payload: z.any().optional(),
    messages,
  })
  .strict();

export function informationSchema<T extends readonly []>(
  ...payload: T
): typeof _any;

export function informationSchema<T extends readonly [z.ZodTypeAny]>(
  ...payload: T
): z.ZodObject<{
  status: typeof informationStatusSchema;
  payload: z.ZodOptional<T[0]>;
  messages: typeof messages;
}>;

export function informationSchema<
  T extends readonly [z.ZodTypeAny] | readonly [],
>(...payload: T) {
  if (payload.length === 1) {
    return z
      .object({
        status: informationStatusSchema,
        payload: payload[0].optional(),
        messages,
      })
      .strict();
  }

  return _any;
}
