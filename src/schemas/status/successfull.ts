import { SUCCESS_STATUS } from '#status/success';
import { createEnum } from '@bemedev/zod-extended';

export const successStatusSchema = createEnum(...SUCCESS_STATUS);
