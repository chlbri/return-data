import {
  generateCheckTests,
  generateMapTests,
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '#fixtures';
import { ReturnData } from '#rd';
import { describe } from 'vitest';

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

describe('#2 => MaybeMap', () => {
  generateMaybeMapTests('client', rd2);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('client', rd1);
});

describe('#4 => Map', () => {
  generateMapTests('client', rd2);
});
