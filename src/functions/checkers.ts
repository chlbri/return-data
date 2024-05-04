import {
  clientErrorSchema,
  informationSchema,
  permissionSchema,
  redirectSchema,
  serverErrorSchema,
  successSchema,
  timeoutErrorSchema,
} from '#schemas/rd';

import type {
  ClientError,
  Information,
  Permission,
  Redirect,
  Server,
  Success,
  Timeout,
} from '#types';

export function isClientError(arg: any): arg is ClientError {
  return clientErrorSchema.safeParse(arg).success;
}

export function isInformation<T = any>(arg: any): arg is Information<T> {
  return informationSchema().safeParse(arg).success;
}

export function isPermission<T = any>(arg: any): arg is Permission<T> {
  return permissionSchema().safeParse(arg).success;
}

export function isRedirect<T = any>(arg: any): arg is Redirect<T> {
  return redirectSchema().safeParse(arg).success;
}

export function isServer(arg: Record<string, any>): arg is Server {
  return serverErrorSchema.safeParse(arg).success;
}

export function isSuccess<T = any>(arg: any): arg is Success<T> {
  return successSchema().safeParse(arg).success;
}

export function isTimeout(arg: Record<string, any>): arg is Timeout {
  return timeoutErrorSchema.safeParse(arg).success;
}
