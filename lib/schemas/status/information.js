import { INFORMATION_STATUS } from '../../constants/status/information.js';
import { createEnum } from '@bemedev/zod-extended';

const informationStatusSchema = createEnum(...INFORMATION_STATUS);

export { informationStatusSchema };
//# sourceMappingURL=information.js.map
