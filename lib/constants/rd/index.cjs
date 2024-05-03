'use strict';

var constants_rd_client = require('./client.cjs');
var constants_rd_information = require('./information.cjs');
var constants_rd_permission = require('./permission.cjs');
var constants_rd_redirect = require('./redirect.cjs');
var constants_rd_server = require('./server.cjs');
var constants_rd_success = require('./success.cjs');
var constants_rd_timeout = require('./timeout.cjs');

const RETURN_DATAS = {
    ...constants_rd_client,
    ...constants_rd_information,
    ...constants_rd_permission,
    ...constants_rd_redirect,
    ...constants_rd_server,
    ...constants_rd_success,
    ...constants_rd_timeout,
};

exports.CLIENT_ERRORS = constants_rd_client;
exports.INFORMATIONS = constants_rd_information;
exports.PERMISSION_DENIEDS = constants_rd_permission;
exports.REDIRECTS = constants_rd_redirect;
exports.SERVER_ERRORS = constants_rd_server;
exports.SUCCESS = constants_rd_success;
exports.TIMEOUT_ERRORS = constants_rd_timeout;
exports.RETURN_DATAS = RETURN_DATAS;
//# sourceMappingURL=index.cjs.map
