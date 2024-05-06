import { ReturnData } from '#rd';
import { ReturnDataObject, Status, StatusTypes } from '#types';
import { createMap } from './map';
import { mapParsers } from './parser';

type Args<T, S extends Status> = ReturnData<T, S> | ReturnDataObject<T, S>;
export const mapTypes = createMap(status => {
  for (const key in mapParsers) {
    if (Object.prototype.hasOwnProperty.call(mapParsers, key)) {
      const _key = key as keyof typeof mapParsers;
      const element = mapParsers[_key];
      const check = element(status);
      if (check) return _key;
    }
  }
  throw 'not implemented';
});

export const getType = <T, S extends Status>(
  arg: Args<T, S>,
): StatusTypes => {
  if (arg instanceof ReturnData) {
    return arg.map(mapTypes);
  }
  return getType(new ReturnData(arg));
};
