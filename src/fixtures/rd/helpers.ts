import type { ReturnDataMap } from '#types';

export const typesArray = [
  'client',
  'information',
  'permission',
  'redirect',
  'server',
  'success',
  'timeout',
] as const;

export type StatusTypes = keyof ReturnDataMap<any, any>;

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
