'use strict';

var constants_rd_client = require('./client.cjs');
var constants_rd_information = require('./information.cjs');
var constants_rd_permission = require('./permission.cjs');
var constants_rd_redirect = require('./redirect.cjs');
var constants_rd_server = require('./server.cjs');
var constants_rd_success = require('./success.cjs');
var constants_rd_timeout = require('./timeout.cjs');

//TODO Make all index empty, exports only
const RETURN_DATAS = {
    ...constants_rd_client.CLIENT_ERRORS,
    ...constants_rd_information.INFORMATIONS,
    ...constants_rd_permission.PERMISSION_DENIEDS,
    ...constants_rd_redirect.REDIRECTS,
    ...constants_rd_server.SERVER_ERRORS,
    ...constants_rd_success.SUCCESS,
    ...constants_rd_timeout.TIMEOUT_ERRORS,
};

exports.CLIENT_ERRORS = constants_rd_client.CLIENT_ERRORS;
exports.INFORMATIONS = constants_rd_information.INFORMATIONS;
exports.PERMISSION_DENIEDS = constants_rd_permission.PERMISSION_DENIEDS;
exports.REDIRECTS = constants_rd_redirect.REDIRECTS;
exports.SERVER_ERRORS = constants_rd_server.SERVER_ERRORS;
exports.SUCCESS = constants_rd_success.SUCCESS;
exports.TIMEOUT_ERRORS = constants_rd_timeout.TIMEOUT_ERRORS;
exports.RETURN_DATAS = RETURN_DATAS;
//# sourceMappingURL=index.cjs.map
