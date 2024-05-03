'use strict';

var constants_status_server = require('../../constants/status/server.cjs');
var zodExtended = require('@bemedev/zod-extended');

const serverErrorStatusSchema = zodExtended.createEnum(...constants_status_server.SERVER_ERROR_STATUS);

exports.serverErrorStatusSchema = serverErrorStatusSchema;
//# sourceMappingURL=server.cjs.map
