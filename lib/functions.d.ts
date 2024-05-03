import { z } from 'zod';
import type { ChainReturn, ClientError, Information, Permission, Redirect, Server, Success, Timeout, ZodPrimitive } from './types';
export declare function isPrimitive(val: any): val is ZodPrimitive;
export declare function chainSchemas<T>(value: T, ...schemas: z.ZodType<T>[]): ChainReturn<T>;
export declare function isClientError(arg: Record<string, any>): arg is ClientError;
export declare function isInformation<T = any>(arg: Record<string, any>): arg is Information<T>;
export declare function isPermission<T = any>(arg: Record<string, any>): arg is Permission<T>;
export declare function isRedirect<T = any>(arg: Record<string, any>): arg is Redirect<T>;
export declare function isServer(arg: Record<string, any>): arg is Server;
export declare function isSuccess<T = any>(arg: Record<string, any>): arg is Success<T>;
export declare function isTimeout(arg: Record<string, any>): arg is Timeout;
//# sourceMappingURL=functions.d.ts.map