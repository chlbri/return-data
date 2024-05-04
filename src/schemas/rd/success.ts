import { z } from 'zod';
import { successStatusSchema } from '../status/successfull';

export const successSchema = <T extends z.ZodTypeAny>(payload: T) =>
  z.object({
    status: successStatusSchema,
    payload: payload.optional(),
  });
