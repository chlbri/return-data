import { createTests } from '#fixtures';
import { ReturnData } from '#rd';

const rd1 = new ReturnData({
  status: 303,
  messages: ['bad_url'],
});

const rd2 = new ReturnData({
  status: 305,
  payload: 'value',
  messages: ['We will migrate to new API'],
});

createTests(rd1, rd2);
