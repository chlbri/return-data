import { z } from 'zod';
import './schemas/status/index.js';
import { clientErrorStatusSchema } from './schemas/status/client.js';
import { informationStatusSchema } from './schemas/status/information.js';
import { permissionStatusSchema } from './schemas/status/permission.js';
import { redirectStatusSchema } from './schemas/status/redirect.js';
import { serverErrorStatusSchema } from './schemas/status/server.js';
import { successStatusSchema } from './schemas/status/successfull.js';
import { timeoutErrorStatusSchema } from './schemas/status/timeout.js';

function isPrimitive(val) {
    return (val instanceof z.ZodNumber ||
        val instanceof z.ZodString ||
        val instanceof z.ZodBoolean ||
        val instanceof z.ZodUndefined ||
        val instanceof z.ZodArray ||
        val instanceof z.ZodDate);
}
function chainSchemas(value, ...schemas) {
    if (!schemas[0])
        return { success: true, data: value };
    const firstSchema = schemas[0];
    let out = firstSchema.safeParse(value);
    const _schemas = schemas.slice(1);
    for (const schema of _schemas) {
        if (out.success) {
            return out;
        }
        out = schema.safeParse(value);
    }
    return out;
}
// #region Checkers
function isClientError(arg) {
    return clientErrorStatusSchema.safeParse(arg.status).success;
}
function isInformation(arg) {
    return informationStatusSchema.safeParse(arg.status).success;
}
function isPermission(arg) {
    return permissionStatusSchema.safeParse(arg.status).success;
}
function isRedirect(arg) {
    return redirectStatusSchema.safeParse(arg.status).success;
}
function isServer(arg) {
    return serverErrorStatusSchema.safeParse(arg.status).success;
}
function isSuccess(arg) {
    return successStatusSchema.safeParse(arg.status).success;
}
function isTimeout(arg) {
    return timeoutErrorStatusSchema.safeParse(arg.status).success;
}
// #endregion

export { chainSchemas, isClientError, isInformation, isPermission, isPrimitive, isRedirect, isServer, isSuccess, isTimeout };
//# sourceMappingURL=functions.js.map
