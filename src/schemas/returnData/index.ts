import { TypeOf, ZodRawShape, promise, string, ZodPromise } from 'zod';
import type { Status, ReturnDataSchema, ZodPrimitive } from '../../types';
import {
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  successfullStatusSchema,
  timeoutErrorStatusSchema,
} from '../status';
import { clientErrorDataSchema } from './client';
import { informationDataSchema } from './information';
import { permissionDataSchema } from './permission';
import { redirectDataSchema } from './redirect';
import { serverErrorDataSchema } from './server';
import { successfullDataSchema } from './successfull';
import { timeoutErrorDataSchema } from './timeout';

export * from './client';
export * from './information';
export * from './permission';
export * from './redirect';
export * from './server';
export * from './successfull';
export * from './timeout';

export const returnDataSchema = <
  T extends ZodRawShape | ZodPrimitive,
  S extends TypeOf<Status>,
>(
  shape: T,
  status: S,
): ReturnDataSchema<T, S> => {
  const information = informationStatusSchema.safeParse(status);
  const permission = permissionStatusSchema.safeParse(status);
  const redirect = redirectStatusSchema.safeParse(status);
  const serverError = serverErrorStatusSchema.safeParse(status);
  const success = successfullStatusSchema.safeParse(status);
  const timeoutError = timeoutErrorStatusSchema.safeParse(status);

  let out: any = clientErrorDataSchema;

  if (information.success) {
    out = informationDataSchema(shape);
  }
  if (permission.success) {
    out = permissionDataSchema(shape);
  }
  if (redirect.success) {
    out = redirectDataSchema(shape);
  }
  if (serverError.success) {
    out = serverErrorDataSchema;
  }
  if (success.success) {
    out = successfullDataSchema(shape);
  }
  if (timeoutError.success) {
    out = timeoutErrorDataSchema;
  }

  return out;
};

export function promiseDataSchema<
  T extends ZodRawShape | ZodPrimitive,
  S extends TypeOf<Status>,
>(shape: T, status: S): ZodPromise<ReturnDataSchema<T, S>> {
  return promise(returnDataSchema(shape, status)) as any;
}

const d = promiseDataSchema({ id: string() }, 200);
const ert = d.parse(34)
