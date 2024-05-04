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

export { clientErrorStatusSchema, informationStatusSchema, permissionStatusSchema, redirectStatusSchema, serverErrorStatusSchema, statusSchema, successStatusSchema as successfullStatusSchema, timeoutErrorStatusSchema };
//# sourceMappingURL=index.js.map
