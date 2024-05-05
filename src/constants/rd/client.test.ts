import { createConstantTests } from '#fixtures';
import { ReturnData } from '../..';
import { CLIENT_ERRORS } from './client';

const useTests = createConstantTests(
  CLIENT_ERRORS,
  ReturnData.isClientError,
);

useTests();
