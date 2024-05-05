import { createConstantTests } from '#fixtures';
import { ReturnData } from '#rd';
import { SERVER_ERRORS } from './server';

const useTests = createConstantTests(SERVER_ERRORS, ReturnData.isServer);

useTests();
