import { createConstantTests } from '#fixtures';
import { ReturnData } from '#rd';
import { REDIRECTS } from './redirect';

const useTests = createConstantTests(REDIRECTS, ReturnData.isRedirect);

useTests();
