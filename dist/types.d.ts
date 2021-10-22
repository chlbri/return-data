import { TypeOf, ZodArray, ZodBoolean, ZodDate, ZodNumber, ZodObject, ZodOptional, ZodRawShape, ZodString, ZodTypeAny, ZodUndefined } from 'zod';
import { clientErrorStatusSchema, informationStatusSchema, permissionStatusSchema, redirectStatusSchema, serverErrorStatusSchema, statusSchema, successfullStatusSchema, timeoutErrorStatusSchema } from './schemas/status';
export declare type OptionalDeepPartial<T extends ZodRawShape> = ZodOptional<ZodObject<{
    [key in keyof T]: ZodOptional<T[key]>;
}>>;
export declare type Optional<T extends ZodRawShape | ZodPrimitive> = T extends ZodRawShape ? OptionalDeepPartial<T> : T extends ZodTypeAny ? ZodOptional<T> : never;
export declare type ZodPrimitive = ZodNumber | ZodString | ZodBoolean | ZodDate | ZodArray<any> | ZodUndefined;
export declare type DeepPartial<T> = T extends Record<string, unknown> ? {
    [key in keyof T]?: DeepPartial<T[key]>;
} : T;
export declare type ForEach<T, R> = {
    client: (status: TypeOf<ClientErrorStatus>, message?: string) => R;
    information: (status: TypeOf<InformationStatus>, payload?: DeepPartial<T>, message?: string) => R;
    permission: (status: TypeOf<PermissionErrorStatus>, payload?: DeepPartial<T>, notPermitteds?: string[]) => R;
    redirect: (status: TypeOf<RedirectStatus>, payload?: DeepPartial<T>, message?: string) => R;
    server: (status: TypeOf<ServerErrorStatus>, message?: string) => R;
    success: (status: TypeOf<SuccessStatus>, payload: DeepPartial<T>) => R;
    timeout: (status: TypeOf<TimeoutErrorStatus>, message?: string) => R;
};
export declare type ClientErrorStatus = typeof clientErrorStatusSchema;
export declare type InformationStatus = typeof informationStatusSchema;
export declare type PermissionErrorStatus = typeof permissionStatusSchema;
export declare type RedirectStatus = typeof redirectStatusSchema;
export declare type ServerErrorStatus = typeof serverErrorStatusSchema;
export declare type SuccessStatus = typeof successfullStatusSchema;
export declare type TimeoutErrorStatus = typeof timeoutErrorStatusSchema;
export declare type Status = typeof statusSchema;
export declare type ClientError = {
    status: TypeOf<ClientErrorStatus>;
    message?: TypeOf<ZodOptional<ZodString>>;
};
export declare type Information<T = any> = {
    status: TypeOf<InformationStatus>;
    payload?: DeepPartial<T>;
    message?: TypeOf<ZodOptional<ZodString>>;
};
export declare type Permission<T = any> = {
    status: TypeOf<PermissionErrorStatus>;
    payload?: DeepPartial<T>;
    notPermitteds?: TypeOf<ZodOptional<ZodArray<ZodString>>>;
};
export declare type Redirect<T = any> = {
    status: TypeOf<RedirectStatus>;
    payload?: DeepPartial<T>;
    message?: TypeOf<ZodOptional<ZodString>>;
};
export declare type Success<T = any> = {
    status: TypeOf<SuccessStatus>;
    payload: DeepPartial<T>;
};
export declare type Server = {
    status: TypeOf<ServerErrorStatus>;
    message?: TypeOf<ZodOptional<ZodString>>;
};
export declare type Timeout = {
    status: TypeOf<TimeoutErrorStatus>;
};
export declare type _ReturnData<T, S extends TypeOf<Status>> = S extends TypeOf<ClientErrorStatus> ? ClientError : S extends TypeOf<InformationStatus> ? Information<T> : S extends TypeOf<PermissionErrorStatus> ? Permission<T> : S extends TypeOf<RedirectStatus> ? Redirect<T> : S extends TypeOf<ServerErrorStatus> ? Server : S extends TypeOf<SuccessStatus> ? Success<T> : S extends TypeOf<TimeoutErrorStatus> ? Timeout : never;
