import { serverErrorStatusSchema } from '#schemas/status/server';
import { z } from 'zod';
import { messages } from './helpers';

export const serverErrorSchema = z
  .object({
    status: serverErrorStatusSchema,
    messages,
  })
  .strict();
