import { TIMEOUT_ERROR_STATUS } from '../../constants/status/timeout.js';
import { createEnum } from '@bemedev/zod-extended';

const timeoutErrorStatusSchema = createEnum(...TIMEOUT_ERROR_STATUS);

export { timeoutErrorStatusSchema };
//# sourceMappingURL=timeout.js.map
