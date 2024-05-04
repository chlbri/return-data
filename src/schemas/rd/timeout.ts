import { z } from 'zod';
import { timeoutErrorStatusSchema } from '../status/timeout';

export const timeoutErrorSchema = z.object({
  status: timeoutErrorStatusSchema,
});
