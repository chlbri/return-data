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
export type SuccessFunction<T, R> = (status: SuccessStatus, payload: T, messages?: string[]) => R;
export type ServerFunction<R> = (status: ServerErrorStatus, messages?: string[]) => R;
export type TimeoutFunction<R> = (status: TimeoutErrorStatus) => R;
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
export type ReturnDataSuccessMap<T, R> = Partial<Omit<ReturnDataMap<T, R>, 'success'>> & Pick<ReturnDataMap<T, R>, 'success'>;
export type RDSuccessMap<T, R> = ReturnDataSuccessMap<T, R>;
export type ReturnDataMaybeMap<T, R> = Partial<ReturnDataMap<T, R>> & {
    else: () => R;
};
export type RDMaybeMap<T, R> = ReturnDataMaybeMap<T, R>;
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
export type StatusTypes = keyof ReturnDataMap<any, any>;
export type FunctionRDwithReturn<T = any, R = any> = (status: Status, payload?: T) => RD<R>;
export type FunctionRD<T = any> = FunctionRDwithReturn<T, T>;
export type FunctionPromiseRDwithReturn<T = any, R = any> = (status: Status, payload?: T) => PromiseRD<R>;
export type FunctionPromiseRD<T = any> = FunctionPromiseRDwithReturn<T, T>;
/**
 * prettier-ignore
 */
export type ReturnDataObject<T, S extends Status> = S extends ClientErrorStatus ? ClientError : S extends InformationStatus ? Information<T> : S extends PermissionErrorStatus ? Permission<T> : S extends RedirectStatus ? Redirect<T> : S extends ServerErrorStatus ? Server : S extends SuccessStatus ? Success<T> : S extends TimeoutErrorStatus ? Timeout : never;
//# sourceMappingURL=types.d.ts.map