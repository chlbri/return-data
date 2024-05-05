import {
  generateCheckTests,
  generateMapTests,
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '#fixtures';
import { ReturnData } from '#rd';
import { describe } from 'vitest';

const rd1 = new ReturnData({
  status: 903,
});

// const rdInformation3 = new ReturnData({
//   status: 125,
// });

describe('#1 => Checkers', () => {
  generateCheckTests('timeout', rd1);
});

describe('#2 => MaybeMap', () => {
  generateMaybeMapTests('timeout', rd1);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('timeout', rd1);
});

describe('#4 => Map', () => {
  generateMapTests('timeout', rd1);
});
