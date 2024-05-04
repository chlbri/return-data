import type { PromiseRD, RD, ReturnDataChainAsync, ReturnDataChainSync, ReturnDataMap, ReturnDataMaybeMap, ReturnDataObject, ReturnDataRenewAsync, ReturnDataRenewSync, ReturnDataSuccessMap, Status } from './types';
export declare const defaultError: () => never;
type FunctionRDwithReturn<T = any, R = any> = (status: Status, payload?: T) => RD<R>;
type FunctionRD<T = any> = FunctionRDwithReturn<T, T>;
type FunctionPromiseRDwithReturn<T = any, R = any> = (status: Status, payload?: T) => PromiseRD<R>;
type FunctionPromiseRD<T = any> = FunctionPromiseRDwithReturn<T, T>;
export declare class ReturnData<T = any, S extends Status = Status> {
    private data;
    constructor(data: ReturnDataObject<T, S>);
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
    maybeMap<R>(cases: ReturnDataMaybeMap<T, R>): R;
    successMap<R>(cases: ReturnDataSuccessMap<T, R>): R;
    private _chainSync;
    chainSync(args: ReturnDataChainSync<T> | RD<T> | FunctionRD<T>): RD<T>;
    private _chainAsync;
    chainAsync(args: ReturnDataChainAsync<T> | FunctionPromiseRD<T> | PromiseRD<T>): PromiseRD<T>;
    private _renewSync;
    renewSync<R>(args: ReturnDataRenewSync<T, R> | RD<R> | FunctionRDwithReturn<T, R>): RD<R>;
    private _renewAsync;
    renewAsync<R>(args: ReturnDataRenewAsync<T, R> | PromiseRD<R> | FunctionPromiseRDwithReturn<T, R>): PromiseRD<R>;
    static chain(previous: RD, next: FunctionPromiseRD | ReturnDataChainAsync): PromiseRD;
}
export {};
//# sourceMappingURL=rd.d.ts.map