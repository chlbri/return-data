import { CLIENT_ERRORS } from './client.js';
import { INFORMATIONS } from './information.js';
import { PERMISSION_DENIEDS } from './permission.js';
import { REDIRECTS } from './redirect.js';
import { SERVER_ERRORS } from './server.js';
import { SUCCESS } from './success.js';
import { TIMEOUT_ERRORS } from './timeout.js';

//TODO Make all index empty, exports only
const RETURN_DATAS = {
    ...CLIENT_ERRORS,
    ...INFORMATIONS,
    ...PERMISSION_DENIEDS,
    ...REDIRECTS,
    ...SERVER_ERRORS,
    ...SUCCESS,
    ...TIMEOUT_ERRORS,
};
const RD_TYPES = [
    'client',
    'information',
    'permission',
    'redirect',
    'server',
    'success',
    'timeout',
];

export { CLIENT_ERRORS, INFORMATIONS, PERMISSION_DENIEDS, RD_TYPES, REDIRECTS, RETURN_DATAS, SERVER_ERRORS, SUCCESS, TIMEOUT_ERRORS };
//# sourceMappingURL=index.js.map
