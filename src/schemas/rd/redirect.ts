import { z } from 'zod';
import { redirectStatusSchema } from '../status/redirect';
import { messages } from './helpers';

export function redirectSchema<T extends z.ZodTypeAny>(payload: T) {
  return z.object({
    status: redirectStatusSchema,
    payload: payload.optional(),
    messages,
  });
}
