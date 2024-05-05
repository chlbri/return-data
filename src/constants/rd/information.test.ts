import { createConstantTests } from '#fixtures';
import { ReturnData } from '../..';
import { INFORMATIONS } from './information';

const useTests = createConstantTests(
  INFORMATIONS,
  ReturnData.isInformation,
);

useTests();
