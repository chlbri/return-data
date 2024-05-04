import { z } from 'zod';
import { clientErrorStatusSchema } from './client';
import { informationStatusSchema } from './information';
import { permissionStatusSchema } from './permission';
import { redirectStatusSchema } from './redirect';
import { serverErrorStatusSchema } from './server';
import { successStatusSchema } from './success';
import { timeoutErrorStatusSchema } from './timeout';

export {
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  successStatusSchema as successfullStatusSchema,
  timeoutErrorStatusSchema,
};

export const statusSchema = z.union([
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  successStatusSchema,
  timeoutErrorStatusSchema,
]);
