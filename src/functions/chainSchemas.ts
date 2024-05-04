import type { ChainReturn } from '#types';
import type { z } from 'zod';

export function chainSchemas<T>(
  value: T,
  ...schemas: z.ZodType<T>[]
): ChainReturn<T> {
  if (!schemas[0]) return { success: true, data: value };
  const firstSchema = schemas[0];
  let out = firstSchema.safeParse(value);

  const _schemas = schemas.slice(1);
  for (const schema of _schemas) {
    if (out.success) {
      return out;
    }
    out = schema.safeParse(value);
  }
  return out;
}
