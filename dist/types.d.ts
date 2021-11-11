import { NOmit, Unionize } from 'core';
import { ZodArray, ZodBoolean, ZodDate, ZodError, ZodNumber, ZodObject, ZodOptional, ZodRawShape, ZodString, ZodTypeAny, ZodUndefined } from 'zod';
import { CLIENT_ERROR_STATUS, INFORMATION_STATUS, PERMISSION_ERROR_STATUS, REDIRECT_STATUS, SERVER_ERROR_STATUS, STATUS, SUCCESS_STATUS, TIMEOUT_ERROR_STATUS } from './constants/status';
import ReturnData from './rd';
export declare type ChainReturn<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: ZodError<T>;
};
export declare type OptionalDeepPartial<T extends ZodRawShape> = ZodOptional<ZodObject<{
    [key in keyof T]: ZodOptional<T[key]>;
}>>;
export declare type Optional<T extends ZodRawShape | ZodPrimitive> = T extends ZodRawShape ? OptionalDeepPartial<T> : T extends ZodTypeAny ? ZodOptional<T> : never;
export declare type ZodPrimitive = ZodNumber | ZodString | ZodBoolean | ZodDate | ZodArray<any> | ZodUndefined;
export declare type ClientErrorFunction<R> = (status: ClientErrorStatus, message?: string) => R;
export declare type InformationFunction<T, R> = (status: InformationStatus, payload?: T, message?: string) => R;
export declare type PermissionErrorFunction<T, R> = (status: PermissionErrorStatus, payload?: T, notPermitteds?: string[]) => R;
export declare type RedirectFunction<T, R> = (status: RedirectStatus, payload?: T, message?: string) => R;
export declare type SuccessFunction<T, R> = (status: SuccessStatus, payload: T) => R;
export declare type ServerFunction<R> = (status: ServerErrorStatus, message?: string) => R;
export declare type TimeoutFunction<R> = (status: TimeoutErrorStatus) => R;
export declare type RDMap<T, R> = {
    client: ClientErrorFunction<R>;
    information: InformationFunction<T, R>;
    permission: PermissionErrorFunction<T, R>;
    redirect: RedirectFunction<T, R>;
    server: ServerFunction<R>;
    success: SuccessFunction<T, R>;
    timeout: TimeoutFunction<R>;
};
export declare type RDSuccessMap<T, R> = Partial<NOmit<RDMap<T, R>, 'success'>> & Pick<RDMap<T, R>, 'success'>;
export declare type RDMaybeMap<T, R> = Unionize<RDMap<T, R>> & {
    else: () => R;
};
export declare type RD<T = any, S extends Status = Status> = ReturnData<T, S>;
export declare type PRD<T = any> = Promise<RD<T>>;
export declare type RDChainSync<T = any> = {
    information: InformationFunction<T, RD<T>>;
    permission: PermissionErrorFunction<T, RD<T>>;
    redirect: RedirectFunction<T, RD<T>>;
    success: SuccessFunction<T, RD<T>>;
};
export declare type RDRenewSync<T = any, R = any> = {
    information: InformationFunction<T, RD<R>>;
    permission: PermissionErrorFunction<T, RD<R>>;
    redirect: RedirectFunction<T, RD<R>>;
    success: SuccessFunction<T, RD<R>>;
};
export declare type RDChainAsync<T = any> = {
    information: InformationFunction<T, PRD<T>>;
    permission: PermissionErrorFunction<T, PRD<T>>;
    redirect: RedirectFunction<T, PRD<T>>;
    success: SuccessFunction<T, PRD<T>>;
};
export declare type RDRenewAsync<T = any, R = any> = {
    information: InformationFunction<T, PRD<R>>;
    permission: PermissionErrorFunction<T, PRD<R>>;
    redirect: RedirectFunction<T, PRD<R>>;
    success: SuccessFunction<T, PRD<R>>;
};
export declare type ClientErrorStatus = typeof CLIENT_ERROR_STATUS[number];
export declare type InformationStatus = typeof INFORMATION_STATUS[number];
export declare type PermissionErrorStatus = typeof PERMISSION_ERROR_STATUS[number];
export declare type RedirectStatus = typeof REDIRECT_STATUS[number];
export declare type ServerErrorStatus = typeof SERVER_ERROR_STATUS[number];
export declare type SuccessStatus = typeof SUCCESS_STATUS[number];
export declare type TimeoutErrorStatus = typeof TIMEOUT_ERROR_STATUS[number];
export declare type Status = typeof STATUS[number];
export declare type ClientError = {
    status: ClientErrorStatus;
    message?: string;
};
export declare type Information<T = any> = {
    status: InformationStatus;
    payload?: T;
    message?: string;
};
export declare type Permission<T = any> = {
    status: PermissionErrorStatus;
    payload?: T;
    notPermitteds?: string[];
};
export declare type Redirect<T = any> = {
    status: RedirectStatus;
    payload?: T;
    message?: string;
};
export declare type Success<T = any> = {
    status: SuccessStatus;
    payload: T;
};
export declare type Server = {
    status: ServerErrorStatus;
    message?: string;
};
export declare type Timeout = {
    status: TimeoutErrorStatus;
};
export declare type _ReturnData<T, S extends Status> = S extends ClientErrorStatus ? ClientError : S extends InformationStatus ? Information<T> : S extends PermissionErrorStatus ? Permission<T> : S extends RedirectStatus ? Redirect<T> : S extends ServerErrorStatus ? Server : S extends SuccessStatus ? Success<T> : S extends TimeoutErrorStatus ? Timeout : never;
