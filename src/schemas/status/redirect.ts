import { REDIRECT_STATUS } from '#status/redirect';
import { createEnum } from '@bemedev/zod-extended';

export const redirectStatusSchema = createEnum(...REDIRECT_STATUS);

