"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const redirectStatusSchema = (0, zod_1.number)().int().gt(299).lt(400);
exports.default = redirectStatusSchema;
