import type { StatusTypes } from '#types';

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
