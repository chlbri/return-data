import {
  TypeOf,
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodRawShape,
  ZodString,
  ZodTypeAny,
  ZodUndefined,
  ZodError,
} from 'zod';

import {
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  statusSchema,
  successfullStatusSchema,
  timeoutErrorStatusSchema,
} from './schemas';

// #region Config
export type ChainReturn<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ZodError<T>;
    };

export type OptionalDeepPartial<T extends ZodRawShape> = ZodOptional<
  ZodObject<{
    [key in keyof T]: ZodOptional<T[key]>;
  }>
>;

export type Optional<T extends ZodRawShape | ZodPrimitive> =
  T extends ZodRawShape
    ? OptionalDeepPartial<T>
    : T extends ZodTypeAny
    ? ZodOptional<T>
    : never;

export type ZodPrimitive =
  | ZodNumber
  | ZodString
  | ZodBoolean
  | ZodDate
  | ZodArray<any>
  | ZodUndefined;

export type DeepPartial<T> = T extends Record<string, unknown>
  ? { [key in keyof T]?: DeepPartial<T[key]> }
  : T;

export type RDMap<T, R> = {
  client: (status: TypeOf<ClientErrorStatus>, message?: string) => R;
  information: (
    status: TypeOf<InformationStatus>,
    payload?: DeepPartial<T>,
    message?: string,
  ) => R;
  permission: (
    status: TypeOf<PermissionErrorStatus>,
    payload?: DeepPartial<T>,
    notPermitteds?: string[],
  ) => R;
  redirect: (
    status: TypeOf<RedirectStatus>,
    payload?: DeepPartial<T>,
    message?: string,
  ) => R;
  server: (status: TypeOf<ServerErrorStatus>, message?: string) => R;
  success: (status: TypeOf<SuccessStatus>, payload: DeepPartial<T>) => R;
  timeout: (status: TypeOf<TimeoutErrorStatus>, message?: string) => R;
};

export type RDMaybeMap<T, R> = {
  client?: (status: TypeOf<ClientErrorStatus>, message?: string) => R;
  information?: (
    status: TypeOf<InformationStatus>,
    payload?: DeepPartial<T>,
    message?: string,
  ) => R;
  permission?: (
    status: TypeOf<PermissionErrorStatus>,
    payload?: DeepPartial<T>,
    notPermitteds?: string[],
  ) => R;
  redirect?: (
    status: TypeOf<RedirectStatus>,
    payload?: DeepPartial<T>,
    message?: string,
  ) => R;
  server?: (status: TypeOf<ServerErrorStatus>, message?: string) => R;
  success: (status: TypeOf<SuccessStatus>, payload: DeepPartial<T>) => R;
  timeout?: (status: TypeOf<TimeoutErrorStatus>, message?: string) => R;
};
// #endregion

// #region Status
export type ClientErrorStatus = typeof clientErrorStatusSchema;

export type InformationStatus = typeof informationStatusSchema;

export type PermissionErrorStatus = typeof permissionStatusSchema;

export type RedirectStatus = typeof redirectStatusSchema;

export type ServerErrorStatus = typeof serverErrorStatusSchema;

export type SuccessStatus = typeof successfullStatusSchema;

export type TimeoutErrorStatus = typeof timeoutErrorStatusSchema;

export type Status = typeof statusSchema;
// #endregion

// #region ReturnData
export type ClientError = {
  status: TypeOf<ClientErrorStatus>;
  message?: TypeOf<ZodOptional<ZodString>>;
};

export type Information<T = any> = {
  status: TypeOf<InformationStatus>;
  payload?: DeepPartial<T>;
  message?: TypeOf<ZodOptional<ZodString>>;
};

export type Permission<T = any> = {
  status: TypeOf<PermissionErrorStatus>;
  payload?: DeepPartial<T>;
  notPermitteds?: TypeOf<ZodOptional<ZodArray<ZodString>>>;
};

export type Redirect<T = any> = {
  status: TypeOf<RedirectStatus>;
  payload?: DeepPartial<T>;
  message?: TypeOf<ZodOptional<ZodString>>;
};

export type Success<T = any> = {
  status: TypeOf<SuccessStatus>;
  payload: DeepPartial<T>;
};

export type Server = {
  status: TypeOf<ServerErrorStatus>;
  message?: TypeOf<ZodOptional<ZodString>>;
};

export type Timeout = {
  status: TypeOf<TimeoutErrorStatus>;
};
// #endregion

export type _ReturnData<
  T,
  S extends TypeOf<Status>,
> = S extends TypeOf<ClientErrorStatus>
  ? ClientError
  : S extends TypeOf<InformationStatus>
  ? Information<T>
  : S extends TypeOf<PermissionErrorStatus>
  ? Permission<T>
  : S extends TypeOf<RedirectStatus>
  ? Redirect<T>
  : S extends TypeOf<ServerErrorStatus>
  ? Server
  : S extends TypeOf<SuccessStatus>
  ? Success<T>
  : S extends TypeOf<TimeoutErrorStatus>
  ? Timeout
  : never;
