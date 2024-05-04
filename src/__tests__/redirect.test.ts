import { describe } from 'vitest';
import { ReturnData } from '../ReturnData';
import { generateCheckTests } from './fixtures/checkers';
import {
  generateMaybeMapTests,
  generateSuccessMapTests,
} from './fixtures/map';

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

describe('#2 => Map', () => {
  generateMaybeMapTests('redirect', rd2);
});

describe('#3 => SuccessMap', () => {
  generateSuccessMapTests(rd1);
});
