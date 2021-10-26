import type { RDMap, RDMaybeMap, RDSuccessMap, Status, _ReturnData } from './types';
export * from './constants';
export * from './functions';
export * from './schemas';
export * from './types';
export declare const error: () => never;
export default class ReturnData<T, S extends Status> {
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
    successMap<R>({ information, client, permission, redirect, server, success, timeout, }: RDSuccessMap<T, R>): R;
    maybeMap<R>(cases: RDMaybeMap<T, R>): R;
}
