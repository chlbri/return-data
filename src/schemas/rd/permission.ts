import { z } from 'zod';
import { permissionStatusSchema } from '../status/permission';
import { messages } from './helpers';

const _any = z.object({
  status: permissionStatusSchema,
  payload: z.any().optional(),
  notPermitteds: messages,
  messages,
});

export function permissionSchema<T extends readonly []>(
  ...payload: T
): typeof _any;

export function permissionSchema<T extends readonly [z.ZodTypeAny]>(
  ...payload: T
): z.ZodObject<{
  status: typeof permissionStatusSchema;
  payload: z.ZodOptional<T[0]>;
  notPermitteds: typeof messages;
  messages: typeof messages;
}>;

export function permissionSchema<
  T extends readonly [z.ZodTypeAny] | readonly [],
>(...payload: T) {
  if (payload.length === 1)
    return z.object({
      status: permissionStatusSchema,
      payload: payload[0].optional() as T extends readonly [z.ZodTypeAny]
        ? z.ZodOptional<T[0]>
        : never,
      notPermitteds: messages,
      messages,
    });

  return _any;
}
