import type { RD, StatusTypes } from '#typings';
import { describe } from 'vitest';

export const typesArray = [
  'client',
  'information',
  'permission',
  'redirect',
  'server',
  'success',
  'timeout',
] as const;

export const generateBooleans = (type: StatusTypes) => {
  const client = type === 'client';
  const information = type === 'information';
  const permission = type === 'permission';
  const redirect = type === 'redirect';
  const server = type === 'server';
  const success = type === 'success';
  const timeout = type === 'timeout';

  return {
    client,
    information,
    permission,
    redirect,
    server,
    success,
    timeout,
  } as const;
};

export const generator = (tester: (arg: RD) => void) => {
  function out(...rds: RD[]) {
    rds.forEach((rd, index) => {
      describe(`#${index + 1} ======>`, () => {
        tester(rd);
      });
    });
  }
  return out;
};

// export const generateType = <T, S extends Status>(
//   rd: RD<T, S>,
// ): StatusTypes => {
//   switch (key) {
//     case value:
//       break;

//     default:
//       break;
//   }
// };
