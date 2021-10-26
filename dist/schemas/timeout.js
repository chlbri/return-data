"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const timeoutErrorStatusSchema = (0, zod_1.number)().int().gt(899).lt(1000);
exports.default = timeoutErrorStatusSchema;
