import { number } from 'zod';

const redirectStatusSchema = number().int().gt(299).lt(400);

export default redirectStatusSchema;
