import {
  generateCheckTests,
  generateMapTests,
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '#fixtures';
import { ReturnData } from '#rd';
import { describe } from 'vitest';

const rd1 = new ReturnData({
  status: 503,
  messages: ['bad_url'],
});

const rd2 = new ReturnData({
  status: 525,
});

// const rdInformation3 = new ReturnData({
//   status: 125,
// });

describe('#1 => Checkers', () => {
  generateCheckTests('server', rd1);
});

describe('#2 => MaybeMap', () => {
  generateMaybeMapTests('server', rd2);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('server', rd1);
});

describe('#4 => Map', () => {
  generateMapTests('server', rd2);
});
