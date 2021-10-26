import { number } from 'zod';

const serverErrorStatusSchema = number().int().gt(499).lt(600);

export default serverErrorStatusSchema;
