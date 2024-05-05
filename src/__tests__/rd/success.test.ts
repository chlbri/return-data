import { ReturnData } from '#rd';
import { describe } from 'vitest';
import { generateCheckTests } from '../fixtures/checkers';
import {
  generateMaybeMapTests,
  generateSuccessMapTests,
} from '../fixtures/map';

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

describe('#2 => Map', () => {
  generateMaybeMapTests('success', rd1);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests('success', rd1);
});
