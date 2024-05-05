import type { ReturnData } from '#rd';
import type { Status } from '#types';
import { expect, test } from 'vitest';
import { typesArray, type StatusTypes } from './helpers';

export const tester = (status: Status) => status.toString();
const _else = () => 'else';
const invite = (bool: boolean) => (bool ? 'matches' : "doesn't match");

export const generateMaybeMapTests = (
  type: StatusTypes,
  rd: ReturnData,
) => {
  const expected = (bool: boolean) => (bool ? tester(rd.status) : _else());

  typesArray.forEach((value, index) => {
    const check = value === type;
    const _invite = `#${index + 1} => ${value} ${invite(check)}`;
    const _expected = expected(check);

    test(_invite, () => {
      const maybe = rd.maybeMap({
        else: _else,
        [value]: tester,
      });
      expect(maybe).toBe(_expected);
    });
  });
};

export const generateMapTests = (type: StatusTypes, rd: ReturnData) => {
  const expected = (bool: boolean) => (bool ? tester(rd.status) : _else());

  typesArray.forEach((value, index) => {
    const check = value === type;
    const _invite = `#${index + 1} => ${value} ${invite(check)}`;
    const _expected = expected(check);

    const entries = typesArray.map(value => [value, _else] as const);
    const map = Object.fromEntries(entries) as Record<
      StatusTypes,
      typeof _else
    >;

    test(_invite, () => {
      const maybe = rd.map({
        ...map,
        [value]: tester,
      });
      expect(maybe).toBe(_expected);
    });
  });
};

export const generateSuccessMapTests = (
  type: StatusTypes,
  rd: ReturnData,
) => {
  const invite = (bool: boolean) => (bool ? 'matches' : "doesn't match");

  typesArray.forEach((value, index) => {
    const check = rd.isSuccess;
    const _invite = `#${index + 1} => ${value} ${invite(check)}`;
    const success = () =>
      rd.successMap({
        [value]: _else,
        success: tester,
      });

    test(_invite, () => {
      if (type === value) {
        expect(success).not.toThrow();
        if (check) {
          expect(success()).toBe(tester(rd.status));
        } else {
          expect(success()).toBe(_else());
        }
      } else {
        if (check) {
          expect(success).not.toThrow();
        } else {
          expect(success).toThrow();
        }
      }
    });
  });
};
