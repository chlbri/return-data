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
} from './schemas';
import type {
  ChainReturn,
  ClientError,
  Information,
  Permission,
  RDChainAsync,
  Redirect,
  Server,
  Success,
  Timeout,
  ZodPrimitive,
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

export function chainSchemas<T>(
  value: T,
  ...schemas: ZodType<T>[]
): ChainReturn<T> {
  if (!schemas[0]) return { success: true, data: value };
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

// #region Checkers

export function isClientError(
  arg: Record<string, any>,
): arg is ClientError {
  return clientErrorStatusSchema.safeParse(arg.status).success;
}

export function isInformation<T = any>(
  arg: Record<string, any>,
): arg is Information<T> {
  return informationStatusSchema.safeParse(arg.status).success;
}

export function isPermission<T = any>(
  arg: Record<string, any>,
): arg is Permission<T> {
  return permissionStatusSchema.safeParse(arg.status).success;
}

export function isRedirect<T = any>(
  arg: Record<string, any>,
): arg is Redirect<T> {
  return redirectStatusSchema.safeParse(arg.status).success;
}

export function isServer(arg: Record<string, any>): arg is Server {
  return serverErrorStatusSchema.safeParse(arg.status).success;
}

export function isSuccess<T = any>(
  arg: Record<string, any>,
): arg is Success<T> {
  return successfullStatusSchema.safeParse(arg.status).success;
}

export function isTimeout(arg: Record<string, any>): arg is Timeout {
  return timeoutErrorStatusSchema.safeParse(arg.status).success;
}

// #endregion
