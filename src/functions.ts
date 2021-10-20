import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodString,
  ZodType,
  ZodUndefined,
} from 'zod';
import {
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  successfullStatusSchema,
  timeoutErrorStatusSchema,
} from './schemas/status';
import {
  ClientErrorD,
  ZodPrimitive,
  InformationD,
  PermissionD,
  RedirectD,
  ServerD,
  SuccessD,
  TimeoutD,
} from './types';

export function isPrimitive(val: any): val is ZodPrimitive {
  return (
    val instanceof ZodNumber ||
    val instanceof ZodString ||
    val instanceof ZodBoolean ||
    val instanceof ZodUndefined ||
    val instanceof ZodArray ||
    val instanceof ZodDate
  );
}

export function chainSchemas<T>(value: T, ...schemas: ZodType<T>[]) {
  if (!schemas[0]) return value;
  const firstSchema = schemas[0];
  let out = firstSchema.safeParse(value);

  const _schemas = schemas.slice(1);
  for (const schema of _schemas) {
    if (out.success) {
      return out;
    }
    out = schema.safeParse(value);
  }
  return out;
}

export function isClientErrorD(
  arg: Record<string, any>,
): arg is ClientErrorD {
  return clientErrorStatusSchema.safeParse(arg.status).success;
}
export function isInformationD<T =any>(
  arg: Record<string, any>,
): arg is InformationD<T> {
  return informationStatusSchema.safeParse(arg.status).success;
}
export function isPermissionD<T =any>(
  arg: Record<string, any>,
): arg is PermissionD<T> {
  return permissionStatusSchema.safeParse(arg.status).success;
}
export function isRedirectD<T =any>(arg: Record<string, any>): arg is RedirectD<T> {
  return redirectStatusSchema.safeParse(arg.status).success;
}
export function isServerD(arg: Record<string, any>): arg is ServerD {
  return successfullStatusSchema.safeParse(arg.status).success;
}
export function isSuccessD<T =any>(arg: Record<string, any>): arg is SuccessD<T> {
  return serverErrorStatusSchema.safeParse(arg.status).success;
}

export function isTimeoutD(arg: Record<string, any>): arg is TimeoutD {
  return timeoutErrorStatusSchema.safeParse(arg.status).success;
}
