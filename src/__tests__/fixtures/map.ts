import type { ReturnData } from '#rd';
import type { Status } from '#types';
import { expect, test } from 'vitest';
import { typesArray, type StatusTypes } from './helpers';

export const tester = (status: Status) => status.toString();
const _else = 'else';
const invite = (bool: boolean) => (bool ? 'matches' : "doesn't match");

export const generateMaybeMapTests = (
  type: StatusTypes,
  rd: ReturnData,
) => {
  const expected = (bool: boolean) => (bool ? tester(rd.status) : _else);

  typesArray.forEach((value, index) => {
    const check = value === type;
    const _invite = `#${index + 1} => ${value} ${invite(check)}`;
    const _expected = expected(check);

    test(_invite, () => {
      const maybe = rd.maybeMap({
        else: () => _else,
        [value]: tester,
      });
      expect(maybe).toBe(_expected);
    });
  });
};

export const generateSuccessMapTests = (rd: ReturnData) => {
  const invite = (bool: boolean) => (bool ? 'matches' : "doesn't match");

  typesArray.forEach((value, index) => {
    const check = rd.isSuccess;
    const _invite = `#${index + 1} => ${value} ${invite(check)}`;
    const success = () =>
      rd.successMap({
        success: tester,
      });

    test(_invite, () => {
      if (check) {
        expect(success).not.toThrow();
        expect(success()).toBe(tester(rd.status));
      } else {
        expect(success).toThrow();
      }
    });
  });
};
