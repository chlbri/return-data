import {
  generateCheckTests,
  generateMapTests,
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '#fixtures';
import { ReturnData } from '#rd';
import { describe } from 'vitest';

const rd1 = new ReturnData({
  status: 103,
  messages: ['bad_url'],
});

const rd2 = new ReturnData({
  status: 105,
  payload: 'value',
  messages: ['We will migrate to new API'],
});

// const rdInformation3 = new ReturnData({
//   status: 125,
// });

describe('#1 => Checkers', () => {
  generateCheckTests('information', rd1);
});

describe('#2 => MaybeMap', () => {
  generateMaybeMapTests('information', rd2);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('information', rd1);
});

describe('#4 => Map', () => {
  generateMapTests('information', rd2);
});
