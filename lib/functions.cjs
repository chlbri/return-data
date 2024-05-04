'use strict';

var zod = require('zod');
require('./schemas/status/index.cjs');
var schemas_status_client = require('./schemas/status/client.cjs');
var schemas_status_information = require('./schemas/status/information.cjs');
var schemas_status_permission = require('./schemas/status/permission.cjs');
var schemas_status_redirect = require('./schemas/status/redirect.cjs');
var schemas_status_server = require('./schemas/status/server.cjs');
var schemas_status_successfull = require('./schemas/status/successfull.cjs');
var schemas_status_timeout = require('./schemas/status/timeout.cjs');

function isPrimitive(val) {
    return (val instanceof zod.z.ZodNumber ||
        val instanceof zod.z.ZodString ||
        val instanceof zod.z.ZodBoolean ||
        val instanceof zod.z.ZodUndefined ||
        val instanceof zod.z.ZodArray ||
        val instanceof zod.z.ZodDate);
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
    return schemas_status_client.clientErrorStatusSchema.safeParse(arg.status).success;
}
function isInformation(arg) {
    return schemas_status_information.informationStatusSchema.safeParse(arg.status).success;
}
function isPermission(arg) {
    return schemas_status_permission.permissionStatusSchema.safeParse(arg.status).success;
}
function isRedirect(arg) {
    return schemas_status_redirect.redirectStatusSchema.safeParse(arg.status).success;
}
function isServer(arg) {
    return schemas_status_server.serverErrorStatusSchema.safeParse(arg.status).success;
}
function isSuccess(arg) {
    return schemas_status_successfull.successStatusSchema.safeParse(arg.status).success;
}
function isTimeout(arg) {
    return schemas_status_timeout.timeoutErrorStatusSchema.safeParse(arg.status).success;
}
// #endregion

exports.chainSchemas = chainSchemas;
exports.isClientError = isClientError;
exports.isInformation = isInformation;
exports.isPermission = isPermission;
exports.isPrimitive = isPrimitive;
exports.isRedirect = isRedirect;
exports.isServer = isServer;
exports.isSuccess = isSuccess;
exports.isTimeout = isTimeout;
//# sourceMappingURL=functions.cjs.map
