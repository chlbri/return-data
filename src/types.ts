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
} from 'zod';
import {
  clientErrorDataSchema,
  serverErrorDataSchema,
  timeoutErrorDataSchema,
} from './schemas/returnData';
import {
  clientErrorStatusSchema,
  informationStatusSchema,
  permissionStatusSchema,
  redirectStatusSchema,
  serverErrorStatusSchema,
  statusSchema,
  successfullStatusSchema,
  timeoutErrorStatusSchema,
} from './schemas/status';

// #region Config
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

export type ForEach<T, R> = {
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

// #region Data
export type ClientError = typeof clientErrorDataSchema;

export type Information<T extends ZodRawShape | ZodPrimitive> = ZodObject<{
  status: InformationStatus;
  payload: Optional<T>;
  message: ZodOptional<ZodString>;
}>;

export type Permission<T extends ZodRawShape | ZodPrimitive> = ZodObject<{
  status: PermissionErrorStatus;
  payload: Optional<T>;
  notPermitteds: ZodOptional<ZodArray<ZodString>>;
}>;

export type Redirect<T extends ZodRawShape | ZodPrimitive> = ZodObject<{
  status: RedirectStatus;
  payload: Optional<T>;
  message: ZodOptional<ZodString>;
}>;

export type Success<T extends ZodRawShape | ZodPrimitive> = ZodObject<{
  status: SuccessStatus;
  payload: T extends ZodRawShape
    ? ZodObject<T>
    : T extends ZodTypeAny
    ? T
    : never;
}>;

export type Server = typeof serverErrorDataSchema;

export type Timeout = typeof timeoutErrorDataSchema;
// #endregion

// #region ReturnData
export type ClientErrorD = TypeOf<ClientError>;

export type InformationD<T =any> = {
  status: TypeOf<InformationStatus>;
  payload?: DeepPartial<T>;
  message: TypeOf<ZodOptional<ZodString>>;
};

export type PermissionD<T =any> = {
  status: TypeOf<PermissionErrorStatus>;
  payload?: DeepPartial<T>;
  notPermitteds: TypeOf<ZodOptional<ZodArray<ZodString>>>;
};

export type RedirectD<T =any> = {
  status: TypeOf<RedirectStatus>;
  payload?: DeepPartial<T>;
  message: TypeOf<ZodOptional<ZodString>>;
};

export type SuccessD<T =any> = {
  status: TypeOf<SuccessStatus>;
  payload: DeepPartial<T>;
};

export type ServerD = TypeOf<typeof serverErrorDataSchema>;

export type TimeoutD = TypeOf<typeof timeoutErrorDataSchema>;
// #endregion

export type ReturnDataSchema<
  T extends ZodRawShape | ZodPrimitive,
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

export type _ReturnData<
  T,
  S extends TypeOf<Status>,
> = S extends TypeOf<ClientErrorStatus>
  ? ClientErrorD
  : S extends TypeOf<InformationStatus>
  ? InformationD<T>
  : S extends TypeOf<PermissionErrorStatus>
  ? PermissionD<T>
  : S extends TypeOf<RedirectStatus>
  ? RedirectD<T>
  : S extends TypeOf<ServerErrorStatus>
  ? ServerD
  : S extends TypeOf<SuccessStatus>
  ? SuccessD<T>
  : S extends TypeOf<TimeoutErrorStatus>
  ? TimeoutD
  : never;

export type PromiseReturnDataSchema<
  T extends ZodRawShape | ZodPrimitive,
  S extends TypeOf<Status>,
> = Promise<ReturnDataSchema<T, S>>;

// type T = _ReturnData<400>;
