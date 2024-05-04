'use strict';

var constants_status_success = require('../../constants/status/success.cjs');
var zodExtended = require('@bemedev/zod-extended');

const successStatusSchema = zodExtended.createEnum(...constants_status_success.SUCCESS_STATUS);

exports.successStatusSchema = successStatusSchema;
//# sourceMappingURL=successfull.cjs.map
