import { TypeOf } from 'zod';
import type { ForEach, Status, _ReturnData } from './types';
export declare class ReturnData<T, S extends TypeOf<Status>> {
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
    forEach<R>(cases: ForEach<T, R>): R;
}
