import { number } from 'zod';

const successfullStatusSchema = number().int().gt(199).lt(300);

export default successfullStatusSchema;
