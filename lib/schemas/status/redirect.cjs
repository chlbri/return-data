'use strict';

var constants_status_redirect = require('../../constants/status/redirect.cjs');
var zodExtended = require('@bemedev/zod-extended');

const redirectStatusSchema = zodExtended.createEnum(...constants_status_redirect.REDIRECT_STATUS);

exports.redirectStatusSchema = redirectStatusSchema;
//# sourceMappingURL=redirect.cjs.map
