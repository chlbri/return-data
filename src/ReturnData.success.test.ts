import {
  generateCheckTests,
  generateMapTests,
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '#fixtures';
import { ReturnData } from '#rd';
import { describe } from 'vitest';

const rd1 = new ReturnData({
  status: 200,
  payload: 'value',
});

// const rdInformation3 = new ReturnData({
//   status: 125,
// });

describe('#1 => Checkers', () => {
  generateCheckTests('success', rd1);
});

describe('#2 => MaybeMap', () => {
  generateMaybeMapTests('success', rd1);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('success', rd1);
});

describe('#4 => Map', () => {
  generateMapTests('success', rd1);
});
