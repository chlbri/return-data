import { createTests } from '#fixtures';
import { ReturnData } from '#rd';

const rd1 = new ReturnData({
  status: 503,
  messages: ['bad_url'],
});

const rd2 = new ReturnData({
  status: 525,
});

createTests(rd1, rd2);
