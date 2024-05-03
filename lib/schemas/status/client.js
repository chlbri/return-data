import { createEnum } from '@bemedev/zod-extended';
import { CLIENT_ERROR_STATUS } from '../../constants/status/client.js';

const clientErrorStatusSchema = createEnum(...CLIENT_ERROR_STATUS);

export { clientErrorStatusSchema };
//# sourceMappingURL=client.js.map
