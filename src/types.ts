import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodError,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodRawShape,
  ZodString,
  ZodTypeAny,
  ZodUndefined,
} from 'zod';
import {
  CLIENT_ERROR_STATUS,
  INFORMATION_STATUS,
  PERMISSION_ERROR_STATUS,
  REDIRECT_STATUS,
  SERVER_ERROR_STATUS,
  STATUS,
  SUCCESS_STATUS,
  TIMEOUT_ERROR_STATUS,
} from './constants/status';
import type { ReturnData } from './rd';

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

// #region Maps

// #region Functions

export type ClientErrorFunction<R> = (
  status: ClientErrorStatus,
  messages?: string[],
) => R;
export type InformationFunction<T, R> = (
  status: InformationStatus,
  payload?: T,
  messages?: string[],
) => R;
export type PermissionErrorFunction<T, R> = (
  status: PermissionErrorStatus,
  payload?: T,
  notPermitteds?: string[],
  messages?: string[],
) => R;
export type RedirectFunction<T, R> = (
  status: RedirectStatus,
  payload?: T,
  messages?: string[],
) => R;
export type SuccessFunction<T, R> = (
  status: SuccessStatus,
  payload: T,
  messages?: string[],
) => R;
export type ServerFunction<R> = (
  status: ServerErrorStatus,
  messages?: string[],
) => R;
export type TimeoutFunction<R> = (status: TimeoutErrorStatus) => R;

// #endregion

// #region Maps

export type ReturnDataMap<T, R> = {
  client: ClientErrorFunction<R>;
  information: InformationFunction<T, R>;
  permission: PermissionErrorFunction<T, R>;
  redirect: RedirectFunction<T, R>;
  server: ServerFunction<R>;
  success: SuccessFunction<T, R>;
  timeout: TimeoutFunction<R>;
};

export type RDDataMap<T, R> = ReturnDataMap<T, R>;

export type ReturnDataSuccessMap<T, R> = Partial<
  Omit<ReturnDataMap<T, R>, 'success'>
> &
  Pick<ReturnDataMap<T, R>, 'success'>;

export type RDSuccessMap<T, R> = ReturnDataSuccessMap<T, R>;

export type ReturnDataMaybeMap<T, R> = Partial<ReturnDataMap<T, R>> & {
  else: () => R;
};
export type RDMaybeMap<T, R> = ReturnDataMaybeMap<T, R>;

// #endregion

// #endregion

// #region Chains

export type RD<T = any, S extends Status = Status> = ReturnData<T, S>;

export type PromiseReturnData<T = any> = Promise<RD<T>>;
export type PromiseRD<T = any> = PromiseReturnData<T>;

export type ReturnDataChainSync<T = any> = {
  information: InformationFunction<T, RD<T>>;
  permission: PermissionErrorFunction<T, RD<T>>;
  redirect: RedirectFunction<T, RD<T>>;
  success: SuccessFunction<T, RD<T>>;
};
export type RDChainSync<T = any> = ReturnDataChainSync<T>;

export type ReturnDataRenewSync<T = any, R = any> = {
  information: InformationFunction<T, RD<R>>;
  permission: PermissionErrorFunction<T, RD<R>>;
  redirect: RedirectFunction<T, RD<R>>;
  success: SuccessFunction<T, RD<R>>;
};

export type ReturnDataChainAsync<T = any> = {
  information: InformationFunction<T, PromiseRD<T>>;
  permission: PermissionErrorFunction<T, PromiseRD<T>>;
  redirect: RedirectFunction<T, PromiseRD<T>>;
  success: SuccessFunction<T, PromiseRD<T>>;
};
export type ReturnDataRenewAsync<T = any, R = any> = {
  information: InformationFunction<T, PromiseRD<R>>;
  permission: PermissionErrorFunction<T, PromiseRD<R>>;
  redirect: RedirectFunction<T, PromiseRD<R>>;
  success: SuccessFunction<T, PromiseRD<R>>;
};

// #endregion

// #endregion

// #region Status
export type ClientErrorStatus = (typeof CLIENT_ERROR_STATUS)[number];

export type InformationStatus = (typeof INFORMATION_STATUS)[number];

export type PermissionErrorStatus =
  (typeof PERMISSION_ERROR_STATUS)[number];

export type RedirectStatus = (typeof REDIRECT_STATUS)[number];

export type ServerErrorStatus = (typeof SERVER_ERROR_STATUS)[number];

export type SuccessStatus = (typeof SUCCESS_STATUS)[number];

export type TimeoutErrorStatus = (typeof TIMEOUT_ERROR_STATUS)[number];

export type Status = (typeof STATUS)[number];
// #endregion

// #region ReturnData
export type ClientError = {
  status: ClientErrorStatus;
  messages?: string[];
};

export type Information<T = any> = {
  status: InformationStatus;
  payload?: T;
  messages?: string[];
};

export type Permission<T = any> = {
  status: PermissionErrorStatus;
  payload?: T;
  notPermitteds?: string[];
  messages?: string[];
};

export type Redirect<T = any> = {
  status: RedirectStatus;
  payload?: T;
  messages?: string[];
};

export type Server = {
  status: ServerErrorStatus;
  messages?: string[];
};

export type Success<T = any> = {
  status: SuccessStatus;
  payload: T;
};

export type Timeout = {
  status: TimeoutErrorStatus;
};
// #endregion

/**
 * prettier-ignore
 */
export type ReturnDataObject<
  T,
  S extends Status,
> = S extends ClientErrorStatus
  ? ClientError
  : S extends InformationStatus
    ? Information<T>
    : S extends PermissionErrorStatus
      ? Permission<T>
      : S extends RedirectStatus
        ? Redirect<T>
        : S extends ServerErrorStatus
          ? Server
          : S extends SuccessStatus
            ? Success<T>
            : S extends TimeoutErrorStatus
              ? Timeout
              : never;
