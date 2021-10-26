import { union } from 'zod';
import clientErrorStatusSchema from './client';
import informationStatusSchema from './information';
import permissionStatusSchema from './permission';
import redirectStatusSchema from './redirect';
import serverErrorStatusSchema from './server';
import successfullStatusSchema from './successfull';
import timeoutErrorStatusSchema from './timeout';

export * from './client';
export * from './information';
export * from './permission';
export * from './redirect';
export * from './server';
export * from './successfull';
export * from './timeout';

export {
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  successfullStatusSchema,
  timeoutErrorStatusSchema,
};

export const statusSchema = union([
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  successfullStatusSchema,
  timeoutErrorStatusSchema,
]);
