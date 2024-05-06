'use strict';

var zod = require('zod');
var schemas_status_client = require('./client.cjs');
var schemas_status_information = require('./information.cjs');
var schemas_status_permission = require('./permission.cjs');
var schemas_status_redirect = require('./redirect.cjs');
var schemas_status_server = require('./server.cjs');
var schemas_status_success = require('./success.cjs');
var schemas_status_timeout = require('./timeout.cjs');

const statusSchema = zod.z.union([
    schemas_status_client.clientErrorStatusSchema,
    schemas_status_information.informationStatusSchema,
    schemas_status_permission.permissionStatusSchema,
    schemas_status_redirect.redirectStatusSchema,
    schemas_status_server.serverErrorStatusSchema,
    schemas_status_success.successStatusSchema,
    schemas_status_timeout.timeoutErrorStatusSchema,
]);
const STATUS_CHECKERS = {
    client: schemas_status_client.clientErrorStatusSchema,
    information: schemas_status_information.informationStatusSchema,
    permission: schemas_status_permission.permissionStatusSchema,
    redirect: schemas_status_redirect.redirectStatusSchema,
    server: schemas_status_server.serverErrorStatusSchema,
    success: schemas_status_success.successStatusSchema,
    timeout: schemas_status_timeout.timeoutErrorStatusSchema,
};

exports.clientErrorStatusSchema = schemas_status_client.clientErrorStatusSchema;
exports.informationStatusSchema = schemas_status_information.informationStatusSchema;
exports.permissionStatusSchema = schemas_status_permission.permissionStatusSchema;
exports.redirectStatusSchema = schemas_status_redirect.redirectStatusSchema;
exports.serverErrorStatusSchema = schemas_status_server.serverErrorStatusSchema;
exports.successStatusSchema = schemas_status_success.successStatusSchema;
exports.timeoutErrorStatusSchema = schemas_status_timeout.timeoutErrorStatusSchema;
exports.STATUS_CHECKERS = STATUS_CHECKERS;
exports.statusSchema = statusSchema;
//# sourceMappingURL=index.cjs.map
