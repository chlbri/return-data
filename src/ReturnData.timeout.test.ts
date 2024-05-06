import { createTests } from '#fixtures';
import { ReturnData } from '#rd';

const rd1 = new ReturnData({
  status: 903,
});

createTests(rd1);
