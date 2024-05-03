'use strict';

var constants_status_success = require('../../constants/status/success.cjs');
var zodExtended = require('@bemedev/zod-extended');

const successfullStatusSchema = zodExtended.createEnum(...constants_status_success.SUCCESS_STATUS);

exports.successfullStatusSchema = successfullStatusSchema;
//# sourceMappingURL=successfull.cjs.map
