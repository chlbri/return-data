import { createConstantTests } from '#fixtures';
import { ReturnData } from '#rd';
import { SUCCESS } from './success';

const useTests = createConstantTests(SUCCESS, ReturnData.isSuccess);

useTests();
