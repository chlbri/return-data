'use strict';

var zodExtended = require('@bemedev/zod-extended');
var constants_status_client = require('../../constants/status/client.cjs');

const clientErrorStatusSchema = zodExtended.createEnum(...constants_status_client.CLIENT_ERROR_STATUS);

exports.clientErrorStatusSchema = clientErrorStatusSchema;
//# sourceMappingURL=client.cjs.map
