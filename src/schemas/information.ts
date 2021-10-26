import { number } from 'zod';

const informationStatusSchema = number().int().gt(99).lt(200);

export default informationStatusSchema;
