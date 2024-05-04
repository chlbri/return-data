import { successStatusSchema } from '#schemas/status/success';
import { z } from 'zod';

const _any = z
  .object({
    status: successStatusSchema,
    payload: z.any(),
  })
  .strict();

export function successSchema<T extends readonly []>(
  ...payload: T
): typeof _any;

export function successSchema<T extends readonly [z.ZodTypeAny]>(
  ...payload: T
): z.ZodObject<{
  status: typeof successStatusSchema;
  payload: T[0];
}>;

export function successSchema<
  T extends readonly [z.ZodTypeAny] | readonly [],
>(...payload: T) {
  if (payload.length === 1)
    return z
      .object({
        status: successStatusSchema,
        payload: payload[0],
      })
      .strict();

  return _any;
}
