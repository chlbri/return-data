import { REDIRECT_STATUS } from '../../constants/status/redirect.js';
import { createEnum } from '@bemedev/zod-extended';

const redirectStatusSchema = createEnum(...REDIRECT_STATUS);

export { redirectStatusSchema as default, redirectStatusSchema };
//# sourceMappingURL=redirect.js.map
