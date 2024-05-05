import {
  generateCheckTests,
  generateMapTests,
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '#fixtures';
import { ReturnData } from '#rd';
import { describe } from 'vitest';

const rd1 = new ReturnData({
  status: 303,
  messages: ['bad_url'],
});

const rd2 = new ReturnData({
  status: 305,
  payload: 'value',
  messages: ['We will migrate to new API'],
});

// const rdInformation3 = new ReturnData({
//   status: 125,
// });

describe('#1 => Checkers', () => {
  generateCheckTests('redirect', rd1);
});

describe('#2 => MaybeMap', () => {
  generateMaybeMapTests('redirect', rd2);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('redirect', rd1);
});

describe('#4 => Map', () => {
  generateMapTests('redirect', rd2);
});
