import { z } from 'zod';

export const messages = z.string().array().optional();
