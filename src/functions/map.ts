import { RD_TYPES } from '#data';
import { Status, StatusTypes } from '#typings';

type Fn<T> = (value: Status) => T;

export function createMap<T>(f: Fn<T>) {
  const entries = RD_TYPES.map(value => [value, f] as const);
  const map = Object.fromEntries(entries) as Record<StatusTypes, Fn<T>>;
  return map;
}
