import { CLIENT_ERROR_STATUS } from './client.js';
import { INFORMATION_STATUS } from './information.js';
import { PERMISSION_ERROR_STATUS } from './permission.js';
import { REDIRECT_STATUS } from './redirect.js';
import { SERVER_ERROR_STATUS } from './server.js';
import { SUCCESS_STATUS } from './success.js';
import { TIMEOUT_ERROR_STATUS } from './timeout.js';

const STATUS = [
    ...CLIENT_ERROR_STATUS,
    ...INFORMATION_STATUS,
    ...PERMISSION_ERROR_STATUS,
    ...REDIRECT_STATUS,
    ...SERVER_ERROR_STATUS,
    ...SUCCESS_STATUS,
    ...TIMEOUT_ERROR_STATUS,
];

export { CLIENT_ERROR_STATUS, INFORMATION_STATUS, PERMISSION_ERROR_STATUS, REDIRECT_STATUS, SERVER_ERROR_STATUS, STATUS, SUCCESS_STATUS, TIMEOUT_ERROR_STATUS };
//# sourceMappingURL=index.js.map
