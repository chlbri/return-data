"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimeoutD = exports.isSuccessD = exports.isServerD = exports.isRedirectD = exports.isPermissionD = exports.isInformationD = exports.isClientErrorD = exports.chainSchemas = exports.isPrimitive = void 0;
const zod_1 = require("zod");
const status_1 = require("./schemas/status");
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
        return value;
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
function isClientErrorD(arg) {
    return status_1.clientErrorStatusSchema.safeParse(arg.status).success;
}
exports.isClientErrorD = isClientErrorD;
function isInformationD(arg) {
    return status_1.informationStatusSchema.safeParse(arg.status).success;
}
exports.isInformationD = isInformationD;
function isPermissionD(arg) {
    return status_1.permissionStatusSchema.safeParse(arg.status).success;
}
exports.isPermissionD = isPermissionD;
function isRedirectD(arg) {
    return status_1.redirectStatusSchema.safeParse(arg.status).success;
}
exports.isRedirectD = isRedirectD;
function isServerD(arg) {
    return status_1.successfullStatusSchema.safeParse(arg.status).success;
}
exports.isServerD = isServerD;
function isSuccessD(arg) {
    return status_1.serverErrorStatusSchema.safeParse(arg.status).success;
}
exports.isSuccessD = isSuccessD;
function isTimeoutD(arg) {
    return status_1.timeoutErrorStatusSchema.safeParse(arg.status).success;
}
exports.isTimeoutD = isTimeoutD;
