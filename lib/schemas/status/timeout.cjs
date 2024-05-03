'use strict';

var constants_status_timeout = require('../../constants/status/timeout.cjs');
var zodExtended = require('@bemedev/zod-extended');

const timeoutErrorStatusSchema = zodExtended.createEnum(...constants_status_timeout.TIMEOUT_ERROR_STATUS);

exports.timeoutErrorStatusSchema = timeoutErrorStatusSchema;
//# sourceMappingURL=timeout.cjs.map
