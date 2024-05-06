import type { CLIENT_ERROR_STATUS, INFORMATION_STATUS, PERMISSION_ERROR_STATUS, REDIRECT_STATUS, SERVER_ERROR_STATUS, STATUS, SUCCESS_STATUS, TIMEOUT_ERROR_STATUS } from './constants/status/index.js';
import type { z } from 'zod';
import type { ReturnData } from './ReturnData';
export type ChainReturn<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: z.ZodError<T>;
};
export type OptionalDeepPartial<T extends z.ZodRawShape> = z.ZodOptional<z.ZodObject<{
    [key in keyof T]: z.ZodOptional<T[key]>;
}>>;
export type Optional<T extends z.ZodRawShape | ZodPrimitive> = T extends z.ZodRawShape ? OptionalDeepPartial<T> : T extends z.ZodTypeAny ? z.ZodOptional<T> : never;
export type ZodPrimitive = z.ZodNumber | z.ZodString | z.ZodBoolean | z.ZodUndefined | z.ZodNull;
export type ClientErrorFunction<R> = (status: ClientErrorStatus, messages?: string[]) => R;
export type InformationFunction<T, R> = (status: InformationStatus, payload?: T, messages?: string[]) => R;
export type PermissionErrorFunction<T, R> = (status: PermissionErrorStatus, payload?: T, notPermitteds?: string[], messages?: string[]) => R;
export type RedirectFunction<T, R> = (status: RedirectStatus, payload?: T, messages?: string[]) => R;
export type SuccessFunction<T, R> = (status: SuccessStatus, payload: T) => R;
export type ServerFunction<R> = (status: ServerErrorStatus, messages?: string[]) => R;
export type TimeoutFunction<R> = (status: TimeoutErrorStatus) => R;
export type RdMap<T, R> = {
    client: ClientErrorFunction<R>;
    information: InformationFunction<T, R>;
    permission: PermissionErrorFunction<T, R>;
    redirect: RedirectFunction<T, R>;
    server: ServerFunction<R>;
    success: SuccessFunction<T, R>;
    timeout: TimeoutFunction<R>;
};
export type SuccessMap<T, R> = Partial<Omit<RdMap<T, R>, 'success'>> & Pick<RdMap<T, R>, 'success'>;
export type MaybeMap<T, R> = Partial<RdMap<T, R>> & {
    else: (status: Status) => R;
};
export type RD<T = any, S extends Status = Status> = ReturnData<T, S>;
export type MapChain<T = any> = Pick<RdMap<T, RD<T>>, 'information' | 'permission' | 'redirect' | 'success'>;
export type MapRenew<T = any, R = any> = Pick<RdMap<T, RD<R>>, 'information' | 'permission' | 'redirect' | 'success'>;
export type ClientErrorStatus = (typeof CLIENT_ERROR_STATUS)[number];
export type InformationStatus = (typeof INFORMATION_STATUS)[number];
export type PermissionErrorStatus = (typeof PERMISSION_ERROR_STATUS)[number];
export type RedirectStatus = (typeof REDIRECT_STATUS)[number];
export type ServerErrorStatus = (typeof SERVER_ERROR_STATUS)[number];
export type SuccessStatus = (typeof SUCCESS_STATUS)[number];
export type TimeoutErrorStatus = (typeof TIMEOUT_ERROR_STATUS)[number];
export type Status = (typeof STATUS)[number];
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
export type StatusTypes = keyof RdMap<any, any>;
export type FunctionRDwithReturn<T = any, R = any> = (status?: Status, payload?: T) => RD<R>;
export type FunctionRD<T = any> = FunctionRDwithReturn<T, T>;
/**
 * prettier-ignore
 */
export type ReturnDataObject<T, S extends Status> = S extends ClientErrorStatus ? ClientError : S extends InformationStatus ? Information<T> : S extends PermissionErrorStatus ? Permission<T> : S extends RedirectStatus ? Redirect<T> : S extends ServerErrorStatus ? Server : S extends SuccessStatus ? Success<T> : S extends TimeoutErrorStatus ? Timeout : never;
//# sourceMappingURL=types.d.ts.map