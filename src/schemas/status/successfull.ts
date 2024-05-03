import { SUCCESS_STATUS } from '#status/success';
import { createEnum } from '@bemedev/zod-extended';

export const successfullStatusSchema = createEnum(...SUCCESS_STATUS);
