import type {
  CLIENT_ERROR_STATUS,
  INFORMATION_STATUS,
  PERMISSION_ERROR_STATUS,
  REDIRECT_STATUS,
  SERVER_ERROR_STATUS,
  STATUS,
  SUCCESS_STATUS,
  TIMEOUT_ERROR_STATUS,
} from '#status';

import type { ReturnData } from '#rd';
import type { KeysMatchingWithArray } from '@bemedev/zod-extended/lib/types';
import type { z } from 'zod';
export type Ru = Record<string, unknown>;

// #region KeysMatching
export type KeysMatching<
  T extends Ru,
  AddObjectKeys extends boolean = true,
  Key = keyof T,
> = Key extends string
  ? T[Key] extends Ru
    ?
        | `${Key}.${KeysMatching<T[Key], AddObjectKeys> & string}`
        | (AddObjectKeys extends true ? Key : never)
    : Key
  : never;
// #endregion

// #region KeyArraysMatching
// #region type KeyArraysMatching
export type KeyArraysMatching<
  T extends Ru,
  Key = keyof T,
> = Key extends string
  ? T[Key] extends Ru
    ? KeyArraysMatching<{
        [key2 in keyof T[Key] as `${Key}.${key2 & string}`]: T[Key][key2];
      }>
    : [Key]
  : never;
// #endregion

// #region Config
export type ChainReturn<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: z.ZodError<T>;
    };

export type OptionalDeepPartial<T extends z.ZodRawShape> = z.ZodOptional<
  z.ZodObject<{
    [key in keyof T]: z.ZodOptional<T[key]>;
  }>
>;

export type Optional<T extends z.ZodRawShape | ZodPrimitive> =
  T extends z.ZodRawShape
    ? OptionalDeepPartial<T>
    : T extends z.ZodTypeAny
      ? z.ZodOptional<T>
      : never;

export type ZodPrimitive =
  | z.ZodNumber
  | z.ZodString
  | z.ZodBoolean
  | z.ZodUndefined
  | z.ZodNull;

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
  notPermitteds?: Record<T extends Ru ? KeysMatching<T> : string, number>,
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
  // messages?: string[],
) => R;

export type ServerFunction<R> = (
  status: ServerErrorStatus,
  messages?: string[],
) => R;

export type TimeoutFunction<R> = (status: TimeoutErrorStatus) => R;

// #endregion

// #region Maps

export type RdMap<T, R> = {
  client: ClientErrorFunction<R>;
  information: InformationFunction<T, R>;
  permission: PermissionErrorFunction<T, R>;
  redirect: RedirectFunction<T, R>;
  server: ServerFunction<R>;
  success: SuccessFunction<T, R>;
  timeout: TimeoutFunction<R>;
};

export type SuccessMap<T, R> = Partial<Omit<RdMap<T, R>, 'success'>> &
  Pick<RdMap<T, R>, 'success'>;

export type MaybeMap<T, R> = Partial<RdMap<T, R>> & {
  else: (status: Status) => R;
};
// #endregion
// #endregion

// #region Chains
export type RD<T = any, S extends Status = Status> = ReturnData<T, S>;

export type MapChain<T = any> = Pick<
  RdMap<T, RD<T>>,
  'information' | 'permission' | 'redirect' | 'success'
>;

export type MapRenew<T = any, R = any> = Pick<
  RdMap<T, RD<R>>,
  'information' | 'permission' | 'redirect' | 'success'
>;
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
  notPermitteds?: Record<T extends Ru ? KeysMatching<T> : string, number>;
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

// #region Types
export type StatusTypes = keyof RdMap<any, any>;
export type FunctionRDwithReturn<T = any, R = any> = (
  status?: Status,
  payload?: T,
) => RD<R>;
export type FunctionRD<T = any> = FunctionRDwithReturn<T, T>;
// #endregion

// #region type ReturnKeys
type _ReturnKeys2<T extends z.AnyZodObject> = KeysMatchingWithArray<
  z.infer<T>
>;

export type ReturnKeys<T extends z.AnyZodObject> =
  _ReturnKeys2<T> extends [string, ...string[]]
    ? _ReturnKeys2<T>
    : [string, ...string[]];
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
