import { CLIENT_ERROR_STATUS } from '../../constants/status/client.js';
import { createEnum } from '@bemedev/zod-extended';

const clientErrorStatusSchema = createEnum(...CLIENT_ERROR_STATUS);

export { clientErrorStatusSchema };
//# sourceMappingURL=client.js.map
