import { describe } from 'vitest';
import { ReturnData } from '../ReturnData';
import { generateCheckTests } from './fixtures/checkers';
import {
  generateMaybeMapTests,
  generateSuccessMapTests,
} from './fixtures/map';

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

describe('#2 => Map', () => {
  generateMaybeMapTests('server', rd2);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests(rd1);
});
