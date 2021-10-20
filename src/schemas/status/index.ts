import { union, TypeOf } from 'zod';
import { clientErrorsStatusSchema } from './client';
import { informationStatusSchema } from './information';
import { permissionStatusSchema } from './permission';
import { redirectStatusSchema } from './redirect';
import { serverErrorStatusSchema } from './server';
import { successfullStatusSchema } from './successfull';
import { timeoutStatusSchema } from './timeout';

export {
  clientErrorsStatusSchema as clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  successfullStatusSchema,
  timeoutStatusSchema,
};

export const statusSchema = union([
  ...clientErrorsStatusSchema.options,
  ...informationStatusSchema.options,
  ...permissionStatusSchema.options,
  ...redirectStatusSchema.options,
  ...serverErrorStatusSchema.options,
  ...successfullStatusSchema.options,
  ...timeoutStatusSchema.options,
]);

type Test = TypeOf<typeof statusSchema>;

const ret: Test = 200;
