import type { ReturnData } from '#rd';
import type { Status, StatusTypes } from '#types';
import { describe, expect, test } from 'vitest';
import { typesArray } from './helpers';

export const tester = (status: Status) => status.toString();
const _else = () => 'else';
const invite = (bool: boolean) => (bool ? 'matches' : "doesn't match");

const generator = (tester: (arg: ReturnData) => void) => {
  function out(...rds: ReturnData[]) {
    rds.forEach((rd, index) => {
      describe(`#${index + 1} ======>`, () => {
        tester(rd);
      });
    });
  }
  return out;
};

const _generateMaybeMapTests = (rd: ReturnData) => {
  const expected = (bool: boolean) => (bool ? tester(rd.status) : _else());

  typesArray.forEach((value, index) => {
    const check = value === rd.type;
    const _invite = `#${index + 1} => ${value} ${invite(check)}`;
    const _expected = expected(check);

    test.concurrent(_invite, () => {
      const maybe = rd.maybeMap({
        else: _else,
        [value]: tester,
      });
      expect(maybe).toBe(_expected);
    });
  });
};

export const generateMaybeMapTests = generator(_generateMaybeMapTests);

const _generateMapTests = (rd: ReturnData) => {
  const expected = (bool: boolean) => (bool ? tester(rd.status) : _else());

  typesArray.forEach((value, index) => {
    const check = value === rd.type;
    const _invite = `#${index + 1} => ${value} ${invite(check)}`;
    const _expected = expected(check);

    const entries = typesArray.map(value => [value, _else] as const);
    const map = Object.fromEntries(entries) as Record<
      StatusTypes,
      typeof _else
    >;

    test.concurrent(_invite, () => {
      const maybe = rd.map({
        ...map,
        [value]: tester,
      });
      expect(maybe).toBe(_expected);
    });
  });
};

export const generateMapTests = generator(_generateMapTests);

const _generateSuccessMapTests = (rd: ReturnData) => {
  const invite = (bool: boolean) => (bool ? 'matches' : "doesn't match");

  typesArray.forEach((value, index) => {
    const check = rd.isSuccess;
    const _invite = `#${index + 1} => ${value} ${invite(check)}`;
    const success = () =>
      rd.successMap({
        [value]: _else,
        success: tester,
      });

    test.concurrent(_invite, () => {
      if (rd.type === value) {
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

export const generateSuccessMapTests = generator(_generateSuccessMapTests);
