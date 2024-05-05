import type { ReturnData } from '#rd';
import { expect, test } from 'vitest';
import { generateBooleans, type StatusTypes } from './helpers';

export const generateCheckTests = (
  type: StatusTypes,
  data: ReturnData,
) => {
  // #region Booleans
  const {
    client,
    information,
    permission,
    redirect,
    server,
    success,
    timeout,
  } = generateBooleans(type);

  const canData = success || information || permission || redirect;
  // #endregion

  test.concurrent(`#1 => client => ${client}`, () => {
    expect(data.isClienError).toBe(client);
  });

  test.concurrent(`#2 => information => ${information}`, () => {
    expect(data.isInformation).toBe(information);
  });

  test.concurrent(`#3 => permission => ${permission}`, () => {
    expect(data.isPermission).toBe(permission);
  });

  test.concurrent(`#4 => redirect => ${redirect}`, () => {
    expect(data.isRedirect).toBe(redirect);
  });

  test.concurrent(`#5 => server => ${server}`, () => {
    expect(data.isServerError).toBe(server);
  });

  test.concurrent(`#5 => success => ${success}`, () => {
    expect(data.isSuccess).toBe(success);
  });

  test.concurrent(`#7 => timeout => ${timeout}`, () => {
    expect(data.isTimeoutError).toBe(timeout);
  });

  test.concurrent(`#8 => canData => ${canData}`, () => {
    expect(data.canData).toBe(canData);
  });
};
