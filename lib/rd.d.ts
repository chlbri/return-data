import type { PRD, RD, RDChainAsync, RDChainSync, RDMap, RDMaybeMap, RDRenewAsync, RDRenewSync, RDSuccessMap, Status, _ReturnData } from './types';
export declare const error: () => never;
type FPRD<T = any> = (status: Status, payload?: T) => PRD<T>;
type FPRD2<T = any, R = any> = (status: Status, payload?: T) => PRD<R>;
type FRD<T = any> = (status: Status, payload?: T) => RD<T>;
type FRD2<T = any, R = any> = (status: Status, payload?: T) => RD<R>;
export default class ReturnData<T = any, S extends Status = Status> {
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
    map<R>({ information, client, permission, redirect, server, success, timeout, }: RDMap<T, R>): R;
    maybeMap<R>(cases: RDMaybeMap<T, R>): R;
    successMap<R>(cases: RDSuccessMap<T, R>): R;
    private _chainSync;
    chainSync(args: RDChainSync<T> | RD<T> | FRD<T>): RD<T>;
    private _chainAsync;
    chainAsync(args: RDChainAsync<T> | FPRD<T> | PRD<T>): PRD<T>;
    private _renewSync;
    renewSync<R>(args: RDRenewSync<T, R> | RD<R> | FRD2<T, R>): RD<R>;
    private _renewAsync;
    renewAsync<R>(args: RDRenewAsync<T, R> | PRD<R> | FPRD2<T, R>): PRD<R>;
    static chain(previous: RD, next: FPRD | RDChainAsync): PRD;
}
export {};
//# sourceMappingURL=rd.d.ts.map