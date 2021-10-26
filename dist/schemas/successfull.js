"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const successfullStatusSchema = (0, zod_1.number)().int().gt(199).lt(300);
exports.default = successfullStatusSchema;
