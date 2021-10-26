import { number } from 'zod';

const timeoutErrorStatusSchema = number().int().gt(899).lt(1000);

export default timeoutErrorStatusSchema;
