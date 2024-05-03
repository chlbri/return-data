import { SERVER_ERROR_STATUS } from '#status/server';
import { createEnum } from '@bemedev/zod-extended';

export const serverErrorStatusSchema = createEnum(...SERVER_ERROR_STATUS);
