import { z } from 'zod';
import { clientErrorStatusSchema } from './client.js';
import { informationStatusSchema } from './information.js';
import { permissionStatusSchema } from './permission.js';
import { redirectStatusSchema } from './redirect.js';
import { serverErrorStatusSchema } from './server.js';
import { successStatusSchema } from './success.js';
import { timeoutErrorStatusSchema } from './timeout.js';

const statusSchema = z.union([
    clientErrorStatusSchema,
    informationStatusSchema,
    permissionStatusSchema,
    redirectStatusSchema,
    serverErrorStatusSchema,
    successStatusSchema,
    timeoutErrorStatusSchema,
]);
const STATUS_CHECKERS = {
    client: clientErrorStatusSchema,
    information: informationStatusSchema,
    permission: permissionStatusSchema,
    redirect: redirectStatusSchema,
    server: serverErrorStatusSchema,
    success: successStatusSchema,
    timeout: timeoutErrorStatusSchema,
};

export { STATUS_CHECKERS, clientErrorStatusSchema, informationStatusSchema, permissionStatusSchema, redirectStatusSchema, serverErrorStatusSchema, statusSchema, successStatusSchema, timeoutErrorStatusSchema };
//# sourceMappingURL=index.js.map
