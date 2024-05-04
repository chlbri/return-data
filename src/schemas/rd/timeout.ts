import { timeoutErrorStatusSchema } from '#schemas/status/timeout';
import { z } from 'zod';

export const timeoutErrorSchema = z
  .object({
    status: timeoutErrorStatusSchema,
  })
  .strict();
