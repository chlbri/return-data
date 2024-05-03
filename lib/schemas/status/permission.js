import { PERMISSION_ERROR_STATUS } from '../../constants/status/permission.js';
import { createEnum } from '@bemedev/zod-extended';

const permissionStatusSchema = createEnum(...PERMISSION_ERROR_STATUS);

export { permissionStatusSchema as default, permissionStatusSchema };
//# sourceMappingURL=permission.js.map
