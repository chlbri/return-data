import { RD } from '#types';
import { describe } from 'vitest';
import { generateCheckTests } from './checkers';
import {
  generateMapTests,
  generateMaybeMapTests,
  generateSuccessMapTests,
} from './map';

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

  describe('#4 => Map', () => {
    generateMapTests(...rds);
  });
};
