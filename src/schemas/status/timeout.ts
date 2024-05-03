import { TIMEOUT_ERROR_STATUS } from '#status/timeout';
import { createEnum } from '@bemedev/zod-extended';

export const timeoutErrorStatusSchema = createEnum(
  ...TIMEOUT_ERROR_STATUS,
);
