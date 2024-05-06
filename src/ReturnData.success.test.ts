import { createTests } from '#fixtures';
import { ReturnData } from '#rd';

const rd1 = new ReturnData({
  status: 200,
  payload: 'value',
});

createTests(rd1);
