import { CLIENT_ERROR_STATUS } from '#status/client';
import { createEnum } from '@bemedev/zod-extended';

export const clientErrorStatusSchema = createEnum(...CLIENT_ERROR_STATUS);
