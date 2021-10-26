"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientErrorStatusSchema = void 0;
const zod_1 = require("zod");
exports.clientErrorStatusSchema = (0, zod_1.number)().int().gt(399).lt(500);
exports.default = exports.clientErrorStatusSchema;
