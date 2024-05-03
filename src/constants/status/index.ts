import { CLIENT_ERROR_STATUS } from './client';
import { INFORMATION_STATUS } from './information';
import { PERMISSION_ERROR_STATUS } from './permission';
import { REDIRECT_STATUS } from './redirect';
import { SERVER_ERROR_STATUS } from './server';
import { SUCCESS_STATUS } from './success';
import { TIMEOUT_ERROR_STATUS } from './timeout';

export const STATUS = [
  ...CLIENT_ERROR_STATUS,
  ...INFORMATION_STATUS,
  ...PERMISSION_ERROR_STATUS,
  ...REDIRECT_STATUS,
  ...SERVER_ERROR_STATUS,
  ...SUCCESS_STATUS,
  ...TIMEOUT_ERROR_STATUS,
] as const;

export {
  CLIENT_ERROR_STATUS,
  INFORMATION_STATUS,
  PERMISSION_ERROR_STATUS,
  REDIRECT_STATUS,
  SERVER_ERROR_STATUS,
  SUCCESS_STATUS,
  TIMEOUT_ERROR_STATUS,
};
