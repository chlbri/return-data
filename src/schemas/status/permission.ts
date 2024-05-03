import { PERMISSION_ERROR_STATUS } from '#status/permission';
import { createEnum } from '@bemedev/zod-extended';
import type {} from 'zod';

export const permissionStatusSchema = createEnum(
  ...PERMISSION_ERROR_STATUS,
);

