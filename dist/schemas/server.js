"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const serverErrorStatusSchema = (0, zod_1.number)().int().gt(499).lt(600);
exports.default = serverErrorStatusSchema;
