import { ZodType } from 'zod';
import type { ClientError, ZodPrimitive, Information, Permission, Redirect, Server, Success, Timeout } from './types';
export declare function isPrimitive(val: any): val is ZodPrimitive;
export declare function chainSchemas<T>(value: T, ...schemas: ZodType<T>[]): T | {
    success: true;
    data: T;
} | {
    success: false;
    error: import("zod").ZodError<T>;
};
export declare function isClientErrorD(arg: Record<string, any>): arg is ClientError;
export declare function isInformationD<T = any>(arg: Record<string, any>): arg is Information<T>;
export declare function isPermissionD<T = any>(arg: Record<string, any>): arg is Permission<T>;
export declare function isRedirectD<T = any>(arg: Record<string, any>): arg is Redirect<T>;
export declare function isServerD(arg: Record<string, any>): arg is Server;
export declare function isSuccessD<T = any>(arg: Record<string, any>): arg is Success<T>;
export declare function isTimeoutD(arg: Record<string, any>): arg is Timeout;
