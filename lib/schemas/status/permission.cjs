'use strict';

var constants_status_permission = require('../../constants/status/permission.cjs');
var zodExtended = require('@bemedev/zod-extended');

const permissionStatusSchema = zodExtended.createEnum(...constants_status_permission.PERMISSION_ERROR_STATUS);

exports.permissionStatusSchema = permissionStatusSchema;
//# sourceMappingURL=permission.cjs.map
