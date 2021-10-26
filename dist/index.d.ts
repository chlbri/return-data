import type { TypeOf } from 'zod';
import type { RDMap, RDMaybeMap, Status, _ReturnData } from './types';
export * from './constants';
export * from './functions';
export * from './schemas';
export * from './types';
export declare const error: () => never;
export default class ReturnData<T, S extends TypeOf<Status>> {
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
    get status(): TypeOf<Status>;
    map<R>({ information, client, permission, redirect, server, success, timeout, }: RDMap<T, R>): R;
    maybeMap<R>({ information, client, permission, redirect, server, success, timeout, }: RDMaybeMap<T, R>): R;
}
