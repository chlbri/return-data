import { STATUS_CHECKERS } from '#schemas/status';
import type { z } from 'zod';
import { StatusTypes } from '..';

export const parser = <Z extends z.ZodTypeAny>(zod: Z) => {
  const out = (...args: any[]) => {
    return args.every(value => zod.safeParse(value).success);
  };
  return out;
};

type Rp = ReturnType<typeof parser>;

const _mapParsers = () => {
  const entries = Object.entries(STATUS_CHECKERS).map(([key, schema]) => {
    const _parser = parser(schema);
    return [key, _parser] as const;
  });

  const out = Object.fromEntries(entries);

  return out as Record<StatusTypes, Rp>;
};

export const mapParsers = _mapParsers();
