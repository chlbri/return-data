'use strict';

var constants_status_client = require('./client.cjs');
var constants_status_information = require('./information.cjs');
var constants_status_permission = require('./permission.cjs');
var constants_status_redirect = require('./redirect.cjs');
var constants_status_server = require('./server.cjs');
var constants_status_success = require('./success.cjs');
var constants_status_timeout = require('./timeout.cjs');

const STATUS = [
    ...constants_status_client.CLIENT_ERROR_STATUS,
    ...constants_status_information.INFORMATION_STATUS,
    ...constants_status_permission.PERMISSION_ERROR_STATUS,
    ...constants_status_redirect.REDIRECT_STATUS,
    ...constants_status_server.SERVER_ERROR_STATUS,
    ...constants_status_success.SUCCESS_STATUS,
    ...constants_status_timeout.TIMEOUT_ERROR_STATUS,
];

exports.CLIENT_ERROR_STATUS = constants_status_client.CLIENT_ERROR_STATUS;
exports.INFORMATION_STATUS = constants_status_information.INFORMATION_STATUS;
exports.PERMISSION_ERROR_STATUS = constants_status_permission.PERMISSION_ERROR_STATUS;
exports.REDIRECT_STATUS = constants_status_redirect.REDIRECT_STATUS;
exports.SERVER_ERROR_STATUS = constants_status_server.SERVER_ERROR_STATUS;
exports.SUCCESS_STATUS = constants_status_success.SUCCESS_STATUS;
exports.TIMEOUT_ERROR_STATUS = constants_status_timeout.TIMEOUT_ERROR_STATUS;
exports.STATUS = STATUS;
//# sourceMappingURL=index.cjs.map
