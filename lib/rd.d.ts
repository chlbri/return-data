import type { PromiseRD, RD, ReturnDataChainAsync, ReturnDataChainSync, ReturnDataMap, ReturnDataRenewAsync, ReturnDataRenewSync, ReturnDataSuccessMap, ReturnDatatMaybeMap, Status, _ReturnData } from './types';
export declare const defaultError: () => never;
type FunctionPromiseRD<T = any> = (status: Status, payload?: T) => PromiseRD<T>;
type FunctionPromiseRD2<T = any, R = any> = (status: Status, payload?: T) => PromiseRD<R>;
type FunctionRD<T = any> = (status: Status, payload?: T) => RD<T>;
type FunctionRD2<T = any, R = any> = (status: Status, payload?: T) => RD<R>;
export declare class ReturnData<T = any, S extends Status = Status> {
    private data;
    constructor(data: _ReturnData<T, S>);
    get isClienError(): boolean;
    get isInformation(): boolean;
    get isPermission(): boolean;
    get isRedirect(): boolean;
    get isServerError(): boolean;
    get isSuccess(): boolean;
    get isTimeoutError(): boolean;
    get hasData(): boolean;
    get status(): Status;
    map<R>({ information, client, permission, redirect, server, success, timeout, }: ReturnDataMap<T, R>): R;
    maybeMap<R>(cases: ReturnDatatMaybeMap<T, R>): R;
    successMap<R>(cases: ReturnDataSuccessMap<T, R>): R;
    private _chainSync;
    chainSync(args: ReturnDataChainSync<T> | RD<T> | FunctionRD<T>): RD<T>;
    private _chainAsync;
    chainAsync(args: ReturnDataChainAsync<T> | FunctionPromiseRD<T> | PromiseRD<T>): PromiseRD<T>;
    private _renewSync;
    renewSync<R>(args: ReturnDataRenewSync<T, R> | RD<R> | FunctionRD2<T, R>): RD<R>;
    private _renewAsync;
    renewAsync<R>(args: ReturnDataRenewAsync<T, R> | PromiseRD<R> | FunctionPromiseRD2<T, R>): PromiseRD<R>;
    static chain(previous: RD, next: FunctionPromiseRD | ReturnDataChainAsync): PromiseRD;
}
export {};
//# sourceMappingURL=rd.d.ts.map