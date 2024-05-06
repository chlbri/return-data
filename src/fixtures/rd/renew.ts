import { ReturnData } from '#rd';
import type { FunctionRD } from '#types';
import { MapChain } from '#types';
import { describe, expect, test } from 'vitest';
import { generateBooleans, generator } from './helpers';

// #region Values for testing
// #region ReturnData
const rdClient1 = new ReturnData({
  status: 403,
  messages: ['bad_url'],
});

const rdClient2 = new ReturnData({
  status: 417,
});

const rdInformation1 = new ReturnData({
  status: 103,
  messages: ['bad_url'],
});

const rdInformation2 = new ReturnData({
  status: 105,
  payload: 'value',
  messages: ['We will migrate to new API'],
});

const rdPermission1 = new ReturnData({
  status: 603,
  messages: ['bad_url'],
});

const rdPermission2 = new ReturnData({
  status: 605,
  payload: 'value',
  messages: ['We will migrate to new API'],
});

const rdRedirect1 = new ReturnData({
  status: 303,
  messages: ['bad_url'],
});

const rdRedirect2 = new ReturnData({
  status: 305,
  payload: 'value',
  messages: ['We will migrate to new API'],
});

const rdServer1 = new ReturnData({
  status: 503,
  messages: ['bad_url'],
});

const rdServer2 = new ReturnData({
  status: 525,
});

const rdSuccess1 = new ReturnData({
  status: 200,
  payload: 'value',
});

const rdTimeout1 = new ReturnData({
  status: 903,
});
// #endregion

// #region Functions
const fIdentity: FunctionRD = (status, payload) =>
  new ReturnData({ status, payload } as any);

const f903: FunctionRD = () => rdTimeout1;
const f200 = () => rdSuccess1;
const f525 = () => rdServer2;
// #endregion

// #region Maps
const map1: MapChain = {
  information: (status, payload, messages) =>
    new ReturnData({ status, payload, messages }),
  permission: (status, payload, notPermitteds, messages) =>
    new ReturnData({ status, payload, messages, notPermitteds }),
  redirect: (status, payload, messages) =>
    new ReturnData({ status, payload, messages }),
  success: fIdentity,
};

const map2: MapChain = {
  information: f200,
  permission: f525,
  redirect: f903,
  success: f200,
};
// #endregion
// #endregion

const _generateRenewTests = <T>(rd: ReturnData<T>) => {
  const type = rd.type;
  const { information, permission, redirect, client, timeout, server } =
    generateBooleans(type);
  const canData = rd.canData;
  const rd400 = ReturnData.defaultClient();
  const rd500 = ReturnData.defaultServer();
  const rd900 = ReturnData.defaultTimeout();

  const extendCheck = (rd0: ReturnData, _check: boolean) => {
    let check = _check;
    if (client) check = rd0.compare(rd400);
    else if (server) check = rd0.compare(rd500);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else if (timeout) check = rd0.compare(rd900);
    return check;
  };

  describe('#1 => Args : MapRenew', () => {
    test('#1 => map1 matches previous rd (identity)', () => {
      const rd0 = rd.renew(map1);
      // eslint-disable-next-line prefer-const
      let check = rd0.compare(rd);
      check = extendCheck(rd0, check);
      // if (client) check = rd0.compare(rd400);
      // if (server) check = rd0.compare(rd500);
      // // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // if (timeout) check = rd0.compare(rd900);
      expect(check).toBe(true);
    });

    const text2 = `#2 => map2 ${information ? 'matches success' : redirect ? 'matches timeout' : permission ? 'matches server' : 'matches previous rd'}`;

    test(text2, () => {
      const rd0 = rd.renew(map2);
      let check = rd0.compare(rd);
      if (information) check = rd0.compare(rdSuccess1);
      if (redirect) check = rd0.compare(rdTimeout1);
      if (permission) check = rd0.compare(rdServer2);
      check = extendCheck(rd0, check);
      expect(check).toBe(true);
    });
  });

  describe('#2 => functions', () => {
    const useTest = (f: FunctionRD, index: number) => {
      return test(`#${index} => ${f.name}`, () => {
        const rd0 = rd.renew(f as any);
        let check = rd0.compare(rd);
        if (canData) {
          check = rd0.compare(f(rd0.status));
        }
        check = extendCheck(rd0, check);
        expect(check).toBe(true);
      });
    };
    const useTests = (...fs: FunctionRD[]) => {
      fs.forEach(useTest);
    };

    useTests(f200, f903, f525);
  });

  describe('#3 => ReturnDatas', () => {
    const useTest = (data: ReturnData, name: string, index: number) => {
      return test(`#${index + 1} => ${name}`, () => {
        const rd0 = rd.renew(data as any);
        let check = rd0.compare(rd);
        if (canData) {
          check = rd0.compare(data);
        }
        check = extendCheck(rd0, check);
        expect(check).toBe(true);
      });
    };
    const useTests = (rds: Record<string, ReturnData>) => {
      const entries = Object.entries(rds);
      entries.forEach(([name, data], index) => {
        useTest(data, name, index);
      });
    };

    useTests({
      rdClient1,
      rdClient2,
      rdInformation1,
      rdInformation2,
      rdPermission1,
      rdPermission2,
      rdRedirect1,
      rdRedirect2,
      rdServer1,
    });
  });
};

export const generateRenewTests = generator(_generateRenewTests);
