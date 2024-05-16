import { permissionStatusSchema } from '#schemas/status/permission';
import type { ReturnKeys } from '#types';
import { zodObjectKeys } from '@bemedev/zod-extended';
import { z } from 'zod';
import { messages } from './helpers';

const _any = z
  .object({
    status: permissionStatusSchema,
    payload: z.any().optional(),
    notPermitteds: z.record(z.string(), z.number()).optional(),
    messages,
  })
  .strict();

type Perm<T> = z.ZodOptional<
  z.ZodRecord<
    T extends z.AnyZodObject ? z.ZodEnum<ReturnKeys<T>> : z.ZodString,
    z.ZodNumber
  >
>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore work
export function permissionSchema<T extends readonly []>(
  ...payload: T
): typeof _any;

export function permissionSchema<T extends readonly [z.ZodTypeAny]>(
  ...payload: T
): z.ZodObject<{
  status: typeof permissionStatusSchema;
  payload: z.ZodOptional<T[0]>;
  notPermitteds: Perm<T[0]>;
  messages: typeof messages;
}>;

export function permissionSchema<
  T extends readonly [z.ZodTypeAny] | readonly [],
>(...payload: T) {
  if (payload.length === 1) {
    const payload1 = payload[0] as z.AnyZodObject;
    const f = zodObjectKeys as any;

    const keys = f(payload1);
    const checkObject = payload1 instanceof z.ZodObject;
    const enumKeys = checkObject ? z.enum(keys) : z.string();

    const notPermitteds = z
      .record(enumKeys, z.number())
      .optional() as Perm<T[0]>;

    const out = z
      .object({
        status: permissionStatusSchema,
        payload: payload1.optional(),
        notPermitteds,
        messages,
      })
      .strict();
    return out;
  }

  return _any;
}
