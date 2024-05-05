import {
  generateCheckTests,
  generateMapTests,
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '#fixtures';
import { ReturnData } from '#rd';
import { describe } from 'vitest';

const rd1 = new ReturnData({
  status: 603,
  messages: ['bad_url'],
});

const rd2 = new ReturnData({
  status: 605,
  payload: 'value',
  messages: ['We will migrate to new API'],
});

describe('#1 => Checkers', () => {
  generateCheckTests('permission', rd1);
});

describe('#2 => MaybeMap', () => {
  generateMaybeMapTests('permission', rd2);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('permission', rd1);
});

describe('#4 => Map', () => {
  generateMapTests('permission', rd2);
});
