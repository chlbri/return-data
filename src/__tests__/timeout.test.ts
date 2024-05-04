import { describe } from 'vitest';
import { ReturnData } from '../ReturnData';
import { generateCheckTests } from './fixtures/checkers';
import {
  generateMaybeMapTests,
  generateSuccessMapTests,
} from './fixtures/map';

const rd1 = new ReturnData({
  status: 903,
});

// const rdInformation3 = new ReturnData({
//   status: 125,
// });

describe('#1 => Checkers', () => {
  generateCheckTests('timeout', rd1);
});

describe('#2 => Map', () => {
  generateMaybeMapTests('timeout', rd1);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests(rd1);
});
