import { z } from 'zod';
import { clientErrorStatusSchema } from '../status/client';
import { messages } from './helpers';

export const clientErrorSchema = z.object({
  status: clientErrorStatusSchema,
  messages,
});
