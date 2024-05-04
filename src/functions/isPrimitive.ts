import type { ZodPrimitive } from '#types';
import { z } from 'zod';

export function isPrimitive(val: any): val is ZodPrimitive {
  return (
    val instanceof z.ZodNumber ||
    val instanceof z.ZodString ||
    val instanceof z.ZodBoolean ||
    val instanceof z.ZodUndefined ||
    val instanceof z.ZodArray ||
    val instanceof z.ZodDate
  );
}
