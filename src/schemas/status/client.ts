import { createEnum } from '@bemedev/zod-extended';
import { CLIENT_ERROR_STATUS } from '#status/client';

export const clientErrorStatusSchema = createEnum(...CLIENT_ERROR_STATUS);
