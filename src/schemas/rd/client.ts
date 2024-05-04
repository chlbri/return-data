import { clientErrorStatusSchema } from '#schemas/status/client';
import { z } from 'zod';
import { messages } from './helpers';

export const clientErrorSchema = z
  .object({
    status: clientErrorStatusSchema,
    messages,
  })
  .strict();
