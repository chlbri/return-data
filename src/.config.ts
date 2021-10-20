import { ZodArray, ZodBoolean, ZodDate, ZodNumber, ZodObject, ZodOptional, ZodRawShape, ZodString, ZodUndefined } from "zod";

export type ZodPrimitive =
  | ZodNumber
  | ZodString
  | ZodBoolean
  | ZodDate
  | ZodArray<any>
  | ZodUndefined;

export function isPrimitive(val: any): val is ZodPrimitive {
  return (
    val instanceof ZodNumber ||
    val instanceof ZodString ||
    val instanceof ZodBoolean ||
    val instanceof ZodUndefined ||
    val instanceof ZodArray ||
    val instanceof ZodDate
  );
}

export type OptionalDeepPartial<T extends ZodRawShape> = ZodOptional<
  ZodObject<{
    [key in keyof T]: ZodOptional<T[key]>;
  }>
>;