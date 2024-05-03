import { SERVER_ERROR_STATUS } from '../../constants/status/server.js';
import { createEnum } from '@bemedev/zod-extended';

const serverErrorStatusSchema = createEnum(...SERVER_ERROR_STATUS);

export { serverErrorStatusSchema };
//# sourceMappingURL=server.js.map
