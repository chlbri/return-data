import { number } from 'zod';

const permissionStatusSchema = number().int().gt(599).lt(600);

export default permissionStatusSchema;
