import { createTests } from '#fixtures';
import { ReturnData } from '#rd';

const rd1 = new ReturnData({
  status: 403,
  messages: ['bad_url'],
});

const rd2 = new ReturnData({
  status: 417,
});

createTests(rd1, rd2);
