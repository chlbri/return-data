import { number } from 'zod';

export const clientErrorStatusSchema = number().int().gt(399).lt(500);

export default clientErrorStatusSchema;
