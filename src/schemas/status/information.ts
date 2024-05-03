import { INFORMATION_STATUS } from '#status/information';
import { createEnum } from '@bemedev/zod-extended';

export const informationStatusSchema = createEnum(...INFORMATION_STATUS);
