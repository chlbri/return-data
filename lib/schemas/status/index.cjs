'use strict';

var zod = require('zod');
var schemas_status_client = require('./client.cjs');
var schemas_status_information = require('./information.cjs');
var schemas_status_permission = require('./permission.cjs');
var schemas_status_redirect = require('./redirect.cjs');
var schemas_status_server = require('./server.cjs');
var schemas_status_successfull = require('./successfull.cjs');
var schemas_status_timeout = require('./timeout.cjs');

const statusSchema = zod.z.union([
    schemas_status_client.clientErrorStatusSchema,
    schemas_status_information.informationStatusSchema,
    schemas_status_permission.permissionStatusSchema,
    schemas_status_redirect.redirectStatusSchema,
    schemas_status_server.serverErrorStatusSchema,
    schemas_status_successfull.successStatusSchema,
    schemas_status_timeout.timeoutErrorStatusSchema,
]);

exports.clientErrorStatusSchema = schemas_status_client.clientErrorStatusSchema;
exports.informationStatusSchema = schemas_status_information.informationStatusSchema;
exports.permissionStatusSchema = schemas_status_permission.permissionStatusSchema;
exports.redirectStatusSchema = schemas_status_redirect.redirectStatusSchema;
exports.serverErrorStatusSchema = schemas_status_server.serverErrorStatusSchema;
exports.successfullStatusSchema = schemas_status_successfull.successStatusSchema;
exports.timeoutErrorStatusSchema = schemas_status_timeout.timeoutErrorStatusSchema;
exports.statusSchema = statusSchema;
//# sourceMappingURL=index.cjs.map
