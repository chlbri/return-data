import { createConstantTests } from '#fixtures';
import { ReturnData } from '#rd';
import { TIMEOUT_ERRORS } from './timeout';

const useTests = createConstantTests(TIMEOUT_ERRORS, ReturnData.isTimeout);

useTests();
