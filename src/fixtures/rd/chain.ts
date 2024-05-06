import { FunctionRD, RD, ReturnDataChainSync } from '#types';

export const testChainSync = <T>(
  data: RD<T>,
  cases: ReturnDataChainSync<T> | RD<T> | FunctionRD<T>,
) => {
  const rd = data.chainSync(cases);
  return rd;
};
