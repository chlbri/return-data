import { ReturnData } from '#rd';
import { describe } from 'vitest';
import { generateCheckTests } from '../fixtures/checkers';
import {
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '../fixtures/map';

const rd1 = new ReturnData({
  status: 403,
  messages: ['bad_url'],
});

const rd2 = new ReturnData({
  status: 417,
});

describe('#1 => Checkers', () => {
  generateCheckTests('client', rd1);
});

describe('#2 => Map', () => {
  generateMaybeMapTests('client', rd2);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('client', rd1);
});
