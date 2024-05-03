import { z } from 'zod';
import { clientErrorStatusSchema } from './client.js';
import { informationStatusSchema } from './information.js';
import { permissionStatusSchema } from './permission.js';
import { redirectStatusSchema } from './redirect.js';
import { serverErrorStatusSchema } from './server.js';
import { successfullStatusSchema } from './successfull.js';
import { timeoutErrorStatusSchema } from './timeout.js';

const statusSchema = z.union([
    clientErrorStatusSchema,
    informationStatusSchema,
    permissionStatusSchema,
    redirectStatusSchema,
    serverErrorStatusSchema,
    successfullStatusSchema,
    timeoutErrorStatusSchema,
]);

export { clientErrorStatusSchema, informationStatusSchema, permissionStatusSchema, redirectStatusSchema, serverErrorStatusSchema, statusSchema, successfullStatusSchema, timeoutErrorStatusSchema };
//# sourceMappingURL=index.js.map
