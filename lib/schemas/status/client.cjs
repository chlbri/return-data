'use strict';

var constants_status_client = require('../../constants/status/client.cjs');
var zodExtended = require('@bemedev/zod-extended');

const clientErrorStatusSchema = zodExtended.createEnum(...constants_status_client.CLIENT_ERROR_STATUS);

exports.clientErrorStatusSchema = clientErrorStatusSchema;
//# sourceMappingURL=client.cjs.map
