import { createConstantTests } from '#fixtures';
import { ReturnData } from '#rd';
import { PERMISSION_DENIEDS } from './permission';

const useTests = createConstantTests(
  PERMISSION_DENIEDS,
  ReturnData.isPermission,
);

useTests();
