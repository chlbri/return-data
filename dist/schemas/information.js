"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const informationStatusSchema = (0, zod_1.number)().int().gt(99).lt(200);
exports.default = informationStatusSchema;
