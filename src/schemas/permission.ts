import { number } from 'zod';

const permissionStatusSchema = number().int().gt(599).lt(700);

export default permissionStatusSchema;
