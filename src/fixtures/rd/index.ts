import { RD } from '#typings';
import { describe } from 'vitest';
import { generateChainTests } from './chain';
import { generateCheckTests } from './checkers';
import { generateMaybeMapTests, generateSuccessMapTests } from './map';
import { generateRenewTests } from './renew';

export * from './checkers';
export * from './helpers';
export * from './map';

export const createTests = (...rds: RD[]) => {
  describe('#1 => Checkers', () => {
    generateCheckTests(...rds);
  });

  describe('#2 => MaybeMap', () => {
    generateMaybeMapTests(...rds);
  });

  describe('#3 => SuccessMap', () => {
    generateSuccessMapTests(...rds);
  });

  describe('#4 => Chain', () => {
    generateChainTests(...rds);
  });

  describe('#5 => Renew', () => {
    generateRenewTests(...rds);
  });
};
