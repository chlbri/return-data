"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimeout = exports.isSuccess = exports.isServer = exports.isRedirect = exports.isPermission = exports.isInformation = exports.isClientError = exports.chainSchemas = exports.isPrimitive = void 0;
const zod_1 = require("zod");
const schemas_1 = require("./schemas");
function isPrimitive(val) {
    return (val instanceof zod_1.ZodNumber ||
        val instanceof zod_1.ZodString ||
        val instanceof zod_1.ZodBoolean ||
        val instanceof zod_1.ZodUndefined ||
        val instanceof zod_1.ZodArray ||
        val instanceof zod_1.ZodDate);
}
exports.isPrimitive = isPrimitive;
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
exports.chainSchemas = chainSchemas;
function isClientError(arg) {
    return schemas_1.clientErrorStatusSchema.safeParse(arg.status).success;
}
exports.isClientError = isClientError;
function isInformation(arg) {
    return schemas_1.informationStatusSchema.safeParse(arg.status).success;
}
exports.isInformation = isInformation;
function isPermission(arg) {
    return schemas_1.permissionStatusSchema.safeParse(arg.status).success;
}
exports.isPermission = isPermission;
function isRedirect(arg) {
    return schemas_1.redirectStatusSchema.safeParse(arg.status).success;
}
exports.isRedirect = isRedirect;
function isServer(arg) {
    return schemas_1.serverErrorStatusSchema.safeParse(arg.status).success;
}
exports.isServer = isServer;
function isSuccess(arg) {
    return schemas_1.successfullStatusSchema.safeParse(arg.status).success;
}
exports.isSuccess = isSuccess;
function isTimeout(arg) {
    return schemas_1.timeoutErrorStatusSchema.safeParse(arg.status).success;
}
exports.isTimeout = isTimeout;
