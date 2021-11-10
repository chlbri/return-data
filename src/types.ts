import { DeepPartial, NOmit, Unionize } from 'core';
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
import ReturnData from './rd';
import {
  CLIENT_ERROR_STATUS,
  INFORMATION_STATUS,
  PERMISSION_ERROR_STATUS,
  REDIRECT_STATUS,
  STATUS,
  SERVER_ERROR_STATUS,
  SUCCESS_STATUS,
  TIMEOUT_ERROR_STATUS,
} from './constants/status';

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
  message?: string,
) => R;
export type InformationFunction<T, R> = (
  status: InformationStatus,
  payload?: DeepPartial<T>,
  message?: string,
) => R;
export type PermissionErrorFunction<T, R> = (
  status: PermissionErrorStatus,
  payload?: DeepPartial<T>,
  notPermitteds?: string[],
) => R;
export type RedirectFunction<T, R> = (
  status: RedirectStatus,
  payload?: DeepPartial<T>,
  message?: string,
) => R;
export type SuccessFunction<T, R> = (
  status: SuccessStatus,
  payload: DeepPartial<T>,
) => R;
export type ServerFunction<R> = (
  status: ServerErrorStatus,
  message?: string,
) => R;
export type TimeoutFunction<R> = (status: TimeoutErrorStatus) => R;

// #endregion

// #region Maps

export type RDMap<T, R> = {
  client: ClientErrorFunction<R>;
  information: InformationFunction<T, R>;
  permission: PermissionErrorFunction<T, R>;
  redirect: RedirectFunction<T, R>;
  server: ServerFunction<R>;
  success: SuccessFunction<T, R>;
  timeout: TimeoutFunction<R>;
};

export type RDSuccessMap<T, R> = Partial<NOmit<RDMap<T, R>, 'success'>> &
  Pick<RDMap<T, R>, 'success'>;

export type RDMaybeMap<T, R> = Unionize<RDMap<T, R>> & { else: () => R };

// #endregion

// #endregion

// #region Chains

export type RD<T, S extends Status = Status> = ReturnData<T, S>;

export type PRD<T> = Promise<RD<T>>;

export type RDChainSync<T> = {
  information: InformationFunction<T, RD<T>>;
  permission: PermissionErrorFunction<T, RD<T>>;
  redirect: RedirectFunction<T, RD<T>>;
  success: SuccessFunction<T, RD<T>>;
};

export type RDChainAsync<T> = {
  information: InformationFunction<T, PRD<T>>;
  permission: PermissionErrorFunction<T, PRD<T>>;
  redirect: RedirectFunction<T, PRD<T>>;
  success: SuccessFunction<T, PRD<T>>;
};

// #endregion

// #endregion

// #region Status
export type ClientErrorStatus = typeof CLIENT_ERROR_STATUS[number];

export type InformationStatus = typeof INFORMATION_STATUS[number];

export type PermissionErrorStatus = typeof PERMISSION_ERROR_STATUS[number];

export type RedirectStatus = typeof REDIRECT_STATUS[number];

export type ServerErrorStatus = typeof SERVER_ERROR_STATUS[number];

export type SuccessStatus = typeof SUCCESS_STATUS[number];

export type TimeoutErrorStatus = typeof TIMEOUT_ERROR_STATUS[number];

export type Status = typeof STATUS[number];
// #endregion

// #region ReturnData
export type ClientError = {
  status: ClientErrorStatus;
  message?: string;
};

export type Information<T = any> = {
  status: InformationStatus;
  payload?: DeepPartial<T>;
  message?: string;
};

export type Permission<T = any> = {
  status: PermissionErrorStatus;
  payload?: DeepPartial<T>;
  notPermitteds?: string[];
};

export type Redirect<T = any> = {
  status: RedirectStatus;
  payload?: DeepPartial<T>;
  message?: string;
};

export type Success<T = any> = {
  status: SuccessStatus;
  payload: DeepPartial<T>;
};

export type Server = {
  status: ServerErrorStatus;
  message?: string;
};

export type Timeout = {
  status: TimeoutErrorStatus;
};
// #endregion

export type _ReturnData<T, S extends Status> = S extends ClientErrorStatus
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
