'use strict';

var constants_status_information = require('../../constants/status/information.cjs');
var zodExtended = require('@bemedev/zod-extended');

const informationStatusSchema = zodExtended.createEnum(...constants_status_information.INFORMATION_STATUS);

exports.informationStatusSchema = informationStatusSchema;
//# sourceMappingURL=information.cjs.map
