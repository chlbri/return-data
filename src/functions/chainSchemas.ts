import type { SafeParseReturnType, z } from 'zod';

type ZT<O, T = O> = z.ZodType<O, z.ZodTypeDef, T>;
/**
 * Chain zod schemas to validate the value
 * @param value The value to test
 * @param schemas The testers to test the value
 * @returns error or the value
 */
export function chainSchemas<O, T = O>(
  value: T,
  ...schemas: [ZT<O, T>, ...ZT<O, T>[]]
): SafeParseReturnType<T, O> {
  const firstSchema = schemas[0];
  let out = firstSchema.safeParse(value);

  const _schemas = schemas.slice(1);
  for (const schema of _schemas) {
    if (!out.success) {
      return out;
    }
    out = schema.safeParse(value);
  }
  return out;
}
