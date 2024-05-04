import { z } from 'zod';
import { serverErrorStatusSchema } from '../status/server';
import { messages } from './helpers';

export const serverErrorSchema = z.object({
  status: serverErrorStatusSchema,
  messages,
});
